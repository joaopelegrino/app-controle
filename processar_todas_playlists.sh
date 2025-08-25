#!/bin/bash

# =============================================================================
# Script de Processamento de Transcrições de Playlists do YouTube
# =============================================================================
# Processa todas as playlists extraídas e gera transcrições organizadas
# Autor: Sistema Automatizado
# Data: 2025-08-15
# =============================================================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
BASE_DIR="youtube-transcripts"
PYTHON_SCRIPT="youtube_transcript.py"
VENV_DIR="youtube-env"
LOG_FILE="$BASE_DIR/processing_log_$(date +%Y%m%d_%H%M%S).txt"

# Função para imprimir com cor
print_color() {
    echo -e "${2}${1}${NC}"
}

# Função para processar uma playlist
process_playlist() {
    local playlist_file=$1
    local output_dir=$2
    local playlist_name=$3
    
    print_color "\n📚 Processando playlist: $playlist_name" "$BLUE"
    print_color "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" "$BLUE"
    
    # Extrai apenas os IDs dos vídeos do arquivo
    local temp_ids="/tmp/video_ids_$(date +%s).txt"
    grep -oE 'watch\?v=[^[:space:]]+' "$playlist_file" | sed 's/watch?v=//' > "$temp_ids"
    
    # Conta total de vídeos
    local total_videos=$(wc -l < "$temp_ids")
    print_color "📊 Total de vídeos: $total_videos" "$YELLOW"
    
    # Cria diretório de saída
    mkdir -p "$output_dir"
    
    # Processa com o script Python
    python "$PYTHON_SCRIPT" --batch "$temp_ids" \
        --output-dir "$output_dir" \
        --format markdown \
        --languages pt pt-BR en es 2>&1 | tee -a "$LOG_FILE"
    
    local exit_code=${PIPESTATUS[0]}
    
    # Limpa arquivo temporário
    rm -f "$temp_ids"
    
    # Conta arquivos processados
    local processed=$(find "$output_dir" -name "*.md" -not -name "README.md" | wc -l)
    
    if [ $exit_code -eq 0 ]; then
        print_color "✅ Sucesso! $processed/$total_videos vídeos processados" "$GREEN"
    else
        print_color "⚠️  Processamento parcial: $processed/$total_videos vídeos" "$YELLOW"
    fi
    
    return $exit_code
}

# Função para gerar relatório
generate_report() {
    local report_file="$BASE_DIR/RELATORIO_PROCESSAMENTO_$(date +%Y%m%d_%H%M%S).md"
    
    print_color "\n📝 Gerando relatório..." "$BLUE"
    
    cat > "$report_file" << EOF
# Relatório de Processamento de Transcrições

**Data:** $(date '+%Y-%m-%d %H:%M:%S')
**Diretório Base:** $BASE_DIR

## Playlists Processadas

### MC404 - Organização Básica de Computadores
- **Arquivos processados:** $(find "$BASE_DIR/mc404" -name "*.md" 2>/dev/null | wc -l)
- **Diretório:** $BASE_DIR/mc404/

### ACH2044 - Sistemas Operacionais
- **Arquivos processados:** $(find "$BASE_DIR/ach2044" -name "*.md" 2>/dev/null | wc -l)
- **Diretório:** $BASE_DIR/ach2044/

### MO601 - Arquitetura de Computadores II
- **Arquivos processados:** $(find "$BASE_DIR/mo601" -name "*.md" 2>/dev/null | wc -l)
- **Diretório:** $BASE_DIR/mo601/

## Estatísticas Gerais

- **Total de transcrições:** $(find "$BASE_DIR" -name "*.md" -not -name "README*.md" -not -name "RELATORIO*.md" 2>/dev/null | wc -l)
- **Tamanho total:** $(du -sh "$BASE_DIR" 2>/dev/null | cut -f1)
- **Log de processamento:** $LOG_FILE

## Próximos Passos

1. Revisar transcrições em cada subdiretório
2. Identificar vídeos sem transcrição disponível
3. Processar manualmente vídeos problemáticos
4. Criar índice temático das aulas

---
*Relatório gerado automaticamente*
EOF

    print_color "✅ Relatório salvo em: $report_file" "$GREEN"
}

# =============================================================================
# INÍCIO DO SCRIPT PRINCIPAL
# =============================================================================

clear
print_color "🎬 PROCESSADOR DE TRANSCRIÇÕES DE PLAYLISTS DO YOUTUBE" "$BLUE"
print_color "═══════════════════════════════════════════════════════" "$BLUE"
echo ""

# Verifica pré-requisitos
print_color "🔍 Verificando pré-requisitos..." "$YELLOW"

# Verifica se o diretório base existe
if [ ! -d "$BASE_DIR" ]; then
    print_color "❌ Diretório $BASE_DIR não encontrado!" "$RED"
    exit 1
fi

# Verifica se o script Python existe
if [ ! -f "$PYTHON_SCRIPT" ]; then
    print_color "❌ Script $PYTHON_SCRIPT não encontrado!" "$RED"
    exit 1
fi

# Verifica se o ambiente virtual existe
if [ ! -d "$VENV_DIR" ]; then
    print_color "❌ Ambiente virtual $VENV_DIR não encontrado!" "$RED"
    print_color "   Execute: python3 -m venv $VENV_DIR" "$YELLOW"
    exit 1
fi

# Ativa ambiente virtual
print_color "🐍 Ativando ambiente virtual..." "$YELLOW"
source "$VENV_DIR/bin/activate"

# Verifica se youtube-transcript-api está instalado
if ! pip show youtube-transcript-api &> /dev/null; then
    print_color "📦 Instalando youtube-transcript-api..." "$YELLOW"
    pip install youtube-transcript-api
fi

# Cria log
mkdir -p "$BASE_DIR"
echo "=== Log de Processamento - $(date) ===" > "$LOG_FILE"

# Processa cada playlist
SUCCESS_COUNT=0
TOTAL_COUNT=0

# MC404
if [ -f "$BASE_DIR/playlist_mc404_links.txt" ]; then
    ((TOTAL_COUNT++))
    if process_playlist "$BASE_DIR/playlist_mc404_links.txt" \
                        "$BASE_DIR/mc404" \
                        "MC404 - Organização de Computadores"; then
        ((SUCCESS_COUNT++))
    fi
else
    print_color "⚠️  Arquivo playlist_mc404_links.txt não encontrado" "$YELLOW"
fi

# ACH2044
if [ -f "$BASE_DIR/playlist_ach2044_links.txt" ]; then
    ((TOTAL_COUNT++))
    if process_playlist "$BASE_DIR/playlist_ach2044_links.txt" \
                        "$BASE_DIR/ach2044" \
                        "ACH2044 - Sistemas Operacionais"; then
        ((SUCCESS_COUNT++))
    fi
else
    print_color "⚠️  Arquivo playlist_ach2044_links.txt não encontrado" "$YELLOW"
fi

# MO601
if [ -f "$BASE_DIR/playlist_mo601_links.txt" ]; then
    ((TOTAL_COUNT++))
    if process_playlist "$BASE_DIR/playlist_mo601_links.txt" \
                        "$BASE_DIR/mo601" \
                        "MO601 - Arquitetura de Computadores II"; then
        ((SUCCESS_COUNT++))
    fi
else
    print_color "⚠️  Arquivo playlist_mo601_links.txt não encontrado" "$YELLOW"
fi

# Gera relatório final
generate_report

# Desativa ambiente virtual
deactivate

# Resumo final
echo ""
print_color "═══════════════════════════════════════════════════════" "$BLUE"
print_color "📊 RESUMO DO PROCESSAMENTO" "$BLUE"
print_color "═══════════════════════════════════════════════════════" "$BLUE"
print_color "✅ Playlists processadas: $SUCCESS_COUNT/$TOTAL_COUNT" "$GREEN"
print_color "📁 Transcrições salvas em: $BASE_DIR/" "$YELLOW"
print_color "📄 Log completo em: $LOG_FILE" "$YELLOW"
echo ""
print_color "🎉 Processamento concluído!" "$GREEN"
echo ""

# Sugestões finais
print_color "💡 Próximas ações sugeridas:" "$BLUE"
echo "   1. Revisar o relatório de processamento"
echo "   2. Verificar vídeos sem transcrição no log"
echo "   3. Criar índice temático das aulas"
echo "   4. Processar vídeos específicos manualmente se necessário"
echo ""

exit 0
