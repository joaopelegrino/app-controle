# Troubleshooting - localStorage Patterns

**Arquivo Auxiliar da Skill:** localStorage-patterns
**Última Atualização:** 2025-11-19

---

## 🔍 Diagnostic Tools

### Tool 1: localStorage Health Check

```javascript
function diagnoseLocalStorage() {
  const results = {
    timestamp: new Date().toISOString(),
    browser: navigator.userAgent,
    tests: {}
  };

  // Test 1: Availability
  results.tests.available = {
    name: 'localStorage Available',
    passed: typeof Storage !== 'undefined',
    details: typeof Storage !== 'undefined' ? 'OK' : 'Storage API not supported'
  };

  // Test 2: Read/Write
  try {
    const testKey = '__ultrathink_test__';
    localStorage.setItem(testKey, 'test');
    const value = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);

    results.tests.readWrite = {
      name: 'Read/Write',
      passed: value === 'test',
      details: 'OK'
    };
  } catch (error) {
    results.tests.readWrite = {
      name: 'Read/Write',
      passed: false,
      details: `${error.name}: ${error.message}`
    };
  }

  // Test 3: Quota Info
  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then(estimate => {
      results.tests.quota = {
        name: 'Quota Info',
        passed: true,
        details: {
          usedMB: (estimate.usage / 1024 / 1024).toFixed(2),
          quotaMB: (estimate.quota / 1024 / 1024).toFixed(2),
          percentUsed: ((estimate.usage / estimate.quota) * 100).toFixed(1)
        }
      };
    });
  } else {
    results.tests.quota = {
      name: 'Quota Info',
      passed: false,
      details: 'Storage API not supported'
    };
  }

  // Test 4: Ultrathink Keys
  const keys = Object.keys(localStorage).filter(k => k.startsWith('ultrathink_'));
  results.tests.ultrath inkKeys = {
    name: 'Ultrathink Keys',
    passed: true,
    details: {
      count: keys.length,
      keys: keys.map(key => ({
        key,
        sizeKB: (new Blob([localStorage.getItem(key)]).size / 1024).toFixed(2)
      }))
    }
  };

  // Test 5: Data Integrity
  let corruptedCount = 0;
  keys.forEach(key => {
    try {
      JSON.parse(localStorage.getItem(key));
    } catch (error) {
      corruptedCount++;
    }
  });

  results.tests.dataIntegrity = {
    name: 'Data Integrity',
    passed: corruptedCount === 0,
    details: corruptedCount === 0
      ? 'All data valid'
      : `${corruptedCount} corrupted keys found`
  };

  console.table(results.tests);
  return results;
}

// Uso
const diagnosis = diagnoseLocalStorage();
```

---

### Tool 2: Visualizar Dados

```javascript
function visualizeLocalStorage() {
  const data = Object.keys(localStorage)
    .filter(k => k.startsWith('ultrathink_'))
    .map(key => {
      const raw = localStorage.getItem(key);
      const sizeBytes = new Blob([raw]).size;

      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        parsed = { error: 'Failed to parse JSON' };
      }

      return {
        key,
        sizeKB: (sizeBytes / 1024).toFixed(2),
        preview: raw.substring(0, 50) + '...',
        data: parsed
      };
    });

  console.log('📊 localStorage Visualization:');
  console.table(data);

  return data;
}

// Uso em DevTools
visualizeLocalStorage();
```

---

## 🐛 Common Issues

### Issue 1: "Notas não salvam"

**Symptoms:**
- Usuario digita mas notas desaparecem
- Console: sem erros
- localStorage vazio

**Diagnosis:**
```javascript
// 1. Verificar se localStorage está disponível
console.log('localStorage disponível?', typeof Storage !== 'undefined');

// 2. Verificar modo privado
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('✅ localStorage funcional');
} catch (e) {
  console.error('❌ localStorage bloqueado:', e.name);
}

// 3. Verificar keys
console.log('Keys:', Object.keys(localStorage).filter(k => k.startsWith('ultrathink_')));

// 4. Verificar component lifecycle
console.log('useEffect rodou?', 'Verificar console logs');
```

**Soluções:**
1. **Modo privado:** Avisar usuário + usar sessionStorage fallback
2. **Key errada:** Corrigir para `ultrathink_notes_${courseId}`
3. **useEffect não roda:** Verificar dependências array
4. **Cleanup incorreto:** Remover `localStorage.removeItem` do cleanup

---

### Issue 2: "Progresso desaparece ao recarregar"

**Symptoms:**
- Progresso salvo mas não carrega
- F5 reseta progresso
- localStorage tem dados mas UI não reflete

**Diagnosis:**
```javascript
// 1. Verificar se dados existem
const key = 'ultrathink_progress_c';
const raw = localStorage.getItem(key);
console.log('Dados existem?', raw !== null);

// 2. Verificar formato JSON
try {
  const data = JSON.parse(raw);
  console.log('JSON válido:', data);
} catch (e) {
  console.error('JSON corrompido:', e);
}

// 3. Verificar se componente carrega dados
console.log('useEffect de load rodou?');

// 4. Verificar state inicial
console.log('State inicial:', completed); // Deve ser [] ou array com IDs
```

**Soluções:**
1. **JSON corrompido:** `localStorage.removeItem(key)` e reiniciar
2. **useEffect sem dependências:** Adicionar `[key]` ao array
3. **State não atualiza:** Verificar `setCompleted(data.completedModules)`
4. **Key mudou:** Migrar dados da key antiga para nova

---

### Issue 3: "QuotaExceededError ao salvar"

**Symptoms:**
- Console: `QuotaExceededError`
- Notas muito grandes
- Safari com quota baixa

**Diagnosis:**
```javascript
// 1. Verificar tamanho total
async function checkQuota() {
  if (navigator.storage) {
    const estimate = await navigator.storage.estimate();
    console.log('Quota:', {
      usedMB: (estimate.usage / 1024 / 1024).toFixed(2),
      quotaMB: (estimate.quota / 1024 / 1024).toFixed(2),
      percent: ((estimate.usage / estimate.quota) * 100).toFixed(1)
    });
  }
}

checkQuota();

// 2. Verificar tamanho de cada item
Object.keys(localStorage)
  .filter(k => k.startsWith('ultrathink_'))
  .forEach(key => {
    const size = new Blob([localStorage.getItem(key)]).size;
    console.log(`${key}: ${(size / 1024).toFixed(2)} KB`);
  });
```

**Soluções:**
1. **Limpar dados antigos:** `clearOldData(90)`
2. **Comprimir notas:** Remover espaços duplicados
3. **Dividir notas:** Múltiplas keys (`notes_c_1`, `notes_c_2`)
4. **Fallback:** Usar sessionStorage temporário
5. **Download backup:** Oferecer download .txt

---

### Issue 4: "Dados corrompidos (JSON inválido)"

**Symptoms:**
- Console: `SyntaxError: Unexpected token`
- `JSON.parse()` falha
- Dados não carregam

**Diagnosis:**
```javascript
function validateAllData() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('ultrathink_'));

  keys.forEach(key => {
    const raw = localStorage.getItem(key);

    try {
      JSON.parse(raw);
      console.log(`✅ ${key} válido`);
    } catch (error) {
      console.error(`❌ ${key} corrompido:`, error);
      console.log('Raw data:', raw.substring(0, 100));

      // Tentar corrigir
      // Ex: adicionar } faltando
      try {
        const fixed = raw + '}';
        JSON.parse(fixed);
        console.log('✅ Corrigido adicionando }');
        localStorage.setItem(key, fixed);
      } catch (e) {
        console.log('❌ Correção automática falhou');
        localStorage.removeItem(key);
      }
    }
  });
}

validateAllData();
```

**Soluções:**
1. **Remover dado corrompido:** `localStorage.removeItem(key)`
2. **Backup antes de remover:** `console.log(raw)` → copiar manualmente
3. **Prevenir:** Sempre usar `JSON.stringify()` para salvar
4. **Usar safe helpers:** `safeGetJSON()`, `safeSetJSON()`

---

### Issue 5: "Performance ruim ao digitar"

**Symptoms:**
- UI trava/lag ao digitar
- Muitas operações localStorage
- CPU alto em DevTools

**Diagnosis:**
```javascript
// Monitorar frequência de escritas
let writeCount = 0;
const originalSetItem = localStorage.setItem.bind(localStorage);

localStorage.setItem = function(...args) {
  writeCount++;
  return originalSetItem(...args);
};

setInterval(() => {
  console.log(`localStorage writes/sec: ${writeCount}`);
  writeCount = 0;
}, 1000);

// Resultado esperado: <1 write/sec
// Se >10 writes/sec: problema de debounce
```

**Soluções:**
1. **Adicionar debounce:** 1000ms (1 segundo)
2. **Usar onBlur:** Salvar apenas ao sair do textarea
3. **Batch updates:** Acumular mudanças e salvar batch
4. **Throttle:** Máximo 1 write/segundo

---

## 🛠️ Recovery Tools

### Tool: Backup & Restore

```javascript
// Backup completo
function backupLocalStorage() {
  const backup = {};

  Object.keys(localStorage)
    .filter(k => k.startsWith('ultrathink_'))
    .forEach(key => {
      backup[key] = localStorage.getItem(key);
    });

  const json = JSON.stringify(backup, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Download
  const a = document.createElement('a');
  a.href = url;
  a.download = `ultrathink-backup-${Date.now()}.json`;
  a.click();

  console.log('✅ Backup criado com sucesso');
  return backup;
}

// Restore
function restoreLocalStorage(backupFile) {
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const backup = JSON.parse(e.target.result);

      Object.entries(backup).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      console.log(`✅ Restored ${Object.keys(backup).length} keys`);
      alert('Backup restaurado com sucesso!');
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      alert('Arquivo de backup inválido!');
    }
  };

  reader.readAsText(backupFile);
}

// Uso
// Backup: backupLocalStorage();
// Restore: <input type="file" onChange={(e) => restoreLocalStorage(e.target.files[0])} />
```

---

### Tool: Clear All Data (Emergency)

```javascript
function clearAllUltrathinkData(confirm = false) {
  if (!confirm) {
    const confirmed = window.confirm(
      '⚠️ ATENÇÃO: Isso vai apagar TODOS os dados do Ultrathink (notas, progresso, configurações).\n\nTem certeza?'
    );

    if (!confirmed) {
      console.log('Operação cancelada');
      return;
    }
  }

  const keys = Object.keys(localStorage).filter(k => k.startsWith('ultrathink_'));

  console.log(`Removendo ${keys.length} keys...`);

  keys.forEach(key => {
    localStorage.removeItem(key);
    console.log(`Removido: ${key}`);
  });

  console.log('✅ Todos os dados do Ultrathink foram removidos');
  alert('Dados limpos com sucesso! Recarregue a página.');
}

// Uso (com double-confirm)
// clearAllUltrathinkData();
```

---

## 📚 Referências

- [Chrome DevTools - Application Tab](https://developer.chrome.com/docs/devtools/storage/localstorage/)
- [Firefox DevTools - Storage Inspector](https://firefox-source-docs.mozilla.org/devtools-user/storage_inspector/)
- [localStorage Skill Principal](../SKILL.md)
