---
description: Build e deploy da aplicação
arguments:
  - name: environment
    required: true
    values: [local, staging, production]
  - name: version
    required: false
    default: latest
---

# Deploy to $ENVIRONMENT (version: $VERSION)

## 1. Pre-deployment Checks

### Verificar Testes
```bash
npm test -- --run
```

### Verificar Build
```bash
npm run build
```

### Verificar Vulnerabilidades
```bash
npm audit --audit-level=moderate
```

## 2. Build e Tag

{{#if ENVIRONMENT == "production"}}
### Build de Produção
```bash
# Build otimizado
npm run build

# Build Docker
docker build -t sistema-educacional:$VERSION .
docker tag sistema-educacional:$VERSION sistema-educacional:latest
```
{{else}}
### Build de Desenvolvimento
```bash
npm run build
docker build -t sistema-educacional:dev .
```
{{/if}}

## 3. Deploy

{{#if ENVIRONMENT == "local"}}
### Deploy Local com Docker
```bash
docker-compose down
docker-compose up -d
```
Verificar em http://localhost:80
{{/if}}

{{#if ENVIRONMENT == "staging"}}
### Deploy Staging
```bash
# Configurar para ambiente de staging
docker-compose -f docker-compose.staging.yml up -d
```
{{/if}}

{{#if ENVIRONMENT == "production"}}
### Deploy Produção
1. Backup do ambiente atual
2. Deploy com zero-downtime
3. Health checks
4. Smoke tests
5. Monitoramento ativo
{{/if}}

## 4. Post-deployment Validation

### Health Checks
- Verificar endpoints principais
- Testar funcionalidades críticas
- Monitorar logs de erro

### Rollback Plan
Se houver problemas:
```bash
docker-compose down
docker-compose up -d --force-recreate
```

## Checklist Final
- [ ] Testes passando
- [ ] Build sem erros
- [ ] Vulnerabilidades resolvidas
- [ ] Docker image criada
- [ ] Deploy realizado
- [ ] Health checks OK