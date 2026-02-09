import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Plataforma B2B Docs",
  description: "Central de Ajuda - Plataforma B2B de Treinamento Corporativo",

  // Base URL (ajustar se deploy em subpath)
  base: '/docs/',

  // Tema
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    siteTitle: 'Plataforma B2B',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guia', link: '/guide/getting-started' },
      { text: 'Desenvolvimento', link: '/development/tools' },
      { text: 'Deploy', link: '/deploy-docs/overview' },
      { text: 'Referencia', link: '/reference/cli-reference' },
      {
        text: 'Acessar Plataforma',
        link: '/'
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introducao',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'FAQ', link: '/guide/faq' }
          ]
        }
      ],
      '/development/': [
        {
          text: 'Desenvolvimento',
          items: [
            { text: 'Ferramentas', link: '/development/tools' },
            { text: 'Tasks mise', link: '/development/tasks' },
            { text: 'Configuracao', link: '/development/configuration' },
            { text: 'Hooks', link: '/development/hooks' },
            { text: 'Testes', link: '/development/testing' }
          ]
        }
      ],
      '/deploy-docs/': [
        {
          text: 'Deploy',
          items: [
            { text: 'Visao Geral', link: '/deploy-docs/overview' },
            { text: 'Fly.io', link: '/deploy-docs/flyio' },
            { text: 'CI/CD', link: '/deploy-docs/ci-cd' }
          ]
        }
      ],
      '/backend-docs/': [
        {
          text: 'Backend',
          items: [
            { text: 'Arquitetura', link: '/backend-docs/overview' },
            { text: 'NocoDB', link: '/backend-docs/nocodb' },
            { text: 'Database', link: '/backend-docs/database' }
          ]
        }
      ],
      '/users/': [
        {
          text: 'Guias por Perfil',
          items: [
            { text: 'Administrador', link: '/users/admin-guide' },
            { text: 'Instrutor', link: '/users/instructor-guide' },
            { text: 'Aluno', link: '/users/student-guide' },
            { text: 'Executivo', link: '/users/executive-guide' }
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Referencia',
          items: [
            { text: 'CLI', link: '/reference/cli-reference' },
            { text: 'RBAC', link: '/reference/rbac' },
            { text: 'i18n', link: '/reference/i18n' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/joaopelegrino/app-controle' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Plataforma B2B - Capacitação Técnica para sua Empresa',
      copyright: '© 2026 Plataforma B2B - Todos os direitos reservados'
    },

    editLink: {
      pattern: 'https://github.com/joaopelegrino/app-controle/edit/dev/docs/:path',
      text: 'Editar esta pagina no GitHub'
    },

    lastUpdated: {
      text: 'Atualizado em',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  },

  // Markdown config
  markdown: {
    lineNumbers: true
  },

  // Build config
  srcDir: '.',
  outDir: './.vitepress/dist',

  // Ignorar arquivos especificos
  srcExclude: [
    '**/backlog/**',
    '**/tecnico/**',
    '**/conceitual/**',
    '**/TEMPLATE-*.md',
    '**/README.md'
  ],

  // Head config
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }]
  ],

  // Ignorar dead links (localhost, relativos, prefixos /docs/)
  ignoreDeadLinks: [
    /^http:\/\/localhost/,
    /^\/docs\//,
    /^\.\.\//,      // Links relativos para fora do docs
    /^\.\//,        // Links relativos locais
    /\.md$/         // Links .md que nao existem
  ]
})
