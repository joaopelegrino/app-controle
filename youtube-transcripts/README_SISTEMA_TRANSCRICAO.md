# Sistema de Extração de Transcrições do YouTube

## 📋 Visão Geral

Este sistema permite extrair automaticamente transcrições de vídeos do YouTube, salvando-as em formato estruturado para análise e estudo.

## 🔧 Estrutura do Sistema

### Arquivos Principais

1. **`youtube_transcript.py`** - Script Python principal
   - Extrai transcrições usando a API `youtube-transcript-api`
   - Suporta múltiplos formatos de saída (Markdown, JSON, VTT, Text)
   - Processa vídeos individuais ou em lote
   - Mantém metadados dos vídeos processados

2. **`processar_playlist_completa.sh`** - Script Bash de automação
   - Ativa ambiente virtual Python
   - Processa lista de vídeos em lote
   - Gera relatórios de conclusão

### Ambiente Virtual

- **Local**: `youtube-env/`
- **Pacote principal**: `youtube-transcript-api==1.2.2`

## 🚀 Como Usar

### 1. Preparação do Ambiente

```bash
# Ativar ambiente virtual
source youtube-env/bin/activate

# Verificar instalação
pip list | grep youtube-transcript-api
```

### 2. Processar Vídeo Individual

```bash
# Por URL completa
python youtube_transcript.py "https://www.youtube.com/watch?v=VIDEO_ID"

# Por ID do vídeo
python youtube_transcript.py VIDEO_ID

# Com opções específicas
python youtube_transcript.py VIDEO_ID --format markdown --languages pt en
```

### 3. Processar Playlist Completa

```bash
# Método 1: Usar arquivo de links existente
python youtube_transcript.py --batch youtube-transcripts/playlist_mc404_links.txt \
  --output-dir youtube-transcripts/mc404

# Método 2: Processar apenas IDs
# Primeiro, extrair apenas IDs dos links
grep -oE 'watch\?v=[^"]+' playlist_mc404_links.txt | sed 's/watch?v=//' > video_ids.txt

# Depois processar
python youtube_transcript.py --batch video_ids.txt \
  --output-dir youtube-transcripts/mc404
```

## 📁 Estrutura de Saída

```
youtube-transcripts/
├── mc404/                    # Transcrições MC404
│   ├── metadata.json         # Metadados dos vídeos
│   └── YYYYMMDD_HHMMSS_VIDEO_ID.md  # Transcrições
├── ach2044/                  # Transcrições ACH2044
├── mo601/                    # Transcrições MO601
└── README_SISTEMA_TRANSCRICAO.md
```

## ⚙️ Opções do Script

### Parâmetros Principais

- `video`: URL ou ID do vídeo (obrigatório se não usar --batch)
- `--batch FILE`: Arquivo com lista de URLs/IDs (uma por linha)
- `--format {markdown,text,json,vtt}`: Formato de saída (padrão: markdown)
- `--no-timestamps`: Remove timestamps da transcrição
- `--languages L1 L2...`: Idiomas em ordem de prioridade (padrão: pt pt-BR en es)
- `--output-dir DIR`: Diretório de saída

### Exemplos de Uso

```bash
# Transcrição simples em português
python youtube_transcript.py VIDEO_ID

# JSON sem timestamps
python youtube_transcript.py VIDEO_ID --format json --no-timestamps

# Múltiplos idiomas com prioridade
python youtube_transcript.py VIDEO_ID --languages pt en es

# Batch com formato VTT
python youtube_transcript.py --batch urls.txt --format vtt
```

## 📊 Processamento das Playlists Disponíveis

### Playlists Prontas para Processamento

1. **MC404** - 47 vídeos
   - Arquivo: `playlist_mc404_links.txt`
   - Tema: Organização de Computadores

2. **ACH2044** - 23 vídeos
   - Arquivo: `playlist_ach2044_links.txt`
   - Tema: Sistemas Operacionais

3. **MO601** - 34 vídeos
   - Arquivo: `playlist_mo601_links.txt`
   - Tema: Arquitetura de Computadores II

### Script de Processamento Completo

```bash
#!/bin/bash
# processar_todas_playlists.sh

# Ativa ambiente
source youtube-env/bin/activate

# MC404
echo "Processando MC404..."
python youtube_transcript.py --batch youtube-transcripts/playlist_mc404_links.txt \
  --output-dir youtube-transcripts/mc404 \
  --format markdown

# ACH2044
echo "Processando ACH2044..."
python youtube_transcript.py --batch youtube-transcripts/playlist_ach2044_links.txt \
  --output-dir youtube-transcripts/ach2044 \
  --format markdown

# MO601
echo "Processando MO601..."
python youtube_transcript.py --batch youtube-transcripts/playlist_mo601_links.txt \
  --output-dir youtube-transcripts/mo601 \
  --format markdown

echo "✅ Processamento completo!"
```

## 🔍 Funcionalidades do Script Python

### Classe `YouTubeTranscriptExtractor`

**Métodos principais:**

1. **`extract_video_id(url_or_id)`**
   - Extrai ID de URLs do YouTube
   - Suporta youtube.com e youtu.be

2. **`get_transcript(video_id, languages)`**
   - Obtém transcrição via API
   - Tenta múltiplos idiomas em ordem

3. **`extract_and_save(url_or_id, format_type, ...)`**
   - Processo completo de extração
   - Salva arquivo formatado
   - Atualiza metadados

4. **`batch_extract(urls_file, **kwargs)`**
   - Processa múltiplos vídeos
   - Relatório de sucesso/erro

### Formatos de Saída

1. **Markdown** (`.md`)
   - Inclui cabeçalho com metadados
   - Timestamps opcionais [MM:SS]
   - Formatação legível

2. **JSON** (`.json`)
   - Estrutura completa com timestamps
   - Ideal para processamento posterior

3. **VTT** (`.vtt`)
   - Formato de legendas WebVTT
   - Compatível com players de vídeo

4. **Text** (`.txt`)
   - Texto puro sem formatação
   - Menor tamanho de arquivo

## 🐛 Troubleshooting

### Erro: "No transcript found"
- Vídeo pode não ter legendas disponíveis
- Tente outros idiomas com `--languages`

### Erro: "youtube-transcript-api not found"
```bash
# Reinstalar dependência
source youtube-env/bin/activate
pip install youtube-transcript-api
```

### URLs não reconhecidas
- Verifique formato da URL
- Use apenas o ID do vídeo como alternativa

### Ambiente virtual não funciona
```bash
# Recriar ambiente
python3 -m venv youtube-env
source youtube-env/bin/activate
pip install youtube-transcript-api
```

## 📈 Estatísticas de Uso

### Capacidades
- ✅ Processa vídeos individuais
- ✅ Processa playlists completas
- ✅ Múltiplos formatos de saída
- ✅ Suporte a múltiplos idiomas
- ✅ Detecção de legendas automáticas
- ✅ Sistema de metadados
- ✅ Verificação de duplicatas

### Limitações
- ⚠️ Depende de legendas existentes no YouTube
- ⚠️ Não baixa o vídeo em si
- ⚠️ Limite de taxa da API do YouTube

## 🔗 Links Úteis

- [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api)
- [Documentação da API](https://pypi.org/project/youtube-transcript-api/)
- [Formato WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)

---

**Última atualização**: 15 de Agosto de 2025
**Versão do sistema**: 1.0
**Mantido em**: `/home/joao/workspace/learning/app-controle/`
