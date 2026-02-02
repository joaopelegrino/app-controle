#!/bin/bash
# Script para iniciar Chrome com remote debugging habilitado
# Requerido para MCP Chrome DevTools

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   Chrome DevTools MCP - Inicializador de Debug${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo ""

# Porta de debug (padrão 9222)
DEBUG_PORT="${1:-9222}"
PROJECT_URL="${2:-http://localhost:3001}"

echo -e "${GREEN}✓${NC} Porta de debug: ${YELLOW}$DEBUG_PORT${NC}"
echo -e "${GREEN}✓${NC} URL do projeto: ${YELLOW}$PROJECT_URL${NC}"
echo ""

# Detectar sistema operacional
if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # WSL ou Linux
    if grep -qEi "(Microsoft|WSL)" /proc/version &> /dev/null ; then
        echo -e "${BLUE}ℹ${NC}  Sistema detectado: ${YELLOW}WSL2${NC}"

        # Verificar se Chrome está instalado no Windows
        CHROME_PATH="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"

        if [ ! -f "$CHROME_PATH" ]; then
            CHROME_PATH="/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
        fi

        if [ ! -f "$CHROME_PATH" ]; then
            echo -e "${RED}✗${NC} Chrome não encontrado no Windows"
            echo -e "${YELLOW}Instale o Chrome em: https://www.google.com/chrome/${NC}"
            exit 1
        fi

        # Verificar se já existe instância rodando na porta
        if netstat -tuln 2>/dev/null | grep -q ":$DEBUG_PORT "; then
            echo -e "${YELLOW}⚠${NC}  Porta $DEBUG_PORT já está em uso"
            echo -e "${YELLOW}⚠${NC}  Matando processos Chrome antigos..."

            # Matar Chrome via PowerShell
            powershell.exe -Command "Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force" 2>/dev/null
            sleep 2
        fi

        echo -e "${GREEN}✓${NC} Iniciando Chrome com remote debugging..."

        # Iniciar Chrome em background
        "$CHROME_PATH" \
            --remote-debugging-port=$DEBUG_PORT \
            --user-data-dir="$HOME/.chrome-debug-profile" \
            --no-first-run \
            --no-default-browser-check \
            "$PROJECT_URL" &

        CHROME_PID=$!

        echo -e "${GREEN}✓${NC} Chrome iniciado (PID: $CHROME_PID no Windows)"

    else
        # Linux nativo
        echo -e "${BLUE}ℹ${NC}  Sistema detectado: ${YELLOW}Linux${NC}"

        # Verificar se Chrome está instalado
        if command -v google-chrome &> /dev/null; then
            CHROME_CMD="google-chrome"
        elif command -v google-chrome-stable &> /dev/null; then
            CHROME_CMD="google-chrome-stable"
        elif command -v chromium-browser &> /dev/null; then
            CHROME_CMD="chromium-browser"
        else
            echo -e "${RED}✗${NC} Chrome/Chromium não encontrado"
            echo -e "${YELLOW}Instale com: sudo apt install google-chrome-stable${NC}"
            exit 1
        fi

        # Verificar porta
        if netstat -tuln 2>/dev/null | grep -q ":$DEBUG_PORT "; then
            echo -e "${YELLOW}⚠${NC}  Porta $DEBUG_PORT já está em uso"
            echo -e "${YELLOW}⚠${NC}  Matando processos Chrome antigos..."
            pkill -f "chrome.*--remote-debugging-port"
            sleep 2
        fi

        echo -e "${GREEN}✓${NC} Iniciando Chrome com remote debugging..."

        $CHROME_CMD \
            --remote-debugging-port=$DEBUG_PORT \
            --user-data-dir="$HOME/.chrome-debug-profile" \
            --no-first-run \
            --no-default-browser-check \
            "$PROJECT_URL" &> /dev/null &

        CHROME_PID=$!
        echo -e "${GREEN}✓${NC} Chrome iniciado (PID: $CHROME_PID)"
    fi

elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo -e "${BLUE}ℹ${NC}  Sistema detectado: ${YELLOW}macOS${NC}"

    CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

    if [ ! -f "$CHROME_PATH" ]; then
        echo -e "${RED}✗${NC} Chrome não encontrado no macOS"
        echo -e "${YELLOW}Instale em: https://www.google.com/chrome/${NC}"
        exit 1
    fi

    # Verificar porta
    if lsof -Pi :$DEBUG_PORT -sTCP:LISTEN -t &> /dev/null ; then
        echo -e "${YELLOW}⚠${NC}  Porta $DEBUG_PORT já está em uso"
        echo -e "${YELLOW}⚠${NC}  Matando processos Chrome antigos..."
        pkill -f "Google Chrome.*--remote-debugging-port"
        sleep 2
    fi

    echo -e "${GREEN}✓${NC} Iniciando Chrome com remote debugging..."

    "$CHROME_PATH" \
        --remote-debugging-port=$DEBUG_PORT \
        --user-data-dir="$HOME/.chrome-debug-profile" \
        --no-first-run \
        --no-default-browser-check \
        "$PROJECT_URL" &> /dev/null &

    CHROME_PID=$!
    echo -e "${GREEN}✓${NC} Chrome iniciado (PID: $CHROME_PID)"

else
    echo -e "${RED}✗${NC} Sistema operacional não suportado: $OSTYPE"
    exit 1
fi

# Aguardar Chrome inicializar
echo ""
echo -e "${BLUE}⏳${NC} Aguardando Chrome inicializar..."
sleep 3

# Testar conexão com DevTools Protocol
echo -e "${BLUE}🔍${NC} Testando conexão DevTools Protocol..."

DEVTOOLS_URL="http://localhost:$DEBUG_PORT/json/version"

if curl -s "$DEVTOOLS_URL" &> /dev/null; then
    echo -e "${GREEN}✓${NC} DevTools Protocol respondendo!"
    echo ""
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}✓ Chrome DevTools MCP configurado com sucesso!${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${BLUE}Informações:${NC}"
    echo -e "  • Debug Port: ${YELLOW}$DEBUG_PORT${NC}"
    echo -e "  • DevTools URL: ${YELLOW}$DEVTOOLS_URL${NC}"
    echo -e "  • User Data Dir: ${YELLOW}$HOME/.chrome-debug-profile${NC}"
    echo ""
    echo -e "${BLUE}Como usar:${NC}"
    echo -e "  1. O Chrome está rodando em modo debug"
    echo -e "  2. Claude Code pode agora interagir com ele via MCP"
    echo -e "  3. Use comandos como: 'tire um screenshot da página'"
    echo ""
    echo -e "${YELLOW}Para parar:${NC} Feche o Chrome ou use ${YELLOW}Ctrl+C${NC}"
    echo ""
else
    echo -e "${RED}✗${NC} Não foi possível conectar ao DevTools Protocol"
    echo -e "${YELLOW}Verifique se a porta $DEBUG_PORT está acessível${NC}"
    exit 1
fi

# Manter script rodando (opcional)
# Pressione Ctrl+C para sair
if [ -n "$CHROME_PID" ]; then
    echo -e "${BLUE}Pressione Ctrl+C para parar o Chrome${NC}"
    wait
fi
