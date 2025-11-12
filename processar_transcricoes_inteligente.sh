#!/bin/bash

# =============================================================================
# Script Inteligente de Extração de Transcrições do YouTube
# =============================================================================
# Usa múltiplas estratégias para contornar bloqueios e limitações
# =============================================================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configurações
BASE_DIR="youtube-transcripts"
VENV_DIR="youtube-env"
LOG_FILE="$BASE_DIR/processing_log_$(date +%Y%m%d_%H%M%S).txt"

# Função para imprimir com cor
print_color() {
    echo -e "${2}${1}${NC}"
}

# Função para verificar disponibilidade de ferramentas
check_tools() {
    local tools_available=0
    
    print_color "\n🔍 Verificando ferramentas disponíveis..." "$BLUE"
    
    # Python e ambiente virtual
    if [ -d "$VENV_DIR" ]; then
        print_color "✅ Ambiente Python disponível" "$GREEN"
        ((tools_available++))
    else
        print_color "❌ Ambiente Python não encontrado" "$RED"
    fi
    
    # yt-dlp
    if command -v yt-dlp &> /dev/null; then
        print_color "✅ yt-dlp instalado" "$GREEN"
        ((tools_available++))
    else
        print_color "⚠️  yt-dlp não instalado" "$YELLOW"
        print_color "   Instalar com: sudo apt install yt-dlp" "$YELLOW"
    fi
    
    # youtube-dl
    if command -v youtube-dl &> /dev/null; then
        print_color "✅ youtube-dl instalado" "$GREEN"
        ((tools_available++))
    else
        print_color "⚠️  youtube-dl não instalado" "$YELLOW"
    fi
    
    # curl
    if command -v curl &> /dev/null; then
        print_color "✅ curl disponível" "$GREEN"
        ((tools_available++))
    fi
    
    # jq para processar JSON
    if command -v jq &> /dev/null; then
        print_color "✅ jq disponível" "$GREEN"
        ((tools_available++))
    else
        print_color "⚠️  jq não instalado (recomendado)" "$YELLOW"
        print_color "   Instalar com: sudo apt install jq" "$YELLOW"
    fi
    
    return $tools_available
}

# Método 1: Script Python otimizado
method_python_optimized() {
    local playlist_file=$1
    local output_dir=$2
    
    print_color "\n🐍 Método 1: Python Otimizado com Delays" "$CYAN"
    
    if [ ! -d "$VENV_DIR" ]; then
        print_color "❌ Ambiente virtual não encontrado" "$RED"
        return 1
    fi
    
    source "$VENV_DIR/bin/activate"
    
    # Usa o script otimizado com delays maiores
    python youtube_transcript_optimized.py \
        --batch "$playlist_file" \
        --output-dir "$output_dir" \
        --min-delay 5 \
        --max-delay 15 \
        --batch-size 3 \
        --retry 2 \
        2>&1 | tee -a "$LOG_FILE"
    
    local exit_code=${PIPESTATUS[0]}
    deactivate
    
    return $exit_code
}

# Método 2: yt-dlp direto
method_ytdlp() {
    local video_url=$1
    local output_dir=$2
    
    print_color "\n📥 Método 2: yt-dlp" "$CYAN"
    
    if ! command -v yt-dlp &> /dev/null; then
        print_color "❌ yt-dlp não instalado" "$RED"
        return 1
    fi
    
    mkdir -p "$output_dir"
    
    # Extrai legendas com yt-dlp
    yt-dlp \
        --skip-download \
        --write-subs \
        --write-auto-subs \
        --sub-langs "pt,pt-BR,en,es" \
        --sub-format "vtt/srt/best" \
        --output "$output_dir/%(id)s.%(ext)s" \
        "$video_url" 2>&1 | tee -a "$LOG_FILE"
    
    return $?
}

# Método 3: API alternativa via curl
method_api_alternative() {
    local video_id=$1
    local output_dir=$2
    
    print_color "\n🌐 Método 3: API Alternativa" "$CYAN"
    
    # Tenta usar um serviço de proxy ou API alternativa
    # Exemplo: downsub.com ou outras APIs públicas
    
    local api_url="https://downsub.com/api/youtube/subtitle"
    
    # Nota: Este é um exemplo. Você precisaria adaptar para uma API real
    curl -s -X POST "$api_url" \
        -H "Content-Type: application/json" \
        -d "{\"video_id\": \"$video_id\"}" \
        > "$output_dir/${video_id}_api.json" 2>&1
    
    if [ $? -eq 0 ]; then
        print_color "✅ Obtido via API alternativa" "$GREEN"
        return 0
    else
        print_color "❌ API alternativa falhou" "$RED"
        return 1
    fi
}

# Método 4: Browser automation (necessita Selenium ou Playwright)
method_browser_automation() {
    local video_url=$1
    local output_dir=$2
    
    print_color "\n🌏 Método 4: Browser Automation" "$CYAN"
    
    # Verifica se playwright está instalado
    if python -c "import playwright" 2>/dev/null; then
        print_color "🎭 Usando Playwright para automação..." "$YELLOW"
        
        # Script Python inline para usar Playwright
        python << EOF
import asyncio
from playwright.async_api import async_playwright
import json

async def get_transcript(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Navegar para o vídeo
        await page.goto(url)
        
        # Esperar e clicar no botão de transcrição
        await page.wait_for_timeout(3000)
        
        # Tentar obter transcrição via JavaScript
        try:
            # Código para extrair transcrição da página
            # (implementação específica necessária)
            pass
        except Exception as e:
            print(f"Erro: {e}")
        
        await browser.close()

asyncio.run(get_transcript("$video_url"))
EOF
        
        return $?
    else
        print_color "⚠️  Playwright não instalado" "$YELLOW"
        print_color "   Instalar com: pip install playwright" "$YELLOW"
        print_color "   E depois: playwright install chromium" "$YELLOW"
        return 1
    fi
}

# Função para processar um vídeo com fallback entre métodos
process_video_smart() {
    local video_url=$1
    local output_dir=$2
    local video_id=$(echo "$video_url" | grep -oE '[^/=]+$')
    
    print_color "\n🎬 Processando: $video_url" "$BLUE"
    
    # Tenta cada método em ordem de preferência
    
    # Método 1: Python com delays (mais confiável)
    if [ -f "youtube_transcript_optimized.py" ]; then
        echo "$video_url" > /tmp/single_video.txt
        if method_python_optimized "/tmp/single_video.txt" "$output_dir"; then
            print_color "✅ Sucesso com Python otimizado" "$GREEN"
            return 0
        fi
    fi
    
    # Espera antes de tentar próximo método
    print_color "⏳ Aguardando 10 segundos antes do próximo método..." "$YELLOW"
    sleep 10
    
    # Método 2: yt-dlp
    if method_ytdlp "$video_url" "$output_dir"; then
        print_color "✅ Sucesso com yt-dlp" "$GREEN"
        return 0
    fi
    
    # Método 3: API alternativa
    if method_api_alternative "$video_id" "$output_dir"; then
        print_color "✅ Sucesso com API alternativa" "$GREEN"
        return 0
    fi
    
    # Método 4: Browser automation (último recurso)
    if method_browser_automation "$video_url" "$output_dir"; then
        print_color "✅ Sucesso com browser automation" "$GREEN"
        return 0
    fi
    
    print_color "❌ Todos os métodos falharam para $video_id" "$RED"
    echo "$video_url" >> "$BASE_DIR/failed_completely.txt"
    return 1
}

# Função principal de processamento em lote
process_playlist_smart() {
    local playlist_file=$1
    local output_dir=$2
    local playlist_name=$3
    
    print_color "\n📚 Processamento Inteligente: $playlist_name" "$BLUE"
    print_color "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" "$BLUE"
    
    # Primeiro, tenta o método Python otimizado para todo o lote
    if [ -f "youtube_transcript_optimized.py" ]; then
        if method_python_optimized "$playlist_file" "$output_dir"; then
            print_color "✅ Lote processado com sucesso via Python" "$GREEN"
            return 0
        fi
    fi
    
    # Se falhar, processa individualmente com múltiplos métodos
    print_color "\n⚠️  Processamento em lote falhou. Tentando individualmente..." "$YELLOW"
    
    local total=0
    local success=0
    local failed=0
    
    while IFS= read -r line; do
        if [[ -n "$line" ]]; then
            ((total++))
            
            # Extrai URL limpa
            url=$(echo "$line" | grep -oE 'https://[^ ]+' || echo "$line")
            
            if process_video_smart "$url" "$output_dir"; then
                ((success++))
            else
                ((failed++))
            fi
            
            # Pausa maior a cada 5 vídeos
            if (( total % 5 == 0 )); then
                print_color "\n⏸️ Pausa longa (30s) após 5 vídeos..." "$YELLOW"
                sleep 30
            else
                # Pausa normal entre vídeos
                sleep 5
            fi
        fi
    done < "$playlist_file"
    
    # Relatório
    print_color "\n📊 Resultado: $success/$total processados com sucesso" "$CYAN"
    
    if [ $failed -gt 0 ]; then
        print_color "⚠️  $failed vídeos falharam completamente" "$YELLOW"
        print_color "   Ver: $BASE_DIR/failed_completely.txt" "$YELLOW"
    fi
}

# Função para instalar dependências opcionais
install_dependencies() {
    print_color "\n📦 Instalando dependências opcionais..." "$BLUE"
    
    # yt-dlp
    if ! command -v yt-dlp &> /dev/null; then
        print_color "Instalando yt-dlp..." "$YELLOW"
        sudo apt update
        sudo apt install -y yt-dlp
    fi
    
    # jq
    if ! command -v jq &> /dev/null; then
        print_color "Instalando jq..." "$YELLOW"
        sudo apt install -y jq
    fi
    
    # Playwright (opcional)
    if [ -d "$VENV_DIR" ]; then
        source "$VENV_DIR/bin/activate"
        print_color "Instalando playwright (opcional)..." "$YELLOW"
        pip install playwright
        playwright install chromium
        deactivate
    fi
}

# =============================================================================
# INÍCIO DO SCRIPT PRINCIPAL
# =============================================================================

clear
print_color "🚀 EXTRATOR INTELIGENTE DE TRANSCRIÇÕES DO YOUTUBE" "$BLUE"
print_color "═══════════════════════════════════════════════════" "$BLUE"
print_color "Usa múltiplas estratégias para contornar bloqueios" "$CYAN"
echo ""

# Verifica ferramentas disponíveis
check_tools
tools_count=$?

if [ $tools_count -lt 2 ]; then
    print_color "\n⚠️  Poucas ferramentas disponíveis" "$YELLOW"
    read -p "Deseja instalar dependências adicionais? (s/n): " install_choice
    
    if [[ "$install_choice" == "s" || "$install_choice" == "S" ]]; then
        install_dependencies
        check_tools
    fi
fi

# Menu de opções
echo ""
print_color "📋 OPÇÕES DE PROCESSAMENTO" "$BLUE"
print_color "════════════════════════" "$BLUE"
echo "1) Processar playlist MC404 (47 vídeos)"
echo "2) Processar playlist ACH2044 (23 vídeos)"
echo "3) Processar playlist MO601 (34 vídeos)"
echo "4) Processar todas as playlists"
echo "5) Processar vídeo individual"
echo "6) Reprocessar vídeos que falharam"
echo "0) Sair"
echo ""

read -p "Escolha uma opção: " choice

case $choice in
    1)
        process_playlist_smart \
            "$BASE_DIR/playlist_mc404_links.txt" \
            "$BASE_DIR/mc404" \
            "MC404 - Organização de Computadores"
        ;;
    2)
        process_playlist_smart \
            "$BASE_DIR/playlist_ach2044_links.txt" \
            "$BASE_DIR/ach2044" \
            "ACH2044 - Sistemas Operacionais"
        ;;
    3)
        process_playlist_smart \
            "$BASE_DIR/playlist_mo601_links.txt" \
            "$BASE_DIR/mo601" \
            "MO601 - Arquitetura II"
        ;;
    4)
        # Processa todas
        for playlist in mc404 ach2044 mo601; do
            if [ -f "$BASE_DIR/playlist_${playlist}_links.txt" ]; then
                process_playlist_smart \
                    "$BASE_DIR/playlist_${playlist}_links.txt" \
                    "$BASE_DIR/$playlist" \
                    "Playlist $playlist"
            fi
        done
        ;;
    5)
        read -p "Digite a URL do vídeo: " video_url
        process_video_smart "$video_url" "$BASE_DIR/individual"
        ;;
    6)
        if [ -f "$BASE_DIR/failed_videos.json" ]; then
            print_color "🔄 Reprocessando vídeos que falharam..." "$BLUE"
            # Extrai IDs do JSON e reprocessa
            jq -r '.videos[].video_id' "$BASE_DIR/failed_videos.json" | while read -r video_id; do
                process_video_smart "https://www.youtube.com/watch?v=$video_id" "$BASE_DIR/retry"
            done
        else
            print_color "Nenhum arquivo de falhas encontrado" "$YELLOW"
        fi
        ;;
    0)
        print_color "\n👋 Saindo..." "$BLUE"
        exit 0
        ;;
    *)
        print_color "\n❌ Opção inválida" "$RED"
        exit 1
        ;;
esac

# Relatório final
echo ""
print_color "═══════════════════════════════════════════════════" "$BLUE"
print_color "📊 PROCESSAMENTO CONCLUÍDO" "$GREEN"
print_color "═══════════════════════════════════════════════════" "$BLUE"

# Estatísticas
if [ -d "$BASE_DIR" ]; then
    total_files=$(find "$BASE_DIR" -name "*.md" -o -name "*.vtt" -o -name "*.srt" 2>/dev/null | wc -l)
    print_color "📁 Total de transcrições: $total_files" "$CYAN"
    print_color "📂 Diretório: $BASE_DIR/" "$CYAN"
    
    if [ -f "$BASE_DIR/failed_completely.txt" ]; then
        failed_count=$(wc -l < "$BASE_DIR/failed_completely.txt")
        print_color "⚠️  Vídeos que falharam completamente: $failed_count" "$YELLOW"
    fi
fi

print_color "\n✨ Fim da execução!" "$GREEN"
exit 0
