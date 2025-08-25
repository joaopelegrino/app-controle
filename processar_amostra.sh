#!/bin/bash

# Script para processar uma amostra de vídeos de cada playlist
# com delays conservadores para evitar bloqueios

echo "🎯 Processamento Conservador - Amostra de Vídeos"
echo "================================================"
echo "📅 Iniciado em: $(date)"

# Ativar ambiente virtual
source youtube-env/bin/activate

# Função para extrair apenas alguns vídeos de um arquivo
extrair_amostra() {
    local arquivo=$1
    local quantidade=$2
    local output_file=$3
    
    echo "📄 Extraindo $quantidade URLs de $arquivo"
    
    # Extrair URLs e remover numeração (1. 2. etc.)
    grep "youtube.com/watch" "$arquivo" | sed 's/^[0-9]*\.\s*//' | head -$quantidade > "$output_file"
    
    local count=$(wc -l < "$output_file")
    echo "✅ Extraídas $count URLs para $output_file"
}

# Criar diretórios se não existirem
mkdir -p youtube-transcripts/ach2044/
mkdir -p youtube-transcripts/mc404/
mkdir -p youtube-transcripts/mo601/

echo ""
echo "🎬 Extraindo amostras das playlists..."

# Extrair 2 vídeos de cada playlist
extrair_amostra "youtube-transcripts/playlist_ach2044_links.txt" 2 "temp_ach2044_sample.txt"
extrair_amostra "youtube-transcripts/playlist_mc404_links.txt" 2 "temp_mc404_sample.txt"
extrair_amostra "youtube-transcripts/playlist_mo601_links.txt" 2 "temp_mo601_sample.txt"

echo ""
echo "🚀 Iniciando processamento com delays conservadores..."

# Função para processar com delays maiores
processar_com_delay() {
    local arquivo=$1
    local output_dir=$2
    local nome=$3
    
    echo ""
    echo "📚 Processando: $nome"
    echo "─────────────────────"
    
    local count=1
    while IFS= read -r url; do
        if [[ -n "$url" ]]; then
            echo "[$count] Processando: $url"
            
            python youtube_transcript.py "$url" --output-dir "$output_dir"
            
            if [ $? -eq 0 ]; then
                echo "✅ Sucesso!"
            else
                echo "❌ Falhou"
            fi
            
            # Delay de 45 segundos entre vídeos
            if [ $count -lt 2 ]; then
                echo "⏰ Aguardando 45 segundos..."
                sleep 45
            fi
            
            ((count++))
        fi
    done < "$arquivo"
}

# Processar ACH2044
processar_com_delay "temp_ach2044_sample.txt" "youtube-transcripts/ach2044/" "ACH2044 - Sistemas Operacionais"

# Delay de 2 minutos entre playlists
echo ""
echo "⏸️ Pausa entre playlists: 2 minutos..."
sleep 120

# Processar MC404
processar_com_delay "temp_mc404_sample.txt" "youtube-transcripts/mc404/" "MC404 - Organização de Computadores"

# Delay de 2 minutos entre playlists
echo ""
echo "⏸️ Pausa entre playlists: 2 minutos..."
sleep 120

# Processar MO601
processar_com_delay "temp_mo601_sample.txt" "youtube-transcripts/mo601/" "MO601 - Arquitetura de Computadores II"

# Limpeza
rm -f temp_*_sample.txt

echo ""
echo "🎉 Processamento da amostra concluído!"
echo "================================================"
echo "📊 Resultados:"
echo "  - ACH2044: $(ls -1 youtube-transcripts/ach2044/*.md 2>/dev/null | wc -l) transcrições"
echo "  - MC404: $(ls -1 youtube-transcripts/mc404/*.md 2>/dev/null | wc -l) transcrições"
echo "  - MO601: $(ls -1 youtube-transcripts/mo601/*.md 2>/dev/null | wc -l) transcrições"
echo "📅 Finalizado em: $(date)"