# Comando para Extração de Links de Playlist do YouTube

## Comando Final Utilizado

```bash
curl -s "https://www.youtube.com/playlist?list=PLEUHFTHcrJmswfeq7QEHskgkT6HER3gK6" | \
  grep -oE '"videoId":"[^"]+' | \
  sed 's/"videoId":"//' | \
  sed 's/"$//' | \
  sort -u | \
  nl -w2 -s'. ' | \
  sed 's/^//' | \
  awk '{print $1 " https://www.youtube.com/watch?v=" $2}'
```

## Explicação Detalhada de Cada Elemento

### 1. `curl -s "URL_DA_PLAYLIST"`
- **Função**: Faz o download do HTML da página da playlist
- **Parâmetros**:
  - `-s`: Modo silencioso (silent), não mostra progresso ou erros
- **Saída**: HTML completo da página da playlist

### 2. `grep -oE '"videoId":"[^"]+' `
- **Função**: Extrai todos os IDs de vídeos do HTML
- **Parâmetros**:
  - `-o`: Mostra apenas a parte que corresponde ao padrão
  - `-E`: Usa expressões regulares estendidas
- **Padrão**: `"videoId":"[^"]+`
  - Busca por `"videoId":"` seguido de qualquer caractere exceto aspas
  - Captura o ID do vídeo que está entre aspas
- **Saída**: Lista de strings como `"videoId":"ELbnZzxeec4"`

### 3. `sed 's/"videoId":"//'`
- **Função**: Remove o prefixo `"videoId":"` de cada linha
- **Comando sed**: Substitui (s) o padrão por nada (vazio)
- **Saída**: Apenas os IDs dos vídeos com uma aspa no final

### 4. `sed 's/"$//'`
- **Função**: Remove a aspa final de cada ID
- **Padrão**: `"$` significa aspa no final da linha
- **Saída**: IDs limpos dos vídeos

### 5. `sort -u`
- **Função**: Ordena e remove duplicatas
- **Parâmetros**:
  - `-u`: Unique - mantém apenas valores únicos
- **Saída**: Lista de IDs únicos ordenados alfabeticamente

### 6. `nl -w2 -s'. '`
- **Função**: Adiciona numeração às linhas
- **Parâmetros**:
  - `-w2`: Largura do número = 2 caracteres
  - `-s'. '`: Separador após o número = ". " (ponto e espaço)
- **Saída**: Linhas numeradas como "1. ID_DO_VIDEO"

### 7. `sed 's/^//'`
- **Função**: Remove espaços iniciais (se houver)
- **Nota**: Este comando pode ser omitido neste contexto

### 8. `awk '{print $1 " https://www.youtube.com/watch?v=" $2}'`
- **Função**: Formata a saída final com URLs completas
- **Lógica**:
  - `$1`: Primeiro campo (número com ponto)
  - `$2`: Segundo campo (ID do vídeo)
  - Concatena com a URL base do YouTube
- **Saída**: Lista numerada com URLs completas

## Instruções de Uso

### Uso Básico
```bash
# Para qualquer playlist do YouTube, substitua o ID da playlist:
curl -s "https://www.youtube.com/playlist?list=ID_DA_PLAYLIST" | \
  grep -oE '"videoId":"[^"]+' | \
  sed 's/"videoId":"//' | \
  sed 's/"$//' | \
  sort -u | \
  nl -w2 -s'. ' | \
  awk '{print $1 " https://www.youtube.com/watch?v=" $2}'
```

### Salvar em Arquivo
```bash
# Redirecionar saída para arquivo
curl -s "URL_DA_PLAYLIST" | ... > links_playlist.txt
```

### Apenas IDs dos Vídeos
```bash
# Sem numeração e sem URLs completas
curl -s "URL_DA_PLAYLIST" | \
  grep -oE '"videoId":"[^"]+' | \
  sed 's/"videoId":"//' | \
  sed 's/"$//' | \
  sort -u
```

### Formato CSV
```bash
# Gerar CSV com número e link
curl -s "URL_DA_PLAYLIST" | \
  grep -oE '"videoId":"[^"]+' | \
  sed 's/"videoId":"//' | \
  sed 's/"$//' | \
  sort -u | \
  nl -w2 -s',' | \
  awk -F',' '{print $1 ",https://www.youtube.com/watch?v=" $2}'
```

## Limitações e Considerações

### Limitações
1. **Dependência do HTML**: Se o YouTube mudar a estrutura do HTML, o comando pode parar de funcionar
2. **Playlists grandes**: Para playlists com muitos vídeos, pode não capturar todos se houver paginação
3. **Vídeos privados**: Pode incluir IDs de vídeos privados ou removidos

### Alternativas Recomendadas
1. **yt-dlp**: Ferramenta especializada mais robusta
   ```bash
   yt-dlp --flat-playlist --print "%(title)s - %(webpage_url)s" "URL_DA_PLAYLIST"
   ```

2. **youtube-dl**: Versão anterior, ainda funcional
   ```bash
   youtube-dl --flat-playlist --get-id "URL_DA_PLAYLIST" | \
     sed 's/^/https:\/\/www.youtube.com\/watch?v=/'
   ```

### Instalação de Ferramentas Alternativas
```bash
# Instalar yt-dlp (recomendado)
sudo apt update
sudo apt install python3-pip
pip3 install yt-dlp

# Ou baixar binário diretamente
wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
chmod +x yt-dlp
sudo mv yt-dlp /usr/local/bin/
```

## Casos de Uso Práticos

### 1. Criar Lista de Reprodução Local
```bash
# Gerar arquivo .m3u com os links
curl -s "URL_DA_PLAYLIST" | \
  grep -oE '"videoId":"[^"]+' | \
  sed 's/"videoId":"//' | \
  sed 's/"$//' | \
  sort -u | \
  sed 's/^/https:\/\/www.youtube.com\/watch?v=/' > playlist.m3u
```

### 2. Download de Transcrições
```bash
# Após obter os IDs, usar com ferramentas de transcrição
for video_id in $(curl -s "URL" | grep -oE '"videoId":"[^"]+' | sed 's/"videoId":"//' | sed 's/"$//' | sort -u); do
    echo "Processando vídeo: $video_id"
    # Adicionar comando de transcrição aqui
done
```

### 3. Verificar Disponibilidade dos Vídeos
```bash
# Script para verificar se vídeos ainda estão disponíveis
while read -r line; do
    url=$(echo "$line" | grep -oE 'https://[^ ]+')
    if curl -s -I "$url" | grep -q "200 OK"; then
        echo "✓ $line"
    else
        echo "✗ $line (indisponível)"
    fi
done < playlist_mc404_links.txt
```

## Troubleshooting

### Problema: Comando retorna vazio
**Soluções**:
1. Verificar se a URL da playlist está correta
2. Testar se o curl está funcionando: `curl -I https://www.youtube.com`
3. Verificar se a playlist é pública

### Problema: IDs duplicados
**Solução**: O `sort -u` deve remover duplicatas. Se persistir, adicionar:
```bash
| awk '!seen[$0]++'
```

### Problema: Caracteres especiais na saída
**Solução**: Adicionar decodificação UTF-8:
```bash
| iconv -f UTF-8 -t UTF-8//IGNORE
```

---

**Autor**: Sistema de extração de links de playlist
**Data**: 2025
**Versão**: 1.0
**Licença**: Uso livre para fins educacionais
