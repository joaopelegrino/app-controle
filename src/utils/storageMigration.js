/**
 * Storage Migration Utility
 *
 * Migra dados do localStorage do prefixo antigo (ultrathink_*)
 * para o novo prefixo configurado (trainb2b_* ou customizado).
 *
 * @module utils/storageMigration
 * @version 1.0.0
 * @since Sprint 13 (White-Label Refactor)
 */

import { platformConfig, getStorageKey } from '../config/platform';

// Prefixo antigo (hardcoded antes da refatoração)
const OLD_PREFIX = 'ultrathink';

// Novo prefixo (vem da configuração centralizada)
const NEW_PREFIX = platformConfig.storage.prefix;

/**
 * Chaves fixas que precisam ser migradas
 */
const FIXED_KEYS_TO_MIGRATE = [
  'auth',
  'user',
  'api_token',
  'refresh_token',
  'table_ids',
  'language',
  'onboarding',
];

/**
 * Prefixos de chaves dinâmicas (progress_*, notes_*, onboarding_*)
 */
const DYNAMIC_KEY_PREFIXES = [
  'progress_',
  'notes_',
  'onboarding_',
];

/**
 * Verifica se a migração já foi realizada
 * @returns {boolean}
 */
export function isMigrationComplete() {
  try {
    const migrationKey = getStorageKey('_migration_complete');
    return localStorage.getItem(migrationKey) !== null;
  } catch {
    return true; // Se der erro, assume que já migrou para evitar loops
  }
}

/**
 * Marca a migração como completa
 */
function markMigrationComplete() {
  try {
    const migrationKey = getStorageKey('_migration_complete');
    localStorage.setItem(migrationKey, new Date().toISOString());
  } catch (error) {
    console.error('[StorageMigration] Erro ao marcar migração completa:', error);
  }
}

/**
 * Migra uma única chave do prefixo antigo para o novo
 * @param {string} oldKey - Chave antiga completa
 * @param {string} newKey - Chave nova completa
 * @returns {boolean} - Se migrou com sucesso
 */
function migrateKey(oldKey, newKey) {
  try {
    const value = localStorage.getItem(oldKey);
    if (value !== null) {
      localStorage.setItem(newKey, value);
      localStorage.removeItem(oldKey);
      return true;
    }
  } catch (error) {
    console.error(`[StorageMigration] Erro ao migrar ${oldKey}:`, error);
  }
  return false;
}

/**
 * Migra dados do localStorage do prefixo antigo para o novo
 *
 * Esta função deve ser executada uma vez no boot da aplicação.
 * Ela é idempotente - se já migrou, não faz nada.
 *
 * @returns {{ migrated: boolean, count: number, reason?: string }}
 */
export function migrateLocalStorage() {
  // Se os prefixos são iguais, não precisa migrar
  if (OLD_PREFIX === NEW_PREFIX) {
    return { migrated: false, count: 0, reason: 'same_prefix' };
  }

  // Verificar se já migrou
  if (isMigrationComplete()) {
    return { migrated: false, count: 0, reason: 'already_migrated' };
  }

  let migratedCount = 0;
  const migrationDetails = [];

  console.log(`[StorageMigration] Iniciando migração: ${OLD_PREFIX}_* -> ${NEW_PREFIX}_*`);

  // 1. Migrar chaves fixas
  FIXED_KEYS_TO_MIGRATE.forEach(key => {
    const oldKey = `${OLD_PREFIX}_${key}`;
    const newKey = getStorageKey(key);

    if (migrateKey(oldKey, newKey)) {
      migratedCount++;
      migrationDetails.push({ from: oldKey, to: newKey });
    }
  });

  // 2. Migrar chaves dinâmicas (progress_*, notes_*, onboarding_*)
  try {
    const allKeys = Object.keys(localStorage);

    allKeys.forEach(key => {
      // Verificar se é uma chave do prefixo antigo
      if (!key.startsWith(`${OLD_PREFIX}_`)) {
        return;
      }

      // Extrair o sufixo (parte após o prefixo)
      const suffix = key.replace(`${OLD_PREFIX}_`, '');

      // Verificar se é uma chave dinâmica conhecida
      const isDynamic = DYNAMIC_KEY_PREFIXES.some(prefix => suffix.startsWith(prefix));

      if (isDynamic) {
        const newKey = getStorageKey(suffix);

        if (migrateKey(key, newKey)) {
          migratedCount++;
          migrationDetails.push({ from: key, to: newKey });
        }
      }
    });
  } catch (error) {
    console.error('[StorageMigration] Erro ao migrar chaves dinâmicas:', error);
  }

  // 3. Marcar como migrado
  markMigrationComplete();

  // 4. Log do resultado
  if (migratedCount > 0) {
    console.log(`[StorageMigration] Migração completa: ${migratedCount} chaves migradas`);
    console.table(migrationDetails);
  } else {
    console.log('[StorageMigration] Nenhuma chave para migrar');
  }

  return {
    migrated: migratedCount > 0,
    count: migratedCount,
    details: migrationDetails,
  };
}

/**
 * Reseta o flag de migração (útil para testes/desenvolvimento)
 */
export function resetMigrationFlag() {
  try {
    const migrationKey = getStorageKey('_migration_complete');
    localStorage.removeItem(migrationKey);
    console.log('[StorageMigration] Flag de migração resetado');
  } catch (error) {
    console.error('[StorageMigration] Erro ao resetar flag:', error);
  }
}

/**
 * Lista todas as chaves do localStorage com prefixo antigo
 * (útil para diagnóstico)
 * @returns {string[]}
 */
export function listOldPrefixKeys() {
  try {
    return Object.keys(localStorage).filter(key => key.startsWith(`${OLD_PREFIX}_`));
  } catch {
    return [];
  }
}

/**
 * Lista todas as chaves do localStorage com prefixo novo
 * (útil para diagnóstico)
 * @returns {string[]}
 */
export function listNewPrefixKeys() {
  try {
    return Object.keys(localStorage).filter(key => key.startsWith(`${NEW_PREFIX}_`));
  } catch {
    return [];
  }
}

export default {
  migrateLocalStorage,
  isMigrationComplete,
  resetMigrationFlag,
  listOldPrefixKeys,
  listNewPrefixKeys,
};
