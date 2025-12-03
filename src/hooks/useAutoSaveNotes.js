import { useState, useEffect, useRef } from 'react';

/**
 * Hook para auto-save de notas com error handling robusto
 *
 * Implementa padrões da skill DS-005 (localStorage-patterns):
 * - Try/catch em todas operações localStorage
 * - Tratamento de QuotaExceededError
 * - Limite de 50KB por nota com alerta
 * - Debounce de 1 segundo
 * - Graceful degradation (fallback para sessionStorage)
 * - User-friendly error messages
 *
 * @param {string} courseId - ID do curso ('c', 'bash', 'rust', 'claudecode', 'vscode')
 * @param {number} debounceMs - Delay para auto-save (padrão: 1000ms)
 * @returns {[string, function, string, object]} [notes, setNotes, saveStatus, sizeInfo]
 *
 * @example
 * ```jsx
 * function CLearningSystem() {
 *   const [notes, setNotes, saveStatus, sizeInfo] = useAutoSaveNotes('c');
 *
 *   return (
 *     <div>
 *       <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
 *       {saveStatus === 'saving' && <span>💾 Salvando...</span>}
 *       {saveStatus === 'saved' && <span>✅ Salvo</span>}
 *       {saveStatus === 'error' && <span>⚠️ Erro ao salvar</span>}
 *       <span>Tamanho: {sizeInfo.sizeKB} KB / 50 KB</span>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAutoSaveNotes(courseId, debounceMs = 1000) {
  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved, error, quota_exceeded
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [sizeInfo, setSizeInfo] = useState({ sizeKB: 0, sizeBytes: 0, percentage: 0 });
  const timerRef = useRef(null);

  const MAX_NOTE_SIZE_BYTES = 50 * 1024; // 50KB
  const key = `${courseId}-learning-notes`; // Mantém compatibilidade com formato antigo

  // Carregar notas ao montar componente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setNotes(saved);
        setSaveStatus('saved');

        // Calcular tamanho inicial
        const sizeBytes = new Blob([saved]).size;
        const sizeKB = (sizeBytes / 1024).toFixed(2);
        const percentage = ((sizeBytes / MAX_NOTE_SIZE_BYTES) * 100).toFixed(1);
        setSizeInfo({ sizeKB, sizeBytes, percentage });
      }
    } catch (error) {
      console.error(`[useAutoSaveNotes] Erro ao carregar notas (${key}):`, error);

      if (error.name === 'SecurityError') {
        setStorageAvailable(false);
        setSaveStatus('error');
        console.warn('[useAutoSaveNotes] localStorage bloqueado (modo privado?)');
      }
    }
  }, [key]);

  // Auto-save com debounce e validação de tamanho
  useEffect(() => {
    if (!storageAvailable) {
      console.warn('[useAutoSaveNotes] Storage indisponível, skip auto-save');
      return;
    }

    // Limpar timer anterior
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setSaveStatus('saving');

    timerRef.current = setTimeout(() => {
      try {
        // Validar tamanho
        const sizeBytes = new Blob([notes]).size;
        const sizeKB = (sizeBytes / 1024).toFixed(2);
        const percentage = ((sizeBytes / MAX_NOTE_SIZE_BYTES) * 100).toFixed(1);

        // Atualizar info de tamanho
        setSizeInfo({ sizeKB, sizeBytes, percentage });

        // Bloquear se exceder 50KB
        if (sizeBytes > MAX_NOTE_SIZE_BYTES) {
          console.error(`[useAutoSaveNotes] Nota muito grande: ${sizeKB} KB (limite: 50 KB)`);
          setSaveStatus('quota_exceeded');

          alert(
            `⚠️ Nota muito grande!\n\n` +
            `Tamanho atual: ${sizeKB} KB\n` +
            `Limite: 50.00 KB\n\n` +
            `Por favor, reduza o conteúdo ou divida em múltiplas notas.`
          );
          return;
        }

        // Avisar quando atingir 80% do limite
        if (percentage >= 80 && percentage < 100) {
          console.warn(`[useAutoSaveNotes] Nota grande (${percentage}% do limite)`);
        }

        // Tentar salvar em localStorage
        localStorage.setItem(key, notes);
        setSaveStatus('saved');

      } catch (error) {
        console.error(`[useAutoSaveNotes] Erro ao salvar notas (${key}):`, error);
        setSaveStatus('error');

        // Tratamento específico por tipo de erro
        if (error.name === 'QuotaExceededError') {
          console.error('[useAutoSaveNotes] QuotaExceededError: Storage cheio');

          // Fallback 1: Tentar salvar em sessionStorage
          try {
            sessionStorage.setItem(`${key}_temp`, notes);
            console.log('[useAutoSaveNotes] Fallback: Nota salva em sessionStorage (temporário)');

            alert(
              '⚠️ Armazenamento Cheio!\n\n' +
              'Suas notas foram salvas temporariamente durante esta sessão.\n' +
              'Por favor, faça backup manual (copie o texto) e limpe dados antigos.\n\n' +
              '💡 Dica: Abra DevTools (F12) → Application → Local Storage'
            );
          } catch (sessionError) {
            console.error('[useAutoSaveNotes] Fallback falhou (sessionStorage também cheio)');

            alert(
              '❌ Não foi possível salvar sua nota!\n\n' +
              'O armazenamento do navegador está cheio.\n' +
              'Por favor, copie o texto agora e limpe dados antigos.'
            );
          }

        } else if (error.name === 'SecurityError') {
          setStorageAvailable(false);
          console.error('[useAutoSaveNotes] SecurityError: Modo privado detectado');

          alert(
            '🔒 Modo Privado Detectado\n\n' +
            'Suas notas não serão salvas permanentemente.\n' +
            'Use o navegador em modo normal para persistência de dados.'
          );

        } else {
          console.error('[useAutoSaveNotes] Erro desconhecido ao salvar:', error);

          alert(
            '❌ Erro ao Salvar Notas\n\n' +
            'Ocorreu um erro inesperado.\n' +
            'Tente recarregar a página ou copie seu texto como backup.'
          );
        }
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [notes, key, debounceMs, storageAvailable]);

  return [notes, setNotes, saveStatus, sizeInfo];
}
