#!/usr/bin/env python3
"""
YouTube Transcript Extractor
Extrai transcrições de vídeos do YouTube e salva em arquivos organizados
"""

import os
import re
import json
import argparse
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, List
from urllib.parse import urlparse, parse_qs

from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter, WebVTTFormatter


class YouTubeTranscriptExtractor:
    def __init__(self, output_dir: str = "pastas-caminhos/youtube-transcripts"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.metadata_file = self.output_dir / "metadata.json"
        self.load_metadata()
    
    def load_metadata(self):
        """Carrega metadados de vídeos já processados"""
        if self.metadata_file.exists():
            with open(self.metadata_file, 'r', encoding='utf-8') as f:
                self.metadata = json.load(f)
        else:
            self.metadata = {"videos": {}, "last_updated": None}
    
    def save_metadata(self):
        """Salva metadados atualizados"""
        self.metadata["last_updated"] = datetime.now().isoformat()
        with open(self.metadata_file, 'w', encoding='utf-8') as f:
            json.dump(self.metadata, f, indent=2, ensure_ascii=False)
    
    def extract_video_id(self, url_or_id: str) -> str:
        """Extrai ID do vídeo de uma URL ou retorna o ID diretamente"""
        # Se já for um ID (11 caracteres), retorna
        if len(url_or_id) == 11 and not url_or_id.startswith('http'):
            return url_or_id
        
        # Extrai ID da URL
        parsed = urlparse(url_or_id)
        
        # youtube.com/watch?v=VIDEO_ID
        if parsed.hostname in ['youtube.com', 'www.youtube.com']:
            query = parse_qs(parsed.query)
            if 'v' in query:
                return query['v'][0]
        
        # youtu.be/VIDEO_ID
        elif parsed.hostname == 'youtu.be':
            return parsed.path[1:]
        
        raise ValueError(f"Não foi possível extrair ID do vídeo de: {url_or_id}")
    
    def clean_filename(self, text: str, max_length: int = 50) -> str:
        """Limpa e trunca texto para usar como nome de arquivo"""
        # Remove caracteres especiais
        text = re.sub(r'[^\w\s-]', '', text)
        text = re.sub(r'[-\s]+', '-', text)
        
        # Trunca se necessário
        if len(text) > max_length:
            text = text[:max_length]
        
        return text.strip('-')
    
    def format_transcript_markdown(self, transcript: List[Dict], include_timestamps: bool = True) -> str:
        """Formata transcrição para Markdown"""
        lines = []
        
        for entry in transcript:
            if include_timestamps:
                # Converte segundos para formato MM:SS
                minutes = int(entry['start'] // 60)
                seconds = int(entry['start'] % 60)
                timestamp = f"[{minutes:02d}:{seconds:02d}]"
                lines.append(f"{timestamp} {entry['text']}")
            else:
                lines.append(entry['text'])
            
            # Adiciona quebra de linha extra entre parágrafos longos
            if len(entry['text']) > 100:
                lines.append("")
        
        return '\n'.join(lines)
    
    def get_transcript(self, video_id: str, languages: List[str] = None) -> tuple:
        """Obtém transcrição do vídeo"""
        if languages is None:
            languages = ['pt', 'pt-BR', 'en', 'es']
        
        try:
            # Cria instância da API
            api = YouTubeTranscriptApi()
            
            # Método simples primeiro - tenta obter transcrição diretamente
            for lang in languages:
                try:
                    fetched_transcript = api.fetch(video_id, languages=[lang])
                    # Converte snippets para formato compatível
                    transcript_data = []
                    for snippet in fetched_transcript:
                        transcript_data.append({
                            'text': snippet.text,
                            'start': snippet.start,
                            'duration': snippet.duration
                        })
                    return transcript_data, lang, fetched_transcript.is_generated
                except:
                    continue
            
            # Se idiomas específicos falharem, tenta qualquer idioma disponível
            try:
                transcript_list = api.list(video_id)
                # Pega a primeira transcrição disponível
                first_transcript = next(iter(transcript_list))
                fetched = first_transcript.fetch()
                # Converte snippets para formato compatível
                transcript_data = []
                for snippet in fetched:
                    transcript_data.append({
                        'text': snippet.text,
                        'start': snippet.start,
                        'duration': snippet.duration
                    })
                return transcript_data, first_transcript.language_code, first_transcript.is_generated
            except Exception as e:
                raise Exception(f"Erro ao obter transcrição: {str(e)}")
            
        except Exception as e:
            raise Exception(f"Erro ao obter transcrição: {str(e)}")
    
    def extract_and_save(self, url_or_id: str, format_type: str = 'markdown', 
                        include_timestamps: bool = True, languages: List[str] = None) -> Dict:
        """Extrai e salva transcrição do vídeo"""
        
        # Extrai ID do vídeo
        video_id = self.extract_video_id(url_or_id)
        print(f"📹 ID do vídeo: {video_id}")
        
        # Verifica se já foi processado
        if video_id in self.metadata.get("videos", {}):
            print(f"⚠️  Vídeo já processado anteriormente")
            return self.metadata["videos"][video_id]
        
        # Obtém transcrição
        print(f"📥 Baixando transcrição...")
        transcript, language, is_auto = self.get_transcript(video_id, languages)
        
        # Prepara informações do vídeo
        video_info = {
            "video_id": video_id,
            "url": f"https://www.youtube.com/watch?v={video_id}",
            "language": language,
            "auto_generated": is_auto,
            "extracted_at": datetime.now().isoformat(),
            "include_timestamps": include_timestamps
        }
        
        # Formata conteúdo
        if format_type == 'markdown':
            content = self.format_transcript_markdown(transcript, include_timestamps)
            extension = 'md'
        elif format_type == 'text':
            formatter = TextFormatter()
            content = formatter.format_transcript(transcript)
            extension = 'txt'
        elif format_type == 'vtt':
            formatter = WebVTTFormatter()
            content = formatter.format_transcript(transcript)
            extension = 'vtt'
        else:
            # JSON
            content = json.dumps(transcript, indent=2, ensure_ascii=False)
            extension = 'json'
        
        # Gera nome do arquivo
        date_str = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{date_str}_{video_id}.{extension}"
        filepath = self.output_dir / filename
        
        # Salva arquivo
        with open(filepath, 'w', encoding='utf-8') as f:
            if format_type == 'markdown':
                # Adiciona cabeçalho ao Markdown
                f.write(f"# Transcrição do YouTube\n\n")
                f.write(f"**URL:** {video_info['url']}\n")
                f.write(f"**ID:** {video_id}\n")
                f.write(f"**Idioma:** {language}\n")
                f.write(f"**Legendas automáticas:** {'Sim' if is_auto else 'Não'}\n")
                f.write(f"**Extraído em:** {video_info['extracted_at']}\n")
                f.write(f"\n---\n\n")
            
            f.write(content)
        
        print(f"✅ Transcrição salva em: {filepath}")
        
        # Atualiza metadados
        video_info["filename"] = filename
        video_info["format"] = format_type
        self.metadata["videos"][video_id] = video_info
        self.save_metadata()
        
        return video_info
    
    def batch_extract(self, urls_file: str, **kwargs):
        """Extrai transcrições de múltiplos vídeos de um arquivo"""
        with open(urls_file, 'r') as f:
            lines = [line.strip() for line in f if line.strip()]
        
        # Filtra apenas as linhas que contêm URLs válidas do YouTube
        urls = []
        for line in lines:
            # Ignora comentários (linhas que começam com #)
            if line.startswith('#'):
                continue
            
            # Verifica se a linha contém uma URL do YouTube
            if 'youtube.com/watch' in line or 'youtu.be/' in line:
                # Se a linha tem um número no início (como "1. https://..."), extrai apenas a URL
                if re.match(r'^\d+\.\s*', line):
                    url = re.sub(r'^\d+\.\s*', '', line)
                    urls.append(url)
                # Se já é uma URL limpa
                elif line.startswith('http'):
                    urls.append(line)
        
        print(f"📄 Encontradas {len(urls)} URLs válidas no arquivo")
        
        results = []
        for i, url in enumerate(urls, 1):
            print(f"\n[{i}/{len(urls)}] Processando: {url}")
            try:
                result = self.extract_and_save(url, **kwargs)
                results.append(result)
                # Adiciona delay entre vídeos para evitar rate limiting
                if i < len(urls):  # Não faz delay no último vídeo
                    delay = 15 + (i % 3) * 5  # Delay variável: 15, 20, 25 segundos
                    print(f"⏳ Aguardando {delay} segundos para evitar bloqueio...")
                    import time
                    time.sleep(delay)
            except Exception as e:
                print(f"❌ Erro: {e}")
                results.append({"url": url, "error": str(e)})
        
        return results


def main():
    parser = argparse.ArgumentParser(
        description="Extrai transcrições de vídeos do YouTube",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos de uso:
  # URL completa
  python youtube_transcript.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  
  # Apenas ID do vídeo
  python youtube_transcript.py dQw4w9WgXcQ
  
  # Com opções
  python youtube_transcript.py VIDEO_ID --format json --no-timestamps
  
  # Múltiplos vídeos
  python youtube_transcript.py --batch urls.txt
        """
    )
    
    parser.add_argument('video', nargs='?', help='URL ou ID do vídeo do YouTube')
    parser.add_argument('--batch', help='Arquivo com lista de URLs (uma por linha)')
    parser.add_argument('--format', choices=['markdown', 'text', 'json', 'vtt'], 
                       default='markdown', help='Formato de saída (padrão: markdown)')
    parser.add_argument('--no-timestamps', action='store_true', 
                       help='Remove timestamps da transcrição')
    parser.add_argument('--languages', nargs='+', 
                       default=['pt', 'pt-BR', 'en', 'es'],
                       help='Idiomas preferidos em ordem de prioridade')
    parser.add_argument('--output-dir', default='pastas-caminhos/youtube-transcripts',
                       help='Diretório de saída (padrão: pastas-caminhos/youtube-transcripts)')
    
    args = parser.parse_args()
    
    if not args.video and not args.batch:
        parser.error('É necessário fornecer um vídeo ou usar --batch')
    
    # Cria extrator
    extractor = YouTubeTranscriptExtractor(args.output_dir)
    
    # Processa
    if args.batch:
        results = extractor.batch_extract(
            args.batch,
            format_type=args.format,
            include_timestamps=not args.no_timestamps,
            languages=args.languages
        )
        print(f"\n📊 Resumo: {len([r for r in results if 'error' not in r])}/{len(results)} processados com sucesso")
    else:
        try:
            result = extractor.extract_and_save(
                args.video,
                format_type=args.format,
                include_timestamps=not args.no_timestamps,
                languages=args.languages
            )
            print(f"\n✨ Concluído! Arquivo: {result['filename']}")
        except Exception as e:
            print(f"\n❌ Erro: {e}")
            return 1
    
    return 0


if __name__ == "__main__":
    exit(main())