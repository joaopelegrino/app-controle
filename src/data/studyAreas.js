export const studyAreas = {
  bash: {
    name: 'Bash',
    icon: '🐚',
    description: 'Shell scripting, automação e linha de comando',
    status: 'active',
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
            code: 'NAME="Developer"\necho $NAME\n# ou\necho ${NAME}',
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
    status: 'in-development',
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
    status: 'in-development',
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
    status: 'in-development',
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
    status: 'in-development',
    badge: null,
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
    status: 'in-development',
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
    status: 'active',
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
    status: 'in-development',
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
    status: 'in-development',
    badge: null,
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
    status: 'active',
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
  },
  claudecode: {
    name: 'Claude Code',
    icon: '🤖',
    description: 'Ferramenta CLI da Anthropic para desenvolvimento assistido por IA',
    status: 'active',
    badge: 'new',
    modules: 12,
    hours: 120,
    hasIntegratedApp: true,
    flashcards: {
      basics: {
        name: 'Fundamentos',
        cards: [
          {
            question: 'Como instalar o Claude Code?',
            answer: 'npm install -g @anthropic-ai/claude-code',
            code: 'npm install -g @anthropic-ai/claude-code\nclaude --version\nclaude auth login',
            details: 'Requer Node.js e conta Anthropic\nConfigurar API key\nTestar com --version'
          },
          {
            question: 'Como analisar um arquivo com Claude?',
            answer: 'claude "analise este arquivo: [nome]"',
            code: 'claude "analise package.json"\nclaude "explique este código: main.py"\nclaude "sugira melhorias para: app.js"',
            details: 'Claude lê automaticamente o arquivo\nFornece análise detalhada\nSugere melhorias específicas'
          },
          {
            question: 'Como criar comandos personalizados?',
            answer: 'Criar arquivo .md em ~/.claude/commands/',
            code: '---\nname: code-review\ndescription: Review completo\n---\n\nAnalise código com foco em:\n- Qualidade\n- Performance\n- Segurança',
            details: 'Usar formato YAML + Markdown\nArgumentos dinâmicos com $PARAM\nOrganizar por categorias'
          }
        ]
      },
      advanced: {
        name: 'Avançado',
        cards: [
          {
            question: 'O que é o framework MAESTRO?',
            answer: '7 camadas de segurança para sistemas de IA',
            details: 'M - Model Security\nA - Access Control\nE - Encryption\nS - Sanitization\nT - Trust Boundaries\nR - Rate Limiting\nO - Observability'
          },
          {
            question: 'Como implementar sistemas multi-agentes?',
            answer: 'Orquestrar múltiplos agentes especializados',
            code: 'agents:\n  - analyzer: "Analisa código"\n  - security: "Auditoria"\n  - docs: "Documentação"\n  - coordinator: "Orquestra"',
            details: 'Cada agente tem função específica\nComunicação via message passing\nCoordinator gerencia workflow'
          }
        ]
      }
    }
  },
  rustprogramming: {
    name: 'Sistemas de Aprendizado Rust',
    icon: '🦀',
    description: 'Curso completo de Rust Programming - Sistema integrado com vídeo e 24 módulos',
    status: 'active',
    badge: 'integrated',
    modules: 24,
    hours: 120,
    hasIntegratedApp: true,
    flashcards: {
      fundamentals: {
        name: 'Fundamentos',
        cards: [
          {
            question: 'Quais são as 3 regras de ownership em Rust?',
            answer: '1) Cada valor tem um owner, 2) Só pode haver um owner por vez, 3) Quando o owner sai de escopo, o valor é dropado',
            code: 'let s1 = String::from("hello");\nlet s2 = s1; // Move occurs\n// s1 is no longer valid',
            details: 'Ownership é o que torna Rust único\nEvita memory leaks e data races\nCompilador garante memory safety'
          },
          {
            question: 'Diferença entre String e &str?',
            answer: 'String é owned (heap), &str é borrowed (stack/heap slice)',
            code: 'let s1: String = String::from("hello");\nlet s2: &str = "world"; // string literal\nlet s3: &str = &s1; // slice of String',
            details: 'String: mutável, owned, heap\n&str: imutável, borrowed, slice\nUse &str para parâmetros de função'
          },
          {
            question: 'Como funciona borrowing em Rust?',
            answer: 'Referencias (&) permitem usar valor sem tomar ownership',
            code: 'let s = String::from("hello");\nlet len = calculate_length(&s);\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}',
            details: '& cria referência imutável\n&mut cria referência mutável\nApenas uma &mut OU várias & por vez'
          },
          {
            question: 'O que são lifetimes em Rust?',
            answer: 'Anotações que garantem que referências vivem tempo suficiente',
            code: 'fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str {\n    if x.len() > y.len() { x } else { y }\n}',
            details: 'Previnem dangling pointers\nCompilador infere na maioria dos casos\nNecessárias em structs com referências'
          }
        ]
      },
      advanced: {
        name: 'Conceitos Avançados',
        cards: [
          {
            question: 'O que são traits em Rust?',
            answer: 'Interface que define comportamento compartilhado entre tipos',
            code: 'trait Summary {\n    fn summarize(&self) -> String;\n}\n\nimpl Summary for NewsArticle {\n    fn summarize(&self) -> String {\n        format!("{}", self.headline)\n    }\n}',
            details: 'Similar a interfaces em outras linguagens\nPermitem polimorfismo\nPode ter implementações default'
          },
          {
            question: 'Como funcionam generics em Rust?',
            answer: 'Permitem escrever código para múltiplos tipos',
            code: 'struct Point<T> {\n    x: T,\n    y: T,\n}\n\nlet integer_point = Point { x: 5, y: 10 };\nlet float_point = Point { x: 1.0, y: 4.0 };',
            details: 'Compilador gera código específico para cada tipo\nZero-cost abstractions\nUse com traits para trait bounds'
          },
          {
            question: 'O que é o Result<T, E> enum?',
            answer: 'Tipo para tratamento de erros recoverable',
            code: 'fn divide(a: f64, b: f64) -> Result<f64, String> {\n    if b == 0.0 {\n        Err("Division by zero".to_string())\n    } else {\n        Ok(a / b)\n    }\n}',
            details: 'Ok(T) para sucesso, Err(E) para erro\nUse ? operator para propagação\nForça tratamento explícito de erros'
          }
        ]
      }
    }
  },
  rust: {
    name: 'Rust',
    icon: '🦀',
    description: 'Caminho completo de aprendizado em desenvolvimento moderno',
    status: 'active',
    badge: 'new',
    modules: 35,
    hours: 140,
    isLearningPath: true,
    flashcards: {
      terminalWarp: {
        name: 'Terminal Warp',
        cards: [
          {
            question: 'Como instalar o Warp Terminal?',
            answer: 'Download direto do site oficial warp.dev',
            code: '# Linux/WSL:\nwget -qO- https://releases.warp.dev/linux/v0.2023.11.14.08.02.stable_02/warp-terminal_0.2023.11.14.08.02.stable.02_amd64.deb',
            details: 'Terminal moderno com AI integrada\nSuporta blocos de comando\nAutocomplete inteligente'
          },
          {
            question: 'Quais são os principais recursos do Warp?',
            answer: 'AI Assistant, blocos de comando, colaboração',
            details: 'AI Assistant para ajuda contextual\nBlocos de comando editáveis\nCompartilhamento de sessões\nTemas personalizáveis'
          }
        ]
      },
      vimMotions: {
        name: 'Vim Motions',
        cards: [
          {
            question: 'Quais são os movimentos básicos do Vim?',
            answer: 'h (esquerda), j (baixo), k (cima), l (direita)',
            code: 'h - move cursor para esquerda\nj - move cursor para baixo\nk - move cursor para cima\nl - move cursor para direita',
            details: 'Movimentos fundamentais no Vim\nEvita uso do mouse\nMais eficiente que setas'
          },
          {
            question: 'Como navegar por palavras no Vim?',
            answer: 'w (próxima palavra), b (palavra anterior), e (fim da palavra)',
            code: 'w - próxima palavra\nb - palavra anterior\ne - fim da palavra atual\nW, B, E - ignora pontuação',
            details: 'Navegação rápida por texto\nMinúscula: considera pontuação\nMaiúscula: ignora pontuação'
          }
        ]
      },
      rustLang: {
        name: 'Linguagem Rust',
        cards: [
          {
            question: 'Como instalar Rust?',
            answer: 'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh',
            code: 'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh\nsource ~/.cargo/env\nrustc --version',
            details: 'Rustup gerencia toolchain Rust\nInstala compiler e Cargo\nAutomaticamente configura PATH'
          },
          {
            question: 'Como criar um projeto Rust?',
            answer: 'cargo new projeto_nome',
            code: 'cargo new meu_projeto\ncd meu_projeto\ncargo run',
            details: 'Cargo é o build system do Rust\nCria estrutura padrão\nGerencia dependências'
          },
          {
            question: 'O que é ownership em Rust?',
            answer: 'Sistema de gerenciamento de memória sem garbage collector',
            code: 'fn main() {\n    let s1 = String::from("hello");\n    let s2 = s1; // s1 não é mais válido\n    println!("{}", s2);\n}',
            details: 'Cada valor tem um único owner\nQuando owner sai de escopo, valor é dropado\nPrevine memory leaks e data races'
          }
        ]
      },
      devopsRust: {
        name: 'DevOps',
        cards: [
          {
            question: 'Como configurar CI/CD para Rust?',
            answer: 'GitHub Actions com cargo test e cargo build',
            code: 'name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3\n    - run: cargo test',
            details: 'Actions padrão para Rust\nTesta em múltiplas versões\nCache de dependências'
          }
        ]
      },
      servidoresRust: {
        name: 'Servidores',
        cards: [
          {
            question: 'Como criar servidor web com Actix?',
            answer: 'Framework web rápido para Rust',
            code: 'use actix_web::{web, App, HttpServer, Result};\n\nasync fn hello() -> Result<String> {\n    Ok("Hello World!".to_string())\n}\n\n#[actix_web::main]\nasync fn main() -> std::io::Result<()> {\n    HttpServer::new(|| {\n        App::new().route("/", web::get().to(hello))\n    })\n    .bind("127.0.0.1:8080")?\n    .run()\n    .await\n}',
            details: 'Actix-web é um dos frameworks mais rápidos\nSuporta async/await\nMiddleware integrado'
          }
        ]
      },
      segurancaRust: {
        name: 'Segurança',
        cards: [
          {
            question: 'Por que Rust é seguro por padrão?',
            answer: 'Sistema de tipos previne vulnerabilidades comuns',
            details: 'Não há buffer overflows\nMemory safety sem garbage collector\nThread safety compiletime\nNão há null pointer dereferencing'
          },
          {
            question: 'Como usar ferramentas de auditoria em Rust?',
            answer: 'cargo audit verifica vulnerabilidades conhecidas',
            code: 'cargo install cargo-audit\ncargo audit\ncargo audit fix',
            details: 'Verifica dependências vulneráveis\nBancoBenchmarkodo RustSec Advisory Database\nCorrige automaticamente quando possível'
          }
        ]
      },
      criptografiaRust: {
        name: 'Criptografia',
        cards: [
          {
            question: 'Qual crate usar para criptografia?',
            answer: 'ring para criptografia de baixo nível, rustls para TLS',
            code: '[dependencies]\nring = "0.16"\nrustls = "0.21"',
            details: 'ring: primitivas criptográficas\nrustls: implementação TLS pura Rust\nAuditorias regulares de segurança'
          },
          {
            question: 'Como gerar hash SHA-256?',
            answer: 'Use ring::digest para hashing seguro',
            code: 'use ring::digest;\n\nfn sha256(data: &[u8]) -> String {\n    let digest = digest::digest(&digest::SHA256, data);\n    hex::encode(digest.as_ref())\n}',
            details: 'ring usa implementações auditadas\nConstant-time operations\nResistente a timing attacks'
          }
        ]
      }
    }
  }
};