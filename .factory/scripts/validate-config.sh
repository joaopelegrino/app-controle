#!/bin/bash
# .factory/scripts/validate-config.sh
# Validates .factory/ configuration consistency

echo "🔍 Validando Configuração .factory/"
echo ""

ERRORS=0
WARNINGS=0

# 1. Check settings.json
echo "📋 Verificando settings.json..."
if grep -q '"bun.lock"' .factory/settings.json 2>/dev/null; then
  echo "  ✗ ERRO: bun.lock está em fileIgnorePatterns"
  ERRORS=$((ERRORS + 1))
else
  echo "  ✓ OK: bun.lock não está ignorado"
fi

if grep -q '"mise"' .factory/settings.json 2>/dev/null; then
  echo "  ✓ OK: mise em allowedCommands"
else
  echo "  ⚠️  AVISO: mise não está em allowedCommands"
  WARNINGS=$((WARNINGS + 1))
fi

# 2. Check bun.lock versionado
echo ""
echo "📦 Verificando bun.lock..."
if git ls-files 2>/dev/null | grep -q "^bun.lock$"; then
  echo "  ✓ OK: bun.lock está versionado"
else
  echo "  ✗ ERRO: bun.lock não está no git"
  ERRORS=$((ERRORS + 1))
fi

# 3. Check droids count
echo ""
echo "🤖 Verificando droids..."
DROID_COUNT=$(ls -1 .factory/droids/*.md 2>/dev/null | wc -l)
echo "  Droids encontrados: $DROID_COUNT"
if [ "$DROID_COUNT" -eq 6 ]; then
  echo "  ✓ OK: 6 droids esperados"
else
  echo "  ⚠️  AVISO: Esperado 6 droids, encontrado $DROID_COUNT"
  WARNINGS=$((WARNINGS + 1))
fi

# 4. Check mise.toml
echo ""
echo "⚙️  Verificando mise..."
if [ -f ".mise.toml" ]; then
  echo "  ✓ mise configurado (.mise.toml existe)"
elif [ -f ".mise.toml.template" ]; then
  echo "  ⚠️  Template existe, mas .mise.toml não criado"
  WARNINGS=$((WARNINGS + 1))
else
  echo "  ℹ️  mise não configurado (opcional)"
fi

# 5. Check AGENTS.md mentions mise
echo ""
echo "📄 Verificando AGENTS.md..."
if grep -q "mise" .factory/AGENTS.md 2>/dev/null; then
  echo "  ✓ OK: AGENTS.md menciona mise"
else
  echo "  ⚠️  AVISO: AGENTS.md não menciona mise"
  WARNINGS=$((WARNINGS + 1))
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
  echo "✅ Validação completa! Nenhum problema encontrado."
  exit 0
elif [ "$ERRORS" -eq 0 ]; then
  echo "⚠️  Validação completa com avisos:"
  echo "   - Erros: $ERRORS"
  echo "   - Avisos: $WARNINGS"
  exit 0
else
  echo "❌ Validação falhou:"
  echo "   - Erros: $ERRORS"
  echo "   - Avisos: $WARNINGS"
  exit 1
fi
