import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useAutoSaveNotes } from '../useAutoSaveNotes';

describe('useAutoSaveNotes', () => {
  beforeEach(() => {
    // Limpar localStorage e mocks antes de cada teste
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restaurar implementações originais
    vi.restoreAllMocks();
  });

  it('deve carregar notas do localStorage na inicialização', async () => {
    // Arrange: Salvar notas no localStorage (formato do hook)
    localStorage.setItem('bash-learning-notes', 'Notas iniciais do Bash');

    // Act: Renderizar hook
    const { result } = renderHook(() => useAutoSaveNotes('bash'));

    // Assert: Verificar se notas foram carregadas
    expect(result.current[0]).toBe('Notas iniciais do Bash');

    // Aguardar useEffect estabilizar (pode estar em 'saving' temporariamente)
    await waitFor(() => {
      expect(['saved', 'idle']).toContain(result.current[2]);
    }, { timeout: 1500 });
  });

  it('deve inicializar com string vazia se não houver notas salvas', async () => {
    // Act: Renderizar hook sem notas no localStorage
    const { result } = renderHook(() => useAutoSaveNotes('rust'));

    // Assert: Verificar inicialização vazia
    expect(result.current[0]).toBe('');

    // Aguardar useEffect estabilizar
    await waitFor(() => {
      expect(['idle', 'saved']).toContain(result.current[2]);
    }, { timeout: 1500 });
  });

  it('deve salvar notas automaticamente após 1 segundo (debounce padrão)', async () => {
    // Arrange: Renderizar hook
    const { result } = renderHook(() => useAutoSaveNotes('bash'));

    // Act: Atualizar notas
    act(() => {
      result.current[1]('Nova nota de teste');
    });

    // Assert: Verificar status "saving" imediatamente
    expect(result.current[2]).toBe('saving');

    // Assert: Aguardar auto-save (1s debounce) e verificar status "saved"
    await waitFor(() => {
      expect(result.current[2]).toBe('saved');
    }, { timeout: 3000 });

    // Assert: Verificar se foi salvo no localStorage
    expect(localStorage.getItem('bash-learning-notes')).toBe('Nova nota de teste');
  });

  it('deve lidar com QuotaExceededError quando nota excede 50KB', async () => {
    // Arrange: Criar nota maior que 50KB
    const largeNote = 'x'.repeat(51 * 1024); // 51KB (acima do limite)

    // Mock localStorage.setItem para lançar QuotaExceededError
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      const error = new Error('QuotaExceededError');
      error.name = 'QuotaExceededError';
      throw error;
    });

    const { result } = renderHook(() => useAutoSaveNotes('bash'));

    // Act: Tentar salvar nota grande
    act(() => {
      result.current[1](largeNote);
    });

    // Assert: Verificar erro de quota
    await waitFor(() => {
      expect(result.current[2]).toBe('quota_exceeded');
    }, { timeout: 3000 });

    // Assert: Nota deve permanecer em memória mesmo com erro
    expect(result.current[0]).toBe(largeNote);
  });

  it('deve calcular tamanho da nota corretamente', async () => {
    // Arrange: Renderizar hook
    const { result } = renderHook(() => useAutoSaveNotes('bash'));

    // Act: Adicionar nota de 1KB
    act(() => {
      result.current[1]('x'.repeat(1024)); // Exatamente 1KB
    });

    // Assert: Aguardar auto-save
    await waitFor(() => {
      expect(result.current[2]).toBe('saved');
    }, { timeout: 3000 });

    // Assert: Verificar informações de tamanho
    const sizeInfo = result.current[3];
    expect(sizeInfo.sizeKB).toBe('1.00');
    expect(sizeInfo.percentage).toBe('2.0'); // 1KB / 50KB = 2%
    expect(sizeInfo.sizeBytes).toBe(1024);
  });

  it('deve calcular porcentagem corretamente para nota de 25KB (50%)', async () => {
    // Arrange: Renderizar hook
    const { result } = renderHook(() => useAutoSaveNotes('c'));

    // Act: Adicionar nota de 25KB (metade do limite)
    act(() => {
      result.current[1]('y'.repeat(25 * 1024));
    });

    // Assert: Aguardar auto-save
    await waitFor(() => {
      expect(result.current[2]).toBe('saved');
    }, { timeout: 3000 });

    // Assert: Verificar 50% do limite
    const sizeInfo = result.current[3];
    expect(sizeInfo.sizeKB).toBe('25.00');
    expect(sizeInfo.percentage).toBe('50.0');
  });

  it('deve usar fallback de memória quando localStorage falha (SecurityError)', async () => {
    // Arrange: Mock localStorage.getItem para lançar SecurityError
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      const error = new Error('SecurityError');
      error.name = 'SecurityError';
      throw error;
    });

    // Act: Renderizar hook (vai falhar ao carregar)
    const { result } = renderHook(() => useAutoSaveNotes('bash'));

    // Assert: Verificar que hook inicializa vazio mesmo com erro
    expect(result.current[0]).toBe('');

    // Aguardar estabilização
    await waitFor(() => {
      expect(['idle', 'error', 'saved']).toContain(result.current[2]);
    }, { timeout: 1500 });
  });

  it('deve resetar status de erro após edição bem-sucedida', async () => {
    // Arrange: Criar cenário de erro
    const largeSpy = vi.spyOn(Storage.prototype, 'setItem')
      .mockImplementationOnce(() => {
        const error = new Error('QuotaExceededError');
        error.name = 'QuotaExceededError';
        throw error;
      });

    const { result } = renderHook(() => useAutoSaveNotes('bash'));

    // Act: Primeira tentativa (vai falhar)
    act(() => {
      result.current[1]('x'.repeat(51 * 1024));
    });

    await waitFor(() => {
      expect(result.current[2]).toBe('quota_exceeded');
    }, { timeout: 3000 });

    // Restaurar localStorage.setItem para funcionar normalmente
    largeSpy.mockRestore();

    // Act: Segunda tentativa (vai funcionar)
    act(() => {
      result.current[1]('Nota pequena que funciona');
    });

    // Assert: Verificar que erro foi limpo e salvou com sucesso
    await waitFor(() => {
      expect(result.current[2]).toBe('saved');
    }, { timeout: 3000 });
  });

  it('deve usar courseId diferente para notas independentes', () => {
    // Arrange: Salvar notas para diferentes cursos
    localStorage.setItem('bash-learning-notes', 'Notas de Bash');
    localStorage.setItem('rust-learning-notes', 'Notas de Rust');
    localStorage.setItem('c-learning-notes', 'Notas de C');

    // Act: Renderizar hooks para cada curso
    const { result: bashResult } = renderHook(() => useAutoSaveNotes('bash'));
    const { result: rustResult } = renderHook(() => useAutoSaveNotes('rust'));
    const { result: cResult } = renderHook(() => useAutoSaveNotes('c'));

    // Assert: Verificar que cada curso tem suas próprias notas
    expect(bashResult.current[0]).toBe('Notas de Bash');
    expect(rustResult.current[0]).toBe('Notas de Rust');
    expect(cResult.current[0]).toBe('Notas de C');
  });

  it('deve cancelar auto-save anterior quando nota é editada rapidamente', async () => {
    // Arrange: Renderizar hook
    const { result } = renderHook(() => useAutoSaveNotes('bash'));

    // Act: Editar nota 3 vezes rapidamente (< 1s entre edições)
    act(() => {
      result.current[1]('Primeira edição');
    });

    await new Promise(resolve => setTimeout(resolve, 300));

    act(() => {
      result.current[1]('Segunda edição');
    });

    await new Promise(resolve => setTimeout(resolve, 300));

    act(() => {
      result.current[1]('Terceira edição FINAL');
    });

    // Assert: Aguardar auto-save e verificar que só a última foi salva
    await waitFor(() => {
      expect(result.current[2]).toBe('saved');
    }, { timeout: 3000 });

    expect(localStorage.getItem('bash-learning-notes')).toBe('Terceira edição FINAL');
  });

  it('deve limpar notas quando setNotes recebe string vazia', async () => {
    // Arrange: Criar nota inicial
    localStorage.setItem('rust-learning-notes', 'Nota inicial');
    const { result } = renderHook(() => useAutoSaveNotes('rust'));

    // Act: Limpar notas
    act(() => {
      result.current[1]('');
    });

    // Assert: Verificar que notas foram limpas
    await waitFor(() => {
      expect(result.current[2]).toBe('saved');
    }, { timeout: 3000 });

    expect(result.current[0]).toBe('');
    // localStorage pode retornar '' ou null para strings vazias
    const savedValue = localStorage.getItem('rust-learning-notes');
    expect(savedValue === '' || savedValue === null).toBe(true);
  });

  it('deve retornar sizeInfo inicial zerado para nota vazia', () => {
    // Act: Renderizar hook sem notas
    const { result } = renderHook(() => useAutoSaveNotes('claude-code'));

    // Assert: Verificar sizeInfo inicial
    const sizeInfo = result.current[3];
    expect(sizeInfo.sizeBytes).toBe(0);
    expect(sizeInfo.sizeKB).toBe(0);
    expect(sizeInfo.percentage).toBe(0);
  });
});
