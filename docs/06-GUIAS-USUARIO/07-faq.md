# FAQ

Perguntas frequentes sobre o app-controle.

---

## Instalacao e Setup

### Por que usar mise em vez de npm/yarn?

O projeto usa [mise](https://mise.jdx.dev) para garantir que todos os desenvolvedores usem as mesmas versoes de ferramentas. Isso evita o classico "funciona na minha maquina".

Alem disso, o mise gerencia nao apenas Node/npm, mas tambem:
- Bun (runtime principal)
- Python (scripts auxiliares)
- gitleaks (seguranca)
- CLI modernas (ripgrep, fd, etc.)

### Por que Bun em vez de npm?

**Velocidade**. Bun e 35x mais rapido que npm para instalacao de dependencias:

| Operacao | npm | Bun |
|----------|-----|-----|
| install | 45s | 1.3s |
| dev | 2.5s | 0.8s |

### O mise nao esta instalado. Como instalo?

```sh
# macOS/Linux
curl https://mise.run | sh

# Adicionar ao shell
echo 'eval "$(mise activate bash)"' >> ~/.bashrc  # ou zsh
source ~/.bashrc

# Verificar
mise --version
```

### As ferramentas nao estao sendo encontradas

```sh
# Verificar se mise esta ativo
mise doctor

# Reinstalar ferramentas
mise install --force
```

---

## Backend (NocoDB)

### O NocoDB nao inicia. O que fazer?

1. **Verificar Docker**:
```sh
docker --version
docker ps
```

2. **Verificar se Docker Desktop esta rodando** (Windows/macOS)

3. **Verificar portas**:
```sh
lsof -i :5432  # PostgreSQL
lsof -i :8081  # NocoDB
```

4. **Reiniciar containers**:
```sh
mise nocodb:restart
```

### Como resetar o banco de dados?

```sh
mise nocodb:reset
```

::: warning Acao Destrutiva
Isso deleta TODOS os dados. Use apenas em desenvolvimento.
:::

### Qual a senha do NocoDB?

- **Email**: admin@trainb2b.local
- **Senha**: Admin@TrainB2B2026!

### Os dados de demo sumiram

Os dados sao carregados automaticamente ao iniciar o NocoDB pela primeira vez. Se sumiram:

```sh
mise nocodb:reset  # Reseta e recarrega dados
```

---

## Frontend

### A porta 3001 ja esta em uso

O Vite automaticamente tenta a proxima porta disponivel. Verifique o output do `mise dev`.

Para forcar uma porta especifica:

```sh
VITE_PORT=3002 mise dev
```

### Os estilos nao estao aparecendo

```sh
# Limpar cache
mise clean

# Reinstalar
mise fresh
```

### Erro "Module not found"

```sh
# Reinstalar dependencias
bun install
```

---

## Testes

### Os testes E2E falham

1. **Verificar se dev server esta rodando**:
```sh
mise dev  # Em outro terminal
```

2. **Verificar se NocoDB esta rodando**:
```sh
mise nocodb:health
```

3. **Reinstalar browsers**:
```sh
mise e2e:install
```

### Como rodar apenas um teste?

```sh
# Vitest
bun run test nome-do-teste

# Playwright
npx playwright test auth.spec.ts
```

### Os testes passam localmente mas falham no CI

Verifique se o CI tem as mesmas versoes de ferramentas. O projeto usa mise para garantir isso:

```yaml
- uses: jdx/mise-action@v2
```

---

## Deploy

### Como fazer deploy?

```sh
# Verificar pre-requisitos
mise deploy:check

# Deploy
mise deploy:prod
```

### O deploy falhou

1. **Verificar autenticacao**:
```sh
flyctl auth login
```

2. **Verificar se app existe**:
```sh
flyctl apps list
```

3. **Ver logs**:
```sh
mise deploy:logs
```

### Como pausar a app para economizar?

```sh
mise deploy:suspend
```

Para reativar:

```sh
mise deploy:resume
```

---

## Autenticacao

### Esqueci a senha de demo

Todas as contas de demo usam a mesma senha: `Demo@2026`

### O login falha mesmo com credenciais corretas

1. **Limpar localStorage**:
```javascript
localStorage.clear()
```

2. **Verificar se NocoDB esta rodando**:
```sh
mise nocodb:health
```

3. **Verificar token**:
O token JWT pode ter expirado. Faca logout e login novamente.

### Como criar um novo usuario?

Via interface:
1. Login como admin
2. Acessar /admin
3. Clicar em "Novo Usuario"

Via API:
```javascript
await apiService.createUser({
  email: 'novo@email.com',
  name: 'Novo Usuario',
  role: 'student',
  company_id: 1,
});
```

---

## Internacionalizacao (i18n)

### Como mudar o idioma?

Clique no seletor de idioma no canto superior direito da tela de login ou no header.

### Idiomas disponiveis

- Portugues (Brasil)
- English
- Espanol

### Como adicionar um novo idioma?

1. Criar pasta em `public/locales/<codigo>/`
2. Copiar arquivos JSON de `pt-BR/`
3. Traduzir strings
4. Adicionar codigo em `src/i18n/config.js`

### Credenciais do Especialista (Hub)

Para testar o perfil de especialista:
- **Email**: joao.silva.specialist@plataformab2b.com
- **Senha**: Demo@2026
- **Acesso**: `/specialist`

---

## Performance

### O dev server esta lento

```sh
# Limpar cache do Vite
rm -rf node_modules/.vite

# Reiniciar
mise dev
```

### O build esta lento

```sh
# Verificar se esta usando Bun
which bun

# Se estiver usando npm por engano
mise dev  # Usa Bun automaticamente
```

---

## Seguranca

### Como verificar secrets no codigo?

```sh
mise security:scan
```

### O gitleaks encontrou um falso positivo

Adicione ao `.gitleaks.toml`:

```toml
[[rules]]
description = "Ignorar senha de demo"
regex = '''Demo@2026'''
```

---

## Outros

### Onde fica a documentacao?

```sh
mise docs
```

Ou navegue diretamente:
- `docs/guide/` - Guias gerais
- `docs/development/` - Desenvolvimento
- `docs/users/` - Guias por perfil

### Como reportar um bug?

Abra uma issue em:
https://github.com/joaopelegrino/app-controle/issues

### Como contribuir?

1. Fork o repositorio
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commite: `git commit -m "feat: minha feature"`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request

::: info Precisa de mais ajuda?
- Execute `mise check` para diagnosticar problemas
- Veja os logs: `mise nocodb:logs`
- Consulte a documentacao completa em `/docs`
:::
