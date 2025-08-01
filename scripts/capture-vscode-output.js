#!/usr/bin/env node

/**
 * Script para capturar e salvar logs do VSCode OUTPUT panel
 * Útil para debugging colaborativo com Claude Code
 * 
 * Uso: node capture-vscode-output.js [output-channel-name]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const DEBUG_DIR = path.join(__dirname, '..', 'debug-logs');
const TIMESTAMP = new Date().toISOString().replace(/:/g, '-').split('.')[0];

// Criar diretório de debug se não existir
if (!fs.existsSync(DEBUG_DIR)) {
  fs.mkdirSync(DEBUG_DIR, { recursive: true });
}

/**
 * Captura output usando VSCode CLI
 * Nota: Requer que o VSCode esteja rodando com a extensão de CLI
 */
function captureVSCodeOutput(channelName = 'Tasks') {
  try {
    console.log(`📋 Tentando capturar output do canal: ${channelName}`);
    
    // Método 1: Usar clipboard (requer interação manual)
    console.log('\n⚠️  Instruções para captura manual:');
    console.log('1. Abra o VSCode');
    console.log('2. Vá para View > Output');
    console.log(`3. Selecione o canal "${channelName}"`);
    console.log('4. Selecione todo o texto (Ctrl+A)');
    console.log('5. Copie (Ctrl+C)');
    console.log('6. Pressione Enter aqui para continuar...\n');
    
    // Aguardar input do usuário
    require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    }).question('', () => {
      saveClipboardContent(channelName);
    });
    
  } catch (error) {
    console.error('❌ Erro ao capturar output:', error.message);
  }
}

/**
 * Salva conteúdo do clipboard
 */
function saveClipboardContent(channelName) {
  try {
    // Tentar obter conteúdo do clipboard (funciona em Windows/WSL)
    let clipboardContent;
    
    if (process.platform === 'win32' || process.env.WSL_DISTRO_NAME) {
      // WSL2 - usar PowerShell
      clipboardContent = execSync('powershell.exe -command "Get-Clipboard"', { encoding: 'utf8' });
    } else {
      // Linux nativo - usar xclip
      clipboardContent = execSync('xclip -selection clipboard -o', { encoding: 'utf8' });
    }
    
    if (clipboardContent) {
      const fileName = `vscode-output-${channelName.toLowerCase()}-${TIMESTAMP}.log`;
      const filePath = path.join(DEBUG_DIR, fileName);
      
      fs.writeFileSync(filePath, clipboardContent);
      console.log(`✅ Output salvo em: ${filePath}`);
      
      // Criar também um JSON estruturado
      const jsonData = {
        timestamp: new Date().toISOString(),
        channel: channelName,
        content: clipboardContent,
        lines: clipboardContent.split('\n').length,
        size: Buffer.byteLength(clipboardContent, 'utf8')
      };
      
      const jsonPath = filePath.replace('.log', '.json');
      fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
      console.log(`📊 Metadata salva em: ${jsonPath}`);
      
    } else {
      console.error('❌ Clipboard vazio ou não acessível');
    }
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Erro ao salvar clipboard:', error.message);
    console.log('\n💡 Dica: Instale xclip (Linux) ou certifique-se de estar no WSL2');
    process.exit(1);
  }
}

/**
 * Método alternativo: Capturar output de tasks específicas
 */
function captureTaskOutput(taskName) {
  console.log(`🔧 Capturando output da task: ${taskName}`);
  
  try {
    // Executar task e capturar output
    const output = execSync(`npm run ${taskName} 2>&1`, { 
      encoding: 'utf8',
      cwd: path.join(__dirname, '..')
    });
    
    const fileName = `task-output-${taskName}-${TIMESTAMP}.log`;
    const filePath = path.join(DEBUG_DIR, fileName);
    
    fs.writeFileSync(filePath, output);
    console.log(`✅ Output da task salvo em: ${filePath}`);
    
  } catch (error) {
    // Mesmo com erro, salvar o output
    const errorOutput = error.stdout || error.message;
    const fileName = `task-error-${taskName}-${TIMESTAMP}.log`;
    const filePath = path.join(DEBUG_DIR, fileName);
    
    fs.writeFileSync(filePath, errorOutput);
    console.log(`⚠️  Erro capturado e salvo em: ${filePath}`);
  }
}

/**
 * Listar canais de output comuns
 */
function listCommonChannels() {
  console.log('\n📺 Canais de OUTPUT comuns no VSCode:');
  console.log('- Tasks');
  console.log('- Problems'); 
  console.log('- Debug Console');
  console.log('- Terminal');
  console.log('- Extensions');
  console.log('- Git');
  console.log('- ESLint');
  console.log('- TypeScript');
  console.log('- Vite');
  console.log('- React');
  console.log('- Claude Code\n');
}

// Main
const args = process.argv.slice(2);
const channelOrTask = args[0];

if (!channelOrTask) {
  console.log('📌 VSCode Output Capture Tool\n');
  console.log('Uso:');
  console.log('  node capture-vscode-output.js [channel-name]');
  console.log('  node capture-vscode-output.js --task [task-name]\n');
  
  listCommonChannels();
  
  // Modo interativo
  captureVSCodeOutput();
} else if (channelOrTask === '--task' && args[1]) {
  captureTaskOutput(args[1]);
} else {
  captureVSCodeOutput(channelOrTask);
}