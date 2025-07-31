export const studyAreas = {
  bash: {
    name: 'Bash',
    icon: '🐚',
    description: 'Shell scripting, automação e linha de comando',
    badge: 'integrated',
    modules: 16,
    hours: 32,
    hasIntegratedApp: true,
    flashcards: {
      basics: {
        name: 'Fundamentos',
        cards: [
          {
            question: 'Como criar uma variável em Bash?',
            answer: 'VARIAVEL="valor" (sem espaços ao redor do =)',
            code: 'NAME="João"\necho $NAME\n# ou\necho ${NAME}',
            details: 'Em Bash, não use espaços ao redor do =\nUse $ para acessar o valor\nUse ${} para delimitar claramente a variável'
          },
          {
            question: 'Como fazer um loop for em Bash?',
            answer: 'Use for item in lista; do comandos; done',
            code: 'for i in 1 2 3 4 5; do\n    echo "Número: $i"\ndone\n\n# Ou com range\nfor i in {1..5}; do\n    echo "Número: $i"\ndone',
            details: 'Sintaxe: for VAR in LISTA; do COMANDOS; done\n{1..5} expande para 1 2 3 4 5\nPode iterar sobre arquivos: for file in *.txt'
          }
        ]
      }
    }
  },
  linux: {
    name: 'Linux',
    icon: '🐧',
    description: 'Sistema operacional, comandos e administração',
    modules: 12,
    hours: 24,
    flashcards: {
      commands: {
        name: 'Comandos Essenciais',
        cards: [
          {
            question: 'Como encontrar arquivos por nome?',
            answer: 'Use o comando find',
            code: 'find /caminho -name "*.txt"\nfind . -name "arquivo*"',
            details: 'find [caminho] -name [padrão]\n.: diretório atual\n-iname: busca case-insensitive'
          }
        ]
      }
    }
  },
  servers: {
    name: 'Servidores',
    icon: '🖥️',
    description: 'Web servers, configuração e otimização',
    modules: 10,
    hours: 20,
    flashcards: {
      nginx: {
        name: 'Nginx',
        cards: [
          {
            question: 'Como configurar um virtual host no Nginx?',
            answer: 'Criar arquivo em sites-available e linkar em sites-enabled',
            code: 'server {\n    listen 80;\n    server_name exemplo.com;\n    root /var/www/exemplo;\n}',
            details: 'Salve em /etc/nginx/sites-available/\nTeste: nginx -t\nRecarregue: systemctl reload nginx'
          }
        ]
      }
    }
  },
  devops: {
    name: 'DevOps',
    icon: '⚙️',
    description: 'CI/CD, automação e práticas modernas',
    modules: 15,
    hours: 30,
    flashcards: {
      cicd: {
        name: 'CI/CD',
        cards: [
          {
            question: 'O que é CI/CD?',
            answer: 'Continuous Integration e Continuous Deployment/Delivery',
            details: 'CI: Integração contínua de código\nCD: Entrega/Deploy contínuo'
          }
        ]
      }
    }
  },
  cryptography: {
    name: 'Criptografia',
    icon: '🔐',
    description: 'Algoritmos, protocolos e segurança de dados',
    badge: 'new',
    modules: 8,
    hours: 16,
    flashcards: {
      basics: {
        name: 'Fundamentos',
        cards: [
          {
            question: 'Qual a diferença entre criptografia simétrica e assimétrica?',
            answer: 'Simétrica usa uma chave, assimétrica usa par de chaves',
            details: 'Simétrica: mesma chave\nAssimétrica: par de chaves pública/privada'
          }
        ]
      }
    }
  },
  security: {
    name: 'Segurança',
    icon: '🛡️',
    description: 'Pentest, hardening e proteção de sistemas',
    modules: 12,
    hours: 24,
    flashcards: {
      web: {
        name: 'Segurança Web',
        cards: [
          {
            question: 'O que é SQL Injection?',
            answer: 'Injeção de SQL malicioso',
            code: '# Vulnerável:\nquery = f"SELECT * FROM users WHERE id = {user_id}"',
            details: 'Use prepared statements para prevenir'
          }
        ]
      }
    }
  },
  clang: {
    name: 'Linguagem C',
    icon: '🔨',
    description: 'Programação em C do básico ao avançado',
    badge: 'integrated',
    modules: 50,
    hours: 100,
    hasIntegratedApp: true,
    flashcards: {
      basics: {
        name: 'Fundamentos',
        cards: [
          {
            question: 'Como criar um "Olá Mundo" em C?',
            answer: 'Programa básico que imprime uma mensagem',
            code: '#include <stdio.h>\n\nint main() {\n    printf("Olá C!");\n    return 0;\n}',
            details: '#include <stdio.h>: biblioteca padrão\nint main(): função principal\nprintf(): imprime texto\nreturn 0: sucesso'
          },
          {
            question: 'Qual a diferença na declaração de variáveis char e bool?',
            answer: 'char precisa de [] para strings, bool precisa de <stdbool.h>',
            code: 'char nome[50];\nchar letra = \'A\';\n\n#include <stdbool.h>\nbool ativo = true;',
            details: 'char: tipo nativo\nbool: requer stdbool.h'
          },
          {
            question: 'Como usar variável bool em C?',
            answer: 'Incluir stdbool.h e usar em condicionais',
            code: '#include <stdbool.h>\n\nbool estudante = false;\nif (estudante) {\n    printf("Estudante");\n}',
            details: 'bool: true/false ou 1/0'
          }
        ]
      }
    }
  },
  docker: {
    name: 'Docker',
    icon: '🐳',
    description: 'Containers, imagens e orquestração',
    modules: 10,
    hours: 20,
    flashcards: {
      basics: {
        name: 'Fundamentos',
        cards: [
          {
            question: 'Como criar uma imagem Docker?',
            answer: 'Use um Dockerfile e docker build',
            code: 'FROM node:14\nWORKDIR /app\nCOPY . .\nCMD ["npm", "start"]',
            details: 'FROM: imagem base\nWORKDIR: diretório\nCOPY: copia arquivos\nCMD: comando padrão'
          }
        ]
      }
    }
  },
  kubernetes: {
    name: 'Kubernetes',
    icon: '☸️',
    description: 'Orquestração de containers em escala',
    badge: 'new',
    modules: 15,
    hours: 30,
    flashcards: {
      concepts: {
        name: 'Conceitos',
        cards: [
          {
            question: 'O que é um Pod?',
            answer: 'Menor unidade deployável',
            code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-pod',
            details: 'Pod = 1+ containers\nCompartilham rede e storage'
          }
        ]
      }
    }
  },
  vscode: {
    name: 'VS Code WSL',
    icon: '💻',
    description: 'Desenvolvimento integrado com WSL2',
    badge: 'integrated',
    modules: 8,
    hours: 16,
    hasIntegratedApp: true,
    flashcards: {
      wsl: {
        name: 'WSL Integration',
        cards: [
          {
            question: 'Como abrir projeto WSL no VS Code?',
            answer: 'Use code . no terminal WSL',
            code: 'cd /home/user/projeto\ncode .',
            details: 'Instale Remote-WSL\nVS Code no Windows, edita no Linux'
          },
          {
            question: 'Como configurar tasks.json?',
            answer: 'Tasks executam no WSL automaticamente',
            code: '{\n  "version": "2.0.0",\n  "tasks": [{\n    "label": "Build",\n    "command": "gcc"\n  }]\n}',
            details: 'Shell padrão é o WSL\nCaminhos são do Linux'
          }
        ]
      }
    }
  }
};