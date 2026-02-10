---
titulo: Atualizar Estrutura do Projeto
versao: 2
data: 2026-02-10
projeto: app-controle
saida: estrutura.md
---

# Atualizar Estrutura do Projeto

Gerar o project context map atualizado do projeto em `estrutura.md`. Este documento serve como bootstrap context para LLMs e desenvolvedores navegarem o projeto.

---

## Execucao Automatica (Instrucoes para Claude)

Ao ser invocado via `/atualizar-estrutura`, Claude DEVE:

1. **Capturar a arvore real** executando `tree --all` no projeto
2. **Processar** aplicando as regras de filtragem abaixo
3. **Escrever** o resultado em `estrutura.md` na raiz do projeto
4. **Validar** que todos os itens da raiz estao presentes (direto ou em "Omitidos")
5. **Reportar** metricas finais (linhas antes/depois, contagem de itens)

---

## Regras de Processamento

### PRESERVAR na integra (listar cada arquivo individualmente com descricao):
- Todos os arquivos na raiz do projeto (configs, docs, dotfiles)
- `src/` completo ate o nivel de arquivo — cada .jsx, .js com descricao funcional
- `database/` completo — cada .sql com descricao
- `public/` completo — listar namespaces i18n
- `scripts/` e `templates/` completo
- `.github/workflows/` com nomes de arquivos
- `.claude/` com todos subdiretorio e arquivos
- `.factory/` com todos subdiretorios e arquivos
- `docs/` com todos subdiretorios e arquivos .md listados por nome
- `contextos/` com estrutura de subpastas
- `documentacao-interna/` com subdiretorios (marcar vazios)
- `.vscode/` com arquivos

### OMITIR completamente (listar na secao "Omitidos" com descricao):
- `node_modules/` e todo conteudo
- `.git/` e todo conteudo
- `dist/` e todo conteudo (artefatos de build)
- `docs/.vitepress/cache/` e `docs/.vitepress/dist/` (cache/build VitePress)
- `.claude-backup-*` (backups antigos)
- `historico/checkpoints/` se vazio
- Caminhos duplicados/artefatos (ex: `home/notebook/...`)
- Arquivos temporarios de analise (ex: `.mise.toml.*` variantes)

Na secao "Omitidos", listar cada item omitido com:
- Nome exato ou pattern (ex: `.mise.toml.*`)
- Contagem de arquivos quando for pattern
- Nomes completos entre parenteses quando forem poucos (< 10)
- Descricao do que contem

### NUNCA:
- Inventar descricoes de funcionalidades nao evidentes pelo nome do arquivo
- Incluir conteudo de arquivos (apenas nomes + descricao por nomenclatura)
- Omitir arquivos sem listar na secao "Omitidos"
- Errar contagens (conferir manualmente antes de escrever)

---

## Formato de Saida (estrutura.md)

```markdown
# Sumario do Projeto: App-Controle

## Visao Geral
[2-3 frases: tipo de app, stack principal, features-chave. Baseado APENAS na estrutura.]

## Stack Identificada
[Lista de tecnologias identificaveis pelos arquivos de config]

## Estrutura Principal
\```
.
│
│ ── SECAO ─────────────────
│
├── arquivo.ext                         # Descricao breve
├── pasta/
│   ├── subpasta/                       #   N arquivos: descricao
│   │   ├── arquivo1.ext                #     Descricao
...
\```

## Pontos de Entrada
- `path/file` -- descricao

## Observacoes para Navegacao
- Bullets com dicas de como navegar o projeto

## Omitidos deste sumario (artefatos gerados/transitorios)
- `pasta/` -- descricao (N arquivos/linhas)
```

### Secoes dentro da arvore (separar visualmente):

| Secao | Conteudo |
|-------|----------|
| CONFIGURACAO (raiz) | Configs de build, deploy, env, dotfiles |
| DOCUMENTOS (raiz) | READMEs, guias, docs standalone |
| CODIGO-FONTE | `src/` completo |
| ASSETS PUBLICOS | `public/` |
| BANCO DE DADOS | `database/` |
| SCRIPTS E TEMPLATES | `scripts/`, `templates/` |
| CI/CD | `.github/` |
| DOCUMENTACAO | `docs/` |
| CLAUDE CODE CONFIG | `.claude/` |
| FACTORY | `.factory/` |
| DOCUMENTACAO INTERNA | `documentacao-interna/` |
| CONTEXTOS LLM | `contextos/` |
| IDE | `.vscode/` |

---

## Validacao (OBRIGATORIA antes de finalizar)

Claude DEVE executar esta validacao:

```bash
# 1. Listar todos itens reais da raiz
ls -1a | grep -v '^\.\.$' | grep -v '^\.$' | sort > /tmp/real_root.txt

# 2. Verificar cada item contra estrutura.md
while IFS= read -r item; do
  if ! grep -qF "$item" estrutura.md; then
    echo "FALTANDO: $item"
  fi
done < /tmp/real_root.txt
```

**Criterio:** Zero itens faltando. Se algum aparecer, corrigir antes de finalizar.

---

## Metricas do Relatorio Final

Ao terminar, Claude DEVE reportar:

| Metrica | Valor |
|---------|-------|
| Arvore original | N linhas |
| Sumario gerado | N linhas (~N KB) |
| Reducao | N% |
| Itens raiz cobertos | N/N (100%) |
| `src/` arquivos listados | N/N |

---

## Quando Usar

- Apos criar/remover/renomear arquivos ou pastas
- Apos adicionar novas dependencias significativas
- No inicio de sprint (manter contexto atualizado)
- Antes de compartilhar projeto com novo dev ou LLM

---

*Criado: 2026-02-10 | Versao: 2*
*Saida: estrutura.md (raiz do projeto)*
