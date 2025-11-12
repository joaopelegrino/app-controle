# Resumo das Playlists Extraídas

## Playlists Processadas

### 1. MC404 - Organização Básica de Computadores e Linguagem de Montagem (2021s1)
- **Arquivo**: `playlist_mc404_links.txt`
- **Total de vídeos**: 47
- **URL**: https://www.youtube.com/playlist?list=PLEUHFTHcrJmswfeq7QEHskgkT6HER3gK6
- **Tema**: Organização de computadores, linguagem assembly, arquitetura básica

### 2. ACH2044 - Sistemas Operacionais (2021)
- **Arquivo**: `playlist_ach2044_links.txt`
- **Total de vídeos**: 23
- **URL**: https://www.youtube.com/playlist?list=PLSmh8AKk_aUn9HxFs5FnjQupdQnV56MXV
- **Tema**: Sistemas operacionais, processos, memória, I/O

### 3. MO601 - Arquitetura de Computadores II (2020s2)
- **Arquivo**: `playlist_mo601_links.txt`
- **Total de vídeos**: 34
- **URL**: https://www.youtube.com/playlist?list=PLEUHFTHcrJmsqKX-GDD-hBvkF8h2_BfKJ
- **Tema**: Arquitetura avançada de computadores, pipeline, cache, paralelismo

## Estatísticas Gerais
- **Total de playlists**: 3
- **Total de vídeos**: 104 vídeos
- **Disciplinas cobertas**: 
  - Arquitetura de Computadores (básica e avançada)
  - Sistemas Operacionais
  - Linguagem de Montagem

## Comandos Utilizados

### Comando Genérico para Extração
```bash
curl -s "URL_DA_PLAYLIST" | \
  grep -oE '"videoId":"[^"]+' | \
  sed 's/"videoId":"//' | \
  sed 's/"$//' | \
  sort -u | \
  nl -w2 -s'. ' | \
  awk '{print $1 " https://www.youtube.com/watch?v=" $2}'
```

### Exemplo de Uso para Nova Playlist
```bash
# Substitua URL_DA_PLAYLIST pela URL completa
curl -s "https://www.youtube.com/playlist?list=PLAYLIST_ID" | \
  grep -oE '"videoId":"[^"]+' | \
  sed 's/"videoId":"//' | \
  sed 's/"$//' | \
  sort -u | \
  nl -w2 -s'. ' | \
  awk '{print $1 " https://www.youtube.com/watch?v=" $2}' > playlist_nome_links.txt
```

## Estrutura dos Arquivos

Cada arquivo de playlist contém:
1. Cabeçalho com informações da playlist
2. URL original da playlist
3. Contagem total de vídeos
4. Lista numerada com links diretos para cada vídeo

## Próximos Passos Sugeridos

1. **Download de Transcrições**: Usar os links para baixar transcrições automáticas
2. **Download de Vídeos**: Usar yt-dlp para baixar os vídeos se necessário
3. **Organização**: Criar subpastas por disciplina para melhor organização
4. **Backup**: Fazer backup dos links em caso de vídeos serem removidos

## Observações

- Os links são diretos e funcionam independentemente da playlist
- Alguns vídeos podem estar privados ou removidos
- Recomenda-se verificar periodicamente a disponibilidade dos vídeos

---

**Data de Extração**: 15 de Agosto de 2025
**Total de Arquivos Gerados**: 5 arquivos
**Localização**: `/home/joao/workspace/learning/app-controle/youtube-transcripts/`
