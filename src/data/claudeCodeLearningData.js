export const claudeCodeLearningData = {
  name: "Claude Code",
  startDate: "2025-01-31", // Data de hoje
  phases: [
    {
      phase: 1,
      name: "Fundamentos",
      description: "Setup, conceitos básicos e primeiros comandos",
      theme: "Primeiros passos com Claude Code",
      weeks: "1-2",
      modules: [
        {
          id: 1,
          title: "Setup e Conceitos Básicos",
          description: "Instalação, configuração e compreensão inicial",
          week: 1,
          hours: 10,
          deliverables: [
            "Instalação e configuração do Claude Code",
            "Execução dos primeiros comandos",
            "Quiz sobre conceitos básicos (10 questões)"
          ],
          temNotas: true
        },
        {
          id: 2,
          title: "Comandos Básicos e Navegação",
          description: "Dominar comandos fundamentais e contexto de projeto",
          week: 2,
          hours: 10,
          deliverables: [
            "Análise de código usando Claude",
            "Calculadora simples criada com ajuda do Claude",
            "Refatoração de código legado"
          ],
          temNotas: true
        }
      ]
    },
    {
      phase: 2,
      name: "Intermediário",
      description: "Comandos personalizados, prompt engineering e integração",
      theme: "Construindo ferramentas e automações",
      weeks: "3-6",
      modules: [
        {
          id: 3,
          title: "Comandos Personalizados",
          description: "Criar comandos customizados e organizar biblioteca",
          week: 3,
          hours: 10,
          deliverables: [
            "10 comandos personalizados funcionais",
            "Estrutura YAML dominada",
            "Biblioteca de comandos organizada"
          ],
          temNotas: true
        },
        {
          id: 4,
          title: "Prompt Engineering Avançado",
          description: "Técnicas avançadas para prompts eficazes",
          week: 4,
          hours: 10,
          deliverables: [
            "5 prompts otimizados documentados",
            "Templates de prompt com XML",
            "A/B testing de prompts"
          ],
          temNotas: true
        },
        {
          id: 5,
          title: "Integração com Git",
          description: "Automatizar workflows com controle de versão",
          week: 5,
          hours: 10,
          deliverables: [
            "Git hooks configurados",
            "Commits semânticos automatizados",
            "Pipeline de review automatizada"
          ],
          temNotas: true
        },
        {
          id: 6,
          title: "Workflows de Desenvolvimento",
          description: "Criar workflows completos e integrar ferramentas",
          week: 6,
          hours: 10,
          deliverables: [
            "Workflow TDD implementado",
            "Integração com VS Code",
            "Pipeline de documentação automática"
          ],
          temNotas: true
        }
      ]
    },
    {
      phase: 3,
      name: "Avançado",
      description: "Segurança, sistemas multi-agentes e documentação avançada",
      theme: "Pensando em sistemas e arquitetura",
      weeks: "7-9",
      modules: [
        {
          id: 7,
          title: "Segurança e Melhores Práticas",
          description: "Implementar segurança e framework MAESTRO",
          week: 7,
          hours: 10,
          deliverables: [
            "Framework MAESTRO implementado",
            "Auditoria de segurança aprovada",
            "Sistema de monitoramento ativo"
          ],
          temNotas: true
        },
        {
          id: 8,
          title: "Sistemas Multi-Agentes",
          description: "Orquestrar múltiplos agentes e gerenciar comunicação",
          week: 8,
          hours: 10,
          deliverables: [
            "Sistema multi-agente funcionando",
            "Comunicação inter-agente implementada",
            "Arquitetura distribuída documentada"
          ],
          temNotas: true
        },
        {
          id: 9,
          title: "Documentação como Código",
          description: "Geração automática e diagramas com código",
          week: 9,
          hours: 10,
          deliverables: [
            "Documentação auto-gerada",
            "Diagramas Mermaid.js funcionais",
            "Pipeline CI/CD para docs"
          ],
          temNotas: true
        }
      ]
    },
    {
      phase: 4,
      name: "Especialização",
      description: "Otimização, projetos reais e certificação",
      theme: "Expertise e contribuição para comunidade",
      weeks: "10-12",
      modules: [
        {
          id: 10,
          title: "Otimização e Performance",
          description: "Otimizar prompts, performance e reduzir custos",
          week: 10,
          hours: 10,
          deliverables: [
            "50% redução no uso de tokens",
            "Sistema de caching implementado",
            "Métricas de performance ativas"
          ],
          temNotas: true
        },
        {
          id: 11,
          title: "Projetos do Mundo Real",
          description: "Desenvolver projetos completos e funcionais",
          week: 11,
          hours: 10,
          deliverables: [
            "API REST completa funcionando",
            "Sistema de blog com autenticação",
            "CLI tool distribuível"
          ],
          temNotas: true
        },
        {
          id: 12,
          title: "Projeto Final e Certificação",
          description: "Projeto capstone e avaliação final",
          week: 12,
          hours: 10,
          deliverables: [
            "Projeto capstone aprovado",
            "Documentação completa",
            "Certificado Claude Code Specialist"
          ],
          temNotas: true
        }
      ]
    }
  ]
};