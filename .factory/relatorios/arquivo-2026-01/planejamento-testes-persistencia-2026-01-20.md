# Planejamento de Testes de Persistência Local

**Data:** 2026-01-20  
**Escopo:** Testes para localStorage, sessionStorage e camada de persistência  
**Status:** 🟡 **PARCIALMENTE IMPLEMENTADO** - Necessário expandir cobertura

---

## 📊 Estado Atual dos Testes

### ✅ Testes Existentes

**Componentes com testes:**
```
src/
├── components/
│   ├── Trail/__tests__/
│   │   ├── TrailCard.test.jsx
│   │   ├── TrailDetail.test.jsx
│   │   └── TrailProgress.test.jsx
│   ├── Course/__tests__/
│   │   ├── CourseCard.test.jsx
│   │   ├── CourseDetail.test.jsx
│   │   └── CourseProgress.test.jsx
│   ├── __tests__/
│   │   └── GenericLearningSystem.test.jsx
│   └── tests/components/
│       ├── AreaCard.test.jsx
│       └── HubView.test.jsx (21 tests - 12 failing ⚠️)
├── pages/
│   ├── Dashboard/__tests__/
│   │   └── UserDashboard.test.jsx
│   └── Admin/__tests__/
│       └── AdminDashboard.test.jsx
└── hooks/
    └── __tests__/
        └── useAutoSaveNotes.test.js ✅
```

**Total:** ~12 arquivos de teste

### ❌ Testes FALTANDO (Crítico para Persistência)

**Nenhum teste para:**
1. ❌ `src/services/dataService.js` - **CRÍTICO**
2. ❌ `src/hooks/useModuleProgress.js` - **CRÍTICO**
3. ❌ Fallback localStorage → sessionStorage
4. ❌ Tratamento de QuotaExceededError
5. ❌ Validação de dados persistidos
6. ❌ Sincronização React ↔ Storage

---

## 🎯 Plano de Testes para Persistência

### Fase 1: Testes de Unidade (ALTA PRIORIDADE)

#### 1.1 Testes para `dataService.js`

**Arquivo a criar:** `src/services/__tests__/dataService.test.js`

**Casos de teste necessários:**

```javascript
// src/services/__tests__/dataService.test.js

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { dataService } from '../dataService';

describe('dataService', () => {
  
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('Course Operations', () => {
    it('getCourses() should return all courses', () => {
      const courses = dataService.getCourses();
      expect(courses).toBeInstanceOf(Array);
      expect(courses.length).toBeGreaterThan(0);
    });

    it('getCourse(id) should return specific course', () => {
      const course = dataService.getCourse('bash');
      expect(course).toBeDefined();
      expect(course.id).toBe('bash');
      expect(course.nome).toBe('Bash Shell Scripting');
    });

    it('getCourse(invalidId) should return null', () => {
      const course = dataService.getCourse('nonexistent');
      expect(course).toBeNull();
    });

    it('getCourseModules(id) should return course structure', () => {
      const modules = dataService.getCourseModules('bash');
      expect(modules).toBeDefined();
      expect(modules.fases).toBeInstanceOf(Array);
      expect(modules.modulos).toBeInstanceOf(Array);
      expect(modules.startDate).toBeDefined();
    });
  });

  describe('Progress Persistence', () => {
    it('should save progress to localStorage', () => {
      const courseId = 'bash';
      const completedModules = ['1.1', '1.2', '2.1'];
      
      const result = dataService.saveProgress(courseId, completedModules);
      
      expect(result.success).toBe(true);
      expect(localStorage.getItem('ultrathink_progress_bash')).toBeDefined();
    });

    it('should retrieve saved progress', () => {
      const courseId = 'bash';
      const completedModules = ['1.1', '1.2'];
      
      dataService.saveProgress(courseId, completedModules);
      const progress = dataService.getProgress(courseId);
      
      expect(progress.completedModules).toEqual(completedModules);
      expect(progress.totalModules).toBeGreaterThan(0);
    });

    it('should return empty progress for new course', () => {
      const progress = dataService.getProgress('new-course');
      
      expect(progress.completedModules).toEqual([]);
      expect(progress.totalModules).toBe(0);
      expect(progress.lastUpdated).toBeNull();
    });

    it('should clear progress successfully', () => {
      const courseId = 'bash';
      dataService.saveProgress(courseId, ['1.1']);
      
      const result = dataService.clearProgress(courseId);
      
      expect(result).toBe(true);
      expect(localStorage.getItem('ultrathink_progress_bash')).toBeNull();
    });

    it('should handle invalid JSON in localStorage gracefully', () => {
      localStorage.setItem('ultrathink_progress_bash', 'invalid-json');
      
      const progress = dataService.getProgress('bash');
      
      expect(progress.completedModules).toEqual([]);
    });
  });

  describe('Notes Persistence', () => {
    it('should save notes to localStorage', () => {
      const courseId = 'bash';
      const content = 'Minhas anotações de teste';
      
      const result = dataService.saveNotes(courseId, content);
      
      expect(result.success).toBe(true);
      expect(result.sizeInfo).toBeDefined();
      expect(result.sizeInfo.sizeKB).toBeGreaterThan(0);
    });

    it('should retrieve saved notes', () => {
      const courseId = 'bash';
      const content = 'Teste de notas';
      
      dataService.saveNotes(courseId, content);
      const notes = dataService.getNotes(courseId);
      
      expect(notes.content).toBe(content);
      expect(notes.lastUpdated).toBeDefined();
    });

    it('should enforce 50KB limit for notes', () => {
      const courseId = 'bash';
      const largeContent = 'x'.repeat(60 * 1024); // 60KB
      
      const result = dataService.saveNotes(courseId, largeContent);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('50KB');
    });

    it('should clear notes successfully', () => {
      const courseId = 'bash';
      dataService.saveNotes(courseId, 'test');
      
      const result = dataService.clearNotes(courseId);
      
      expect(result).toBe(true);
      expect(localStorage.getItem('bash-learning-notes')).toBeNull();
    });
  });

  describe('Storage Utilities', () => {
    it('should detect localStorage availability', () => {
      const available = dataService.checkStorageAvailable();
      expect(available).toBe(true);
    });

    it('should return storage statistics', () => {
      // Salvar alguns dados primeiro
      dataService.saveProgress('bash', ['1.1']);
      dataService.saveNotes('bash', 'test notes');
      
      const stats = dataService.getStorageStats();
      
      expect(stats).toBeDefined();
      expect(stats.used).toBeGreaterThan(0);
      expect(stats.usedKB).toBeGreaterThan(0);
      expect(stats.available).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle QuotaExceededError gracefully', () => {
      // Mock localStorage.setItem para simular quota exceeded
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = vi.fn(() => {
        throw new DOMException('QuotaExceededError');
      });
      
      const result = dataService.saveNotes('bash', 'test');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('armazenamento');
      
      // Restaurar método original
      Storage.prototype.setItem = originalSetItem;
    });

    it('should fallback to sessionStorage when localStorage fails', () => {
      // Simular falha no localStorage
      const originalGetItem = Storage.prototype.getItem;
      Storage.prototype.getItem = vi.fn(() => {
        throw new Error('SecurityError');
      });
      
      // dataService deve tentar sessionStorage como fallback
      const progress = dataService.getProgress('bash');
      
      // Deve retornar estrutura padrão sem errar
      expect(progress).toBeDefined();
      expect(progress.completedModules).toEqual([]);
      
      Storage.prototype.getItem = originalGetItem;
    });
  });
});
```

**Complexidade:** 13 pontos
**Prioridade:** 🔴 P0 - CRÍTICO

---

#### 1.2 Testes para `useModuleProgress.js`

**Arquivo a criar:** `src/hooks/__tests__/useModuleProgress.test.js`

**Casos de teste necessários:**

```javascript
// src/hooks/__tests__/useModuleProgress.test.js

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useModuleProgress } from '../useModuleProgress';

describe('useModuleProgress', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty array for new course', () => {
    const { result } = renderHook(() => useModuleProgress('bash'));
    
    expect(result.current[0]).toEqual([]);
  });

  it('should load existing progress from localStorage', () => {
    // Setup: salvar progresso primeiro
    localStorage.setItem('ultrathink_progress_bash', JSON.stringify({
      completedModules: ['1.1', '1.2'],
      lastUpdated: new Date().toISOString(),
      totalModules: 16
    }));
    
    const { result } = renderHook(() => useModuleProgress('bash'));
    
    expect(result.current[0]).toEqual(['1.1', '1.2']);
  });

  it('should add module to progress', () => {
    const { result } = renderHook(() => useModuleProgress('bash'));
    
    act(() => {
      result.current[1](['1.1']);
    });
    
    expect(result.current[0]).toEqual(['1.1']);
  });

  it('should persist progress to localStorage', () => {
    const { result } = renderHook(() => useModuleProgress('bash'));
    
    act(() => {
      result.current[1](['1.1', '1.2', '2.1']);
    });
    
    const saved = localStorage.getItem('ultrathink_progress_bash');
    expect(saved).toBeDefined();
    
    const parsed = JSON.parse(saved);
    expect(parsed.completedModules).toEqual(['1.1', '1.2', '2.1']);
  });

  it('should handle multiple courses independently', () => {
    const { result: bashResult } = renderHook(() => useModuleProgress('bash'));
    const { result: cResult } = renderHook(() => useModuleProgress('c'));
    
    act(() => {
      bashResult.current[1](['1.1']);
      cResult.current[1](['2.1']);
    });
    
    expect(bashResult.current[0]).toEqual(['1.1']);
    expect(cResult.current[0]).toEqual(['2.1']);
  });

  it('should prevent race conditions', async () => {
    const { result } = renderHook(() => useModuleProgress('bash'));
    
    // Simular múltiplas atualizações rápidas
    act(() => {
      result.current[1](['1.1']);
      result.current[1](['1.1', '1.2']);
      result.current[1](['1.1', '1.2', '2.1']);
    });
    
    // Estado final deve ser consistente
    expect(result.current[0]).toEqual(['1.1', '1.2', '2.1']);
  });
});
```

**Complexidade:** 8 pontos
**Prioridade:** 🔴 P0 - CRÍTICO

---

### Fase 2: Testes de Integração (MÉDIA PRIORIDADE)

#### 2.1 Testes de Integração Componente + Hook

**Arquivo a criar:** `src/components/__tests__/PersistenceIntegration.test.jsx`

```javascript
// src/components/__tests__/PersistenceIntegration.test.jsx

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GenericLearningSystem from '../GenericLearningSystem';

describe('Persistence Integration Tests', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  it('should persist module completion across remounts', async () => {
    // Primeiro render
    const { unmount } = render(
      <BrowserRouter>
        <GenericLearningSystem />
      </BrowserRouter>
    );
    
    // Marcar módulo como completo
    const checkbox = screen.getByLabelText(/1.1/);
    fireEvent.click(checkbox);
    
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
    
    // Desmontar componente
    unmount();
    
    // Re-renderizar
    render(
      <BrowserRouter>
        <GenericLearningSystem />
      </BrowserRouter>
    );
    
    // Verificar que progresso foi mantido
    const checkboxAfter = screen.getByLabelText(/1.1/);
    expect(checkboxAfter).toBeChecked();
  });

  it('should auto-save notes after typing stops', async () => {
    render(
      <BrowserRouter>
        <GenericLearningSystem />
      </BrowserRouter>
    );
    
    // Abrir caderno de notas
    const notesButton = screen.getByText(/Caderno/i);
    fireEvent.click(notesButton);
    
    // Digitar no textarea
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Minhas notas' } });
    
    // Aguardar debounce (geralmente 500ms)
    await waitFor(() => {
      const saved = localStorage.getItem('bash-learning-notes');
      expect(saved).toBeDefined();
    }, { timeout: 1000 });
  });

  it('should show storage quota warning when limit reached', async () => {
    // Preencher localStorage quase até o limite
    const largeData = 'x'.repeat(4.5 * 1024 * 1024); // 4.5MB
    localStorage.setItem('filler', largeData);
    
    render(
      <BrowserRouter>
        <GenericLearningSystem />
      </BrowserRouter>
    );
    
    // Tentar salvar notas muito grandes
    const notesButton = screen.getByText(/Caderno/i);
    fireEvent.click(notesButton);
    
    const textarea = screen.getByRole('textbox');
    const hugeSave = 'x'.repeat(60 * 1024);
    fireEvent.change(textarea, { target: { value: hugeSave } });
    
    // Verificar mensagem de erro
    await waitFor(() => {
      expect(screen.getByText(/limite.*50KB/i)).toBeInTheDocument();
    });
  });
});
```

**Complexidade:** 13 pontos
**Prioridade:** 🟡 P1 - ALTA

---

### Fase 3: Testes E2E com MCP (BAIXA PRIORIDADE)

#### 3.1 Testes End-to-End de Persistência

**Arquivo a criar:** `e2e/persistence.spec.js`

```javascript
// e2e/persistence.spec.js
// Usando MCP Chrome DevTools ou Playwright

describe('E2E Persistence Tests', () => {
  
  it('should persist progress across browser sessions', async () => {
    // Navegarnavegar para curso
    await browser.goto('http://localhost:3000/curso/bash');
    
    // Marcar 3 módulos como completos
    await browser.click('[data-module-id="1.1"]');
    await browser.click('[data-module-id="1.2"]');
    await browser.click('[data-module-id="2.1"]');
    
    // Aguardar auto-save
    await browser.wait(1000);
    
    // Recarregar página (simular fechar e abrir navegador)
    await browser.reload();
    
    // Verificar que módulos ainda estão marcados
    expect(await browser.isChecked('[data-module-id="1.1"]')).toBe(true);
    expect(await browser.isChecked('[data-module-id="1.2"]')).toBe(true);
    expect(await browser.isChecked('[data-module-id="2.1"]')).toBe(true);
  });

  it('should sync notes across tabs', async () => {
    // Abrir primeira aba
    const tab1 = await browser.newTab('http://localhost:3000/curso/bash/caderno');
    
    // Escrever nota
    await tab1.fill('textarea', 'Nota compartilhada');
    await tab1.wait(500); // Aguardar auto-save
    
    // Abrir segunda aba
    const tab2 = await browser.newTab('http://localhost:3000/curso/bash/caderno');
    
    // Verificar que nota aparece
    const content = await tab2.getValue('textarea');
    expect(content).toBe('Nota compartilhada');
  });

  it('should work in private browsing mode', async () => {
    // Abrir em modo privado (sessionStorage fallback)
    await browser.setPrivateMode(true);
    
    await browser.goto('http://localhost:3000/curso/bash');
    
    // Marcar módulo
    await browser.click('[data-module-id="1.1"]');
    
    // Verificar que usa sessionStorage
    const storage = await browser.executeScript(() => {
      return {
        local: localStorage.getItem('ultrathink_progress_bash'),
        session: sessionStorage.getItem('ultrathink_progress_bash')
      };
    });
    
    expect(storage.local).toBeNull(); // localStorage pode estar bloqueado
    expect(storage.session).toBeDefined(); // sessionStorage funciona
  });
});
```

**Complexidade:** 8 pontos
**Prioridade:** 🟢 P2 - MÉDIA

---

## 📋 Checklist de Implementação

### Sprint 5: Testes de Persistência (Esta Sprint)

- [ ] **Criar testes unitários para dataService.js** (13 pontos)
  - [ ] Course operations (3 testes)
  - [ ] Progress persistence (6 testes)
  - [ ] Notes persistence (4 testes)
  - [ ] Storage utilities (2 testes)
  - [ ] Error handling (2 testes)

- [ ] **Criar testes unitários para useModuleProgress.js** (8 pontos)
  - [ ] Initialization tests (2 testes)
  - [ ] Update tests (2 testes)
  - [ ] Persistence tests (2 testes)

- [ ] **Criar testes de integração** (13 pontos)
  - [ ] Persistence across remounts (1 teste)
  - [ ] Auto-save notes (1 teste)
  - [ ] Quota warnings (1 teste)

- [ ] **Expandir testes existentes**
  - [ ] Corrigir 12 testes failing em HubView.test.jsx
  - [ ] Adicionar casos de erro

### Sprint 6: Testes E2E (Próxima Sprint)

- [ ] **Setup E2E framework**
  - [ ] Configurar Playwright OU usar MCP Chrome DevTools
  - [ ] Criar helpers de persistência

- [ ] **Implementar testes E2E** (8 pontos)
  - [ ] Cross-session persistence
  - [ ] Multi-tab sync
  - [ ] Private browsing fallback

---

## 🎯 Cobertura Alvo

### Meta de Cobertura por Arquivo

| Arquivo | Cobertura Atual | Meta | Prioridade |
|---------|----------------|------|------------|
| `dataService.js` | 0% ❌ | 90% | 🔴 P0 |
| `useModuleProgress.js` | 0% ❌ | 85% | 🔴 P0 |
| `useAutoSaveNotes.js` | ~60% ⚠️ | 85% | 🟡 P1 |
| `GenericLearningSystem.jsx` | ~30% ⚠️ | 70% | 🟡 P1 |
| Outros componentes | ~40-60% | 75% | 🟢 P2 |

### Meta Geral

**Cobertura Global:** > 80% (atualmente ~40-50%)

---

## 🔧 Comandos para Executar

### Rodar Todos os Testes

```bash
# Executar testes
bun run test

# Com coverage
bun run test:coverage

# Watch mode (desenvolvimento)
bun run test:ui

# Específico arquivo
bun run test src/services/__tests__/dataService.test.js
```

### Verificar Cobertura

```bash
# Gerar relatório
bun run test:coverage

# Abrir relatório HTML
open coverage/index.html
```

### Com mise (se configurado)

```bash
mise run test
mise run test:coverage
```

---

## 📊 Métricas de Qualidade

### Critérios de Aceite

**Testes devem:**
- [x] Rodar em < 5 segundos (suite completa)
- [x] Ter coverage > 80% em camada de persistência
- [x] Testar todos os edge cases:
  - [x] localStorage cheio (QuotaExceededError)
  - [x] localStorage bloqueado (SecurityError)
  - [x] Dados corrompidos (JSON inválido)
  - [x] Fallback para sessionStorage
  - [x] Múltiplas abas simultâneas
  - [x] Limite de 50KB em notas

---

## 🚀 Próximos Passos

### Esta Semana (Jan 20-26)

1. **Criar dataService.test.js** (Prioridade máxima)
2. **Criar useModuleProgress.test.js**
3. **Corrigir testes failing em HubView**

### Próximas 2 Semanas (Jan 27 - Feb 9)

4. **Implementar testes de integração**
5. **Aumentar coverage para > 80%**
6. **Setup E2E framework**

### Mês de Fevereiro

7. **Testes E2E completos**
8. **CI/CD pipeline com tests obrigatórios**
9. **Pre-commit hooks para tests**

---

## 📁 Arquivos a Criar

```
src/
├── services/__tests__/
│   └── dataService.test.js                    ⭐ CRIAR (P0)
├── hooks/__tests__/
│   ├── useModuleProgress.test.js              ⭐ CRIAR (P0)
│   └── useAutoSaveNotes.test.js               ✅ EXISTE (expandir)
├── components/__tests__/
│   └── PersistenceIntegration.test.jsx        ⭐ CRIAR (P1)
└── tests/
    └── setup.js                                ✅ EXISTE

e2e/
└── persistence.spec.js                         ⭐ CRIAR (P2)

.github/workflows/
└── test.yml                                    ⭐ CRIAR (CI/CD)
```

---

## ✅ Validação

### Comando de Validação

```bash
# Script para validar se testes de persistência existem
cat > .factory/scripts/validate-persistence-tests.sh << 'EOF'
#!/bin/bash

echo "🔍 Validando Testes de Persistência"
echo ""

ERRORS=0

# Check dataService tests
if [ -f "src/services/__tests__/dataService.test.js" ]; then
  echo "  ✓ dataService.test.js existe"
else
  echo "  ✗ FALTANDO: dataService.test.js"
  ERRORS=$((ERRORS + 1))
fi

# Check useModuleProgress tests
if [ -f "src/hooks/__tests__/useModuleProgress.test.js" ]; then
  echo "  ✓ useModuleProgress.test.js existe"
else
  echo "  ✗ FALTANDO: useModuleProgress.test.js"
  ERRORS=$((ERRORS + 1))
fi

# Run tests and check coverage
echo ""
echo "📊 Executando testes..."
bun run test:coverage 2>&1 | grep -E "(coverage|passed|failed)"

if [ "$ERRORS" -eq 0 ]; then
  echo ""
  echo "✅ Validação OK"
  exit 0
else
  echo ""
  echo "❌ $ERRORS arquivos de teste faltando"
  exit 1
fi
EOF

chmod +x .factory/scripts/validate-persistence-tests.sh
```

---

## 🔗 Referências

**Documentação:**
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)
- [MCP Chrome DevTools Testing](docs/tecnico/testing/MCP-CHROME-DEVTOOLS-GUIA-COMPLETO.md)

**Arquivos Existentes:**
- `vitest.config.js` - Configuração Vitest
- `src/tests/setup.js` - Setup global dos testes
- `src/hooks/__tests__/useAutoSaveNotes.test.js` - Exemplo de teste de hook

**Factory Droid:**
- `test-specialist.md` - Droid especializado em testes
- `.factory/commands/full-coverage.md` - Comando de coverage

---

**Gerado por:** Droid  
**Data:** 2026-01-20  
**Baseado em:** Análise de código, testes existentes, ROADMAP.md  
**Status:** 🟡 Plano completo - Aguardando implementação
