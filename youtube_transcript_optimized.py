#!/usr/bin/env python3
"""
YouTube Transcript Extractor - Versão Otimizada
Com estratégias anti-bloqueio e múltiplas alternativas
"""

import os
import re
import json
import time
import random
import argparse
import subprocess
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, List, Tuple
from urllib.parse import urlparse, parse_qs

# Importações com tratamento de erro
try:
    from youtube_transcript_api import YouTubeTranscriptApi
    from youtube_transcript_api.formatters import TextFormatter, WebVTTFormatter
    YOUTUBE_API_AVAILABLE = True
except ImportError:
    YOUTUBE_API_AVAILABLE = False
    print("⚠️ youtube-transcript-api não instalada. Usando métodos alternativos.")

try:
    import requests
    REQUESTS_AVAILABLE = True
except ImportError:
    REQUESTS_AVAILABLE = False
    print("⚠️ requests não instalado. Algumas funcionalidades limitadas.")


class YouTubeTranscriptExtractorOptimized:
    def __init__(self, output_dir: str = "youtube-transcripts", use_proxy: bool = False):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.metadata_file = self.output_dir / "metadata.json"
        self.failed_videos_file = self.output_dir / "failed_videos.json"
        self.use_proxy = use_proxy
        self.load_metadata()
        self.load_failed_videos()
        
        # Configurações anti-bloqueio
        self.min_delay = 3  # Delay mínimo entre requisições
        self.max_delay = 10  # Delay máximo entre requisições
        self.retry_count = 3  # Tentativas por vídeo
        self.batch_size = 5  # Processar em lotes pequenos
        
    def load_metadata(self):
        """Carrega metadados de vídeos já processados"""
        if self.metadata_file.exists():
            with open(self.metadata_file, 'r', encoding='utf-8') as f:
                self.metadata = json.load(f)
        else:
            self.metadata = {"videos": {}, "last_updated": None}
    
    def load_failed_videos(self):
        """Carrega lista de vídeos que falharam"""
        if self.failed_videos_file.exists():
            with open(self.failed_videos_file, 'r', encoding='utf-8') as f:
                self.failed_videos = json.load(f)
        else:
            self.failed_videos = {"videos": [], "last_updated": None}
    
    def save_metadata(self):
        """Salva metadados atualizados"""
        self.metadata["last_updated"] = datetime.now().isoformat()
        with open(self.metadata_file, 'w', encoding='utf-8') as f:
            json.dump(self.metadata, f, indent=2, ensure_ascii=False)
    
    def save_failed_videos(self):
        """Salva lista de vídeos que falharam"""
        self.failed_videos["last_updated"] = datetime.now().isoformat()
        with open(self.failed_videos_file, 'w', encoding='utf-8') as f:
            json.dump(self.failed_videos, f, indent=2, ensure_ascii=False)
    
    def extract_video_id(self, url_or_id: str) -> str:
        """Extrai ID do vídeo de uma URL ou retorna o ID diretamente"""
        if len(url_or_id) == 11 and not url_or_id.startswith('http'):
            return url_or_id
        
        parsed = urlparse(url_or_id)
        
        if parsed.hostname in ['youtube.com', 'www.youtube.com']:
            query = parse_qs(parsed.query)
            if 'v' in query:
                return query['v'][0]
        elif parsed.hostname == 'youtu.be':
            return parsed.path[1:]
        
        # Tentar extrair ID do formato de link da playlist
        if 'watch?v=' in url_or_id:
            match = re.search(r'watch\?v=([^&\s]+)', url_or_id)
            if match:
                return match.group(1)
        
        raise ValueError(f"Não foi possível extrair ID do vídeo de: {url_or_id}")
    
    def random_delay(self):
        """Adiciona delay aleatório entre requisições"""
        delay = random.uniform(self.min_delay, self.max_delay)
        print(f"⏳ Aguardando {delay:.1f} segundos para evitar bloqueio...")
        time.sleep(delay)
    
    def get_transcript_with_retry(self, video_id: str, languages: List[str] = None) -> tuple:
        """Obtém transcrição com sistema de retry e delay"""
        if languages is None:
            languages = ['pt', 'pt-BR', 'en', 'es']
        
        for attempt in range(self.retry_count):
            try:
                print(f"🔄 Tentativa {attempt + 1}/{self.retry_count} para vídeo {video_id}")
                
                if YOUTUBE_API_AVAILABLE:
                    # Método 1: API Python
                    transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
                    
                    # Tentar idiomas preferidos primeiro
                    for lang in languages:
                        try:
                            transcript = transcript_list.find_transcript([lang])
                            fetched = transcript.fetch()
                            
                            # Converter para formato compatível
                            transcript_data = []
                            for entry in fetched:
                                transcript_data.append({
                                    'text': entry['text'],
                                    'start': entry['start'],
                                    'duration': entry['duration']
                                })
                            
                            return transcript_data, transcript.language_code, transcript.is_generated
                        except:
                            continue
                    
                    # Se falhar, pegar qualquer transcrição disponível
                    for transcript in transcript_list:
                        fetched = transcript.fetch()
                        transcript_data = []
                        for entry in fetched:
                            transcript_data.append({
                                'text': entry['text'],
                                'start': entry['start'],
                                'duration': entry['duration']
                            })
                        return transcript_data, transcript.language_code, transcript.is_generated
                
            except Exception as e:
                error_msg = str(e)
                
                # Se for bloqueio de IP, aumentar delay
                if "blocking requests" in error_msg or "IP" in error_msg:
                    print(f"⚠️ Detectado possível bloqueio de IP. Aumentando delay...")
                    self.min_delay = min(self.min_delay * 1.5, 30)
                    self.max_delay = min(self.max_delay * 1.5, 60)
                    self.random_delay()
                
                elif "Subtitles are disabled" in error_msg:
                    print(f"❌ Vídeo {video_id} não tem legendas disponíveis")
                    return None, None, None
                
                else:
                    print(f"⚠️ Erro na tentativa {attempt + 1}: {error_msg[:100]}")
                
                if attempt < self.retry_count - 1:
                    self.random_delay()
        
        return None, None, None
    
    def try_alternative_methods(self, video_id: str) -> Optional[Dict]:
        """Tenta métodos alternativos para obter transcrição"""
        print(f"🔧 Tentando métodos alternativos para {video_id}...")
        
        # Método 2: Usar yt-dlp se disponível
        try:
            result = subprocess.run(
                ['yt-dlp', '--skip-download', '--write-subs', '--write-auto-subs', 
                 '--sub-langs', 'pt,en,es', '--sub-format', 'json3', 
                 f'https://www.youtube.com/watch?v={video_id}'],
                capture_output=True, text=True, timeout=30
            )
            
            if result.returncode == 0:
                # Procurar arquivo de legenda gerado
                for lang in ['pt', 'en', 'es']:
                    subtitle_file = Path(f"{video_id}.{lang}.json3")
                    if subtitle_file.exists():
                        with open(subtitle_file, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                        subtitle_file.unlink()  # Limpar arquivo temporário
                        return {"method": "yt-dlp", "data": data, "language": lang}
        except Exception as e:
            print(f"⚠️ yt-dlp não disponível ou falhou: {e}")
        
        # Método 3: Usar API alternativa (se configurada)
        if self.use_proxy:
            print("🌐 Tentando através de proxy/API alternativa...")
            # Aqui você poderia implementar uma chamada para um proxy ou API alternativa
            # Por exemplo, um servidor próprio que faz as requisições
        
        return None
    
    def format_transcript_markdown(self, transcript: List[Dict], include_timestamps: bool = True) -> str:
        """Formata transcrição para Markdown"""
        lines = []
        
        for entry in transcript:
            if include_timestamps:
                minutes = int(entry['start'] // 60)
                seconds = int(entry['start'] % 60)
                timestamp = f"[{minutes:02d}:{seconds:02d}]"
                lines.append(f"{timestamp} {entry['text']}")
            else:
                lines.append(entry['text'])
            
            if len(entry['text']) > 100:
                lines.append("")
        
        return '\n'.join(lines)
    
    def extract_and_save(self, url_or_id: str, format_type: str = 'markdown', 
                        include_timestamps: bool = True, languages: List[str] = None) -> Dict:
        """Extrai e salva transcrição do vídeo com estratégias otimizadas"""
        
        try:
            video_id = self.extract_video_id(url_or_id)
        except ValueError as e:
            print(f"❌ Erro ao extrair ID: {e}")
            return {"error": str(e)}
        
        print(f"📹 ID do vídeo: {video_id}")
        
        # Verifica se já foi processado
        if video_id in self.metadata.get("videos", {}):
            print(f"✅ Vídeo já processado anteriormente")
            return self.metadata["videos"][video_id]
        
        # Tenta obter transcrição com retry
        print(f"📥 Baixando transcrição...")
        transcript, language, is_auto = self.get_transcript_with_retry(video_id, languages)
        
        # Se falhar, tentar métodos alternativos
        if transcript is None:
            alternative = self.try_alternative_methods(video_id)
            if alternative:
                print(f"✅ Obtido via método alternativo: {alternative['method']}")
                # Processar dados alternativos...
            else:
                print(f"❌ Não foi possível obter transcrição para {video_id}")
                self.failed_videos["videos"].append({
                    "video_id": video_id,
                    "url": f"https://www.youtube.com/watch?v={video_id}",
                    "attempted_at": datetime.now().isoformat()
                })
                self.save_failed_videos()
                return {"video_id": video_id, "error": "Transcrição não disponível"}
        
        # Prepara informações do vídeo
        video_info = {
            "video_id": video_id,
            "url": f"https://www.youtube.com/watch?v={video_id}",
            "language": language,
            "auto_generated": is_auto,
            "extracted_at": datetime.now().isoformat(),
            "include_timestamps": include_timestamps
        }
        
        # Formata e salva
        if format_type == 'markdown':
            content = self.format_transcript_markdown(transcript, include_timestamps)
            extension = 'md'
        else:
            content = json.dumps(transcript, indent=2, ensure_ascii=False)
            extension = 'json'
        
        # Gera nome do arquivo
        date_str = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{date_str}_{video_id}.{extension}"
        filepath = self.output_dir / filename
        
        # Salva arquivo
        with open(filepath, 'w', encoding='utf-8') as f:
            if format_type == 'markdown':
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
    
    def batch_extract_optimized(self, urls_file: str, **kwargs):
        """Extrai transcrições em lotes com delays e controle de rate"""
        with open(urls_file, 'r') as f:
            urls = [line.strip() for line in f if line.strip()]
        
        results = []
        total = len(urls)
        processed = 0
        failed = 0
        
        print(f"\n📊 Total de vídeos para processar: {total}")
        print(f"⚙️ Processando em lotes de {self.batch_size} com delays entre requisições\n")
        
        # Processar em lotes
        for batch_start in range(0, total, self.batch_size):
            batch_end = min(batch_start + self.batch_size, total)
            batch = urls[batch_start:batch_end]
            
            print(f"\n📦 Processando lote {batch_start//self.batch_size + 1} ({batch_start+1}-{batch_end}/{total})")
            
            for i, url in enumerate(batch, 1):
                print(f"\n[{batch_start + i}/{total}] Processando: {url}")
                
                try:
                    result = self.extract_and_save(url, **kwargs)
                    results.append(result)
                    
                    if "error" not in result:
                        processed += 1
                    else:
                        failed += 1
                    
                except Exception as e:
                    print(f"❌ Erro não tratado: {e}")
                    results.append({"url": url, "error": str(e)})
                    failed += 1
                
                # Delay entre vídeos (exceto no último)
                if i < len(batch):
                    self.random_delay()
            
            # Delay maior entre lotes
            if batch_end < total:
                print(f"\n⏸️ Pausa entre lotes (30 segundos)...")
                time.sleep(30)
        
        # Relatório final
        print(f"\n{'='*60}")
        print(f"📊 RELATÓRIO FINAL")
        print(f"{'='*60}")
        print(f"✅ Processados com sucesso: {processed}/{total}")
        print(f"❌ Falharam: {failed}/{total}")
        
        if self.failed_videos["videos"]:
            print(f"\n⚠️ Vídeos que falharam salvos em: {self.failed_videos_file}")
        
        return results


def main():
    parser = argparse.ArgumentParser(
        description="Extrai transcrições do YouTube com otimizações anti-bloqueio",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    parser.add_argument('video', nargs='?', help='URL ou ID do vídeo')
    parser.add_argument('--batch', help='Arquivo com lista de URLs')
    parser.add_argument('--format', choices=['markdown', 'json'], default='markdown')
    parser.add_argument('--no-timestamps', action='store_true')
    parser.add_argument('--languages', nargs='+', default=['pt', 'pt-BR', 'en', 'es'])
    parser.add_argument('--output-dir', default='youtube-transcripts')
    parser.add_argument('--min-delay', type=int, default=3, help='Delay mínimo entre requisições (segundos)')
    parser.add_argument('--max-delay', type=int, default=10, help='Delay máximo entre requisições (segundos)')
    parser.add_argument('--batch-size', type=int, default=5, help='Tamanho do lote para processamento')
    parser.add_argument('--retry', type=int, default=3, help='Número de tentativas por vídeo')
    parser.add_argument('--use-proxy', action='store_true', help='Usar proxy/métodos alternativos')
    
    args = parser.parse_args()
    
    if not args.video and not args.batch:
        parser.error('É necessário fornecer um vídeo ou usar --batch')
    
    # Cria extrator otimizado
    extractor = YouTubeTranscriptExtractorOptimized(
        output_dir=args.output_dir,
        use_proxy=args.use_proxy
    )
    
    # Configurar parâmetros
    extractor.min_delay = args.min_delay
    extractor.max_delay = args.max_delay
    extractor.batch_size = args.batch_size
    extractor.retry_count = args.retry
    
    # Processa
    if args.batch:
        results = extractor.batch_extract_optimized(
            args.batch,
            format_type=args.format,
            include_timestamps=not args.no_timestamps,
            languages=args.languages
        )
    else:
        try:
            result = extractor.extract_and_save(
                args.video,
                format_type=args.format,
                include_timestamps=not args.no_timestamps,
                languages=args.languages
            )
            if "error" not in result:
                print(f"\n✨ Concluído! Arquivo: {result.get('filename', 'N/A')}")
            else:
                print(f"\n❌ Falhou: {result.get('error', 'Erro desconhecido')}")
                return 1
        except Exception as e:
            print(f"\n❌ Erro: {e}")
            return 1
    
    return 0


if __name__ == "__main__":
    exit(main())
