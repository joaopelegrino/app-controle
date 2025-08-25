#!/bin/bash

# Script para processar todos os vídeos restantes da playlist MC404
# Uso: bash processar_playlist_completa.sh

echo "🎬 Processamento Completo da Playlist MC404"
echo "============================================"

# Ativa ambiente virtual
source youtube-env/bin/activate

# Processa todos os vídeos da playlist
echo "📥 Iniciando processamento de todos os 47 vídeos..."
python youtube_transcript.py --batch playlist_videos.txt --output-dir pastas-caminhos/youtube-transcripts

# Gera relatório de conclusão
echo ""
echo "📊 Gerando relatório de conclusão..."

# Conta arquivos processados
processed_count=$(find pastas-caminhos/youtube-transcripts/ -name "*.md" -not -name "README.md" | wc -l)
total_videos=47

echo "✅ Processamento Concluído!"
echo "📈 Total processado: $processed_count de $total_videos vídeos"
echo "📁 Arquivos salvos em: pastas-caminhos/youtube-transcripts/"
echo ""
echo "📚 Próximos passos:"
echo "1. Revisar transcrições em: pastas-caminhos/youtube-transcripts/"
echo "2. Atualizar caminho de aprendizado: pastas-caminhos/PLAYLIST_LEARNING_PATH.md"
echo "3. Expandir análise temática com novos conteúdos"
echo ""
echo "🔗 Links úteis:"
echo "- Caminho de Aprendizado: pastas-caminhos/PLAYLIST_LEARNING_PATH.md"
echo "- Índice de Transcrições: pastas-caminhos/youtube-transcripts/README.md"
echo "- Relatório Completo: pastas-caminhos/RELATORIO_PROCESSAMENTO_PLAYLIST.md"