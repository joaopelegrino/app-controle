# Problema: Porta 8080 Ocupada

**Data:** 2026-01-22  
**Branch:** demo-nocodb-simple  
**Status:** ⚠️ NocoDB NÃO está rodando  

---

## 🔴 Problema Identificado

### 1. Porta 8080 Ocupada por Aplicação Java

```bash
# Processo na porta 8080
COMMAND   PID     USER   FD   TYPE
java    13162 notebook      TCP *:8080 (LISTEN)
```

**Aplicação:** Processo Java (provavelmente de outro projeto)  
**PID:** 13162  
**Usuário:** notebook  

---

### 2. Docker Não Disponível no WSL2

```
The command 'docker' could not be found in this WSL 2 distro.
We recommend to activate the WSL integration in Docker Desktop settings.
```

**Problema:** Docker Desktop não está integrado com WSL2  
**Impacto:** NocoDB não pode iniciar (depende de Docker)

---

## 🔍 Diagnóstico

### O que está funcionando

| Componente | Status |
|------------|--------|
| **Frontend :3000** | ✅ RODANDO |
| **mise v2** | ✅ APLICADO |
| **node_modules** | ✅ OK |

### O que NÃO está funcionando

| Componente | Status | Motivo |
|------------|--------|--------|
| **Docker** | ❌ NÃO DISPONÍVEL | Não integrado com WSL2 |
| **NocoDB :8080** | ❌ NÃO RODANDO | Docker indisponível + porta ocupada |
| **PostgreSQL** | ❌ NÃO RODANDO | Docker indisponível |

---

## 🛠️ Soluções Propostas

### Solução 1: Parar Aplicação Java + Configurar Docker ✅ RECOMENDADO

**Vantagens:**
- Usa porta padrão 8080
- Documentação existente funciona sem alterações
- Alinhado com configuração original

**Passos:**

#### 1.1. Parar Aplicação Java

```bash
# Ver detalhes do processo
ps -p 13162 -f

# Parar processo
kill 13162

# Verificar se parou
lsof -i :8080
```

#### 1.2. Configurar Docker Desktop no WSL2

**No Windows (Docker Desktop):**

1. Abrir Docker Desktop
2. Settings → Resources → WSL Integration
3. Ativar integração com "Ubuntu" (ou sua distro WSL)
4. Apply & Restart

**No WSL2 (verificar):**

```bash
# Verificar se docker ficou disponível
docker --version

# Testar
docker ps
```

#### 1.3. Iniciar NocoDB

```bash
cd /home/notebook/workspace/app-controle
mise nocodb:setup
```

---

### Solução 2: Mudar Porta do NocoDB para 8081

**Vantagens:**
- Não precisa parar aplicação Java
- Mais rápido (se Docker já estiver configurado)

**Desvantagens:**
- Precisa atualizar toda documentação
- URLs mudam para :8081

**Passos:**

#### 2.1. Editar docker-compose.nocodb.yml

```yaml
# Linha 88 (aproximadamente)
ports:
  - "8081:8080"  # Mudar de 8080:8080 para 8081:8080
```

#### 2.2. Atualizar variáveis de ambiente

```bash
# .mise.toml - mudar NOCODB_URL
NOCODB_URL = "http://localhost:8081"
```

#### 2.3. Iniciar NocoDB

```bash
cd /home/notebook/workspace/app-controle
mise nocodb:setup
```

**Nova URL:** http://localhost:8081

---

### Solução 3: Usar Docker em Outra Máquina/VM

**Quando usar:**
- Não pode configurar Docker Desktop
- Quer manter aplicação Java rodando
- Ambiente de produção/staging remoto

**Não recomendado para desenvolvimento local.**

---

## 🎯 Recomendação: Solução 1

**Motivos:**
1. ✅ Usa configuração padrão (porta 8080)
2. ✅ Documentação existente permanece válida
3. ✅ Alinhado com docker-compose.nocodb.yml
4. ✅ Alinhado com LOCALHOST-ACESSO.md

**Custo:**
- Parar aplicação Java (reversível com restart)
- Configurar Docker Desktop (1 vez, 2 minutos)

---

## 📋 Checklist Solução 1

### Passo 1: Identificar Aplicação Java

```bash
# Ver comando completo
ps -p 13162 -f

# Ver diretório
pwdx 13162

# Ver JARs abertos
lsof -p 13162 | grep jar
```

**Anotar:** Qual projeto está usando porta 8080

---

### Passo 2: Parar Aplicação Java

```bash
# Parar processo
kill 13162

# Verificar se parou
lsof -i :8080 || echo "Porta 8080 livre"
```

---

### Passo 3: Configurar Docker Desktop

**No Windows:**
1. Abrir Docker Desktop
2. Settings (⚙️)
3. Resources → WSL Integration
4. ✅ Enable integration with my default WSL distro
5. ✅ Ubuntu (ou sua distro)
6. Apply & Restart

**Aguardar:** ~30 segundos

---

### Passo 4: Verificar Docker no WSL2

```bash
# No terminal WSL2
docker --version
# Deve mostrar: Docker version X.Y.Z

docker ps
# Deve mostrar: CONTAINER ID... (vazio, sem erro)
```

---

### Passo 5: Iniciar NocoDB

```bash
cd /home/notebook/workspace/app-controle

# Setup completo
mise nocodb:setup

# Aguardar ~30 segundos

# Verificar
mise nocodb:health
```

**Resultado esperado:**
```
✅ Containers rodando
✅ PostgreSQL: OK
✅ NocoDB: OK (http://localhost:8080)
✅ Dados seed: 7 usuários carregados
```

---

### Passo 6: Testar Acesso

```bash
# No navegador
http://localhost:8080

# Login:
# Email: admin@ultrathink.com
# Senha: UltraThink@Admin2026!
```

---

## 🔄 Como Reverter (Se Necessário)

### Reiniciar Aplicação Java

```bash
# Ir para o diretório da aplicação Java
cd <diretório-da-aplicacao-java>

# Reiniciar aplicação (comando varia)
# Exemplos:
java -jar aplicacao.jar
# ou
./start.sh
# ou
make run
```

### Parar NocoDB

```bash
cd /home/notebook/workspace/app-controle
mise nocodb:stop
```

---

## 📝 Status Atual

| Item | Status | Ação Necessária |
|------|--------|-----------------|
| Porta 8080 | ❌ Ocupada (Java) | Parar processo 13162 |
| Docker WSL2 | ❌ Não integrado | Configurar Docker Desktop |
| NocoDB | ❌ Não rodando | Depende dos 2 acima |
| Frontend | ✅ OK | Nenhuma |

---

## 🎯 Próximos Passos

**Se você quer NocoDB rodando:**

1. Verificar qual projeto está na porta 8080
2. Decidir se pode parar temporariamente
3. Configurar Docker Desktop WSL2 Integration
4. Executar `mise nocodb:setup`

**Se você quer manter Java rodando:**

1. Usar Solução 2 (mudar para porta 8081)
2. Configurar Docker Desktop WSL2 Integration
3. Editar docker-compose.nocodb.yml
4. Executar `mise nocodb:setup`

---

**Qual solução você prefere?**

- **Solução 1:** Parar Java + usar porta 8080 (recomendado)
- **Solução 2:** Manter Java + usar porta 8081

---

**Criado por:** Droid  
**Data:** 2026-01-22  
**Status:** Aguardando decisão
