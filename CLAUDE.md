# Sistema Educacional Completo - Contexto para Claude Code

## 🎯 Visão Geral
Sistema educacional interativo focado em tecnologia, com flash cards 3D, vídeos integrados e trilhas de aprendizado estruturadas.

## 🛠️ Stack Tecnológica
- **Frontend**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **Markdown**: React Markdown 10.1.0
- **Testing**: Vitest + Testing Library
- **Container**: Docker com Nginx Alpine

## 📁 Estrutura do Projeto
```
app-controle/
├── src/
│   ├── components/      # 17 componentes React
│   │   ├── SistemaEducacionalCompleto.jsx  # Componente principal
│   │   ├── HubView.jsx                     # Página inicial
│   │   ├── LearningPathView.jsx            # Trilhas de aprendizado
│   │   ├── FlashcardModal.jsx              # Cards 3D interativos
│   │   ├── CLearningSystem.jsx             # Sistema C
│   │   ├── RustLearningSystem.jsx          # Sistema Rust
│   │   ├── BashLearningSystem.jsx          # Sistema Bash
│   │   ├── VSCodeLearningSystem.jsx        # Sistema VSCode
│   │   ├── ClaudeCodeLearningSystem.jsx    # Sistema Claude Code
│   │   └── AreaCard.jsx                    # Componente reutilizável
│   ├── data/            # Dados estruturados
│   │   └── studyAreas.js                   # 12 áreas de estudo
│   ├── utils/           # Utilitários
│   └── tests/           # Testes automatizados
├── dist/                # Build de produção
├── docker-compose.yml   # Orquestração Docker
├── Dockerfile          # Multi-stage build
├── nginx.conf          # Configuração otimizada
└── vite.config.js      # Build sem sourcemaps

```

## 📊 Métricas do Sistema
- **12 Áreas de Estudo**: Bash, Linux, Servidores, DevOps, etc.
- **4 Sistemas Integrados**: C, Rust, Bash, VSCode
- **107+ Módulos**: Conteúdo estruturado
- **60+ Flash Cards**: Aprendizado interativo
- **390+ Horas**: Conteúdo educacional

## 🔧 Comandos Principais
```bash
# Desenvolvimento
npm run dev          # Servidor local porta 3000
npm run build        # Build de produção
npm run preview      # Preview da build

# Testes
npm test            # Rodar testes com Vitest
npm run test:ui     # Interface visual de testes
npm run test:coverage # Relatório de cobertura

# Docker
docker-compose up -d  # Subir container
docker-compose down   # Parar container
```

## 🎨 Padrões e Convenções

### Código
- **Componentes**: PascalCase, funcionais com hooks
- **Arquivos**: camelCase para JS/JSX
- **CSS**: Tailwind utility-first
- **Estado**: useState e useEffect do React
- **Props**: Destructuring na assinatura

### Git
- **Branch principal**: desenvolvimento
- **Commits**: Convencionais (feat, fix, docs, etc.)
- **PR**: Sempre com review antes do merge

### Qualidade
- **Sem console.log** em produção (removidos no build)
- **Sem sourcemaps** em produção (segurança)
- **Code splitting** configurado (react-vendor, ui-vendor)
- **Minificação** com Terser

## 🔒 Segurança
- **Headers CSP** configurados no nginx
- **HTTPS ready** com headers de segurança
- **Sem exposição de secrets** verificado
- **localStorage** apenas para dados não sensíveis

## 🚀 Estado Atual
- ✅ Build funcionando sem erros
- ✅ Docker configurado para produção
- ✅ CI/CD com GitHub Actions
- ✅ Testes básicos implementados
- ⚠️ Vulnerabilidade npm: esbuild (moderate) - requer atualização

## 📝 TODOs Prioritários
1. Atualizar Vite para v7+ (resolver vulnerabilidade)
2. Implementar autenticação e backend API
3. Aumentar cobertura de testes para 80%+
4. Adicionar TypeScript para type safety
5. Implementar Context API para estado global

## 🤖 Regras para Claude Code

### SEMPRE
- Verificar arquivo antes de editar com Read
- Usar comandos npm para testes e build
- Manter código limpo sem console.log
- Seguir padrões Tailwind existentes
- Preservar funcionalidades existentes

### NUNCA
- Criar arquivos desnecessários
- Adicionar comentários no código (exceto JSDoc se necessário)
- Usar jQuery ou bibliotecas não instaladas
- Modificar configurações de build sem necessidade
- Commitar sem rodar testes

### AO DEBUGAR
1. Verificar console do browser primeiro
2. Checar Network tab para requisições
3. Validar props dos componentes
4. Testar em diferentes tamanhos de tela
5. Verificar localStorage para persistência

## 🎯 Contexto de Aprendizado
Este é um projeto de **estudo e aprendizado** do usuário João, nível iniciante em programação. O objetivo é aprender conceitos práticos de:
- React e componentes
- Docker e containerização
- CI/CD e automação
- Testes automatizados
- Boas práticas de desenvolvimento

Explicações devem ser:
- Claras e didáticas
- Com exemplos práticos
- Focadas no "porquê" além do "como"
- Em português brasileiro

## 📚 Links Úteis
- [Documentação React](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---
*Última atualização: Janeiro 2025*
*Projeto: Sistema Educacional Completo v2.0*