# Guia do Administrador

Bem-vindo ao guia para **Administradores** da plataforma de treinamento. Este guia cobre todas as funcionalidades disponiveis para gerenciar usuarios, cursos e acompanhar metricas.

## Visao Geral

Como Administrador, voce tem acesso a:

- **Dashboard Administrativo** - Visao geral de usuarios e cursos
- **Gestao de Usuarios** - Criar, editar, desativar usuarios
- **Gestao de Cursos** - Criar, editar, arquivar cursos
- **Matriculas** - Matricular usuarios em cursos
- **Exportacao** - Exportar relatorios em Excel/JSON
- **Analytics** - Metricas de engajamento e conclusao

---

## Acessando o Painel

1. Acesse a plataforma em https://trainb2b-demo.fly.dev (ou http://localhost:3001 local)
2. Faca login com suas credenciais de administrador
3. Clique em **"Admin"** no menu superior ou acesse `/admin`

::: tip Credenciais de Demo
Email: `admin@acmetech.com`
Senha: `Demo@2026`
:::

---

## Dashboard Administrativo

Ao acessar `/admin`, voce vera:

### Metricas Principais

- **Total de Usuarios** - Quantidade de usuarios ativos
- **Taxa de Conclusao** - Media de conclusao dos cursos
- **Cursos Ativos** - Quantidade de cursos disponiveis
- **Matriculas Recentes** - Ultimas matriculas

### Lista de Usuarios

Tabela com todos os usuarios da empresa:

| Coluna | Descricao |
|--------|-----------|
| Nome | Nome completo do usuario |
| Email | Email de acesso |
| Perfil | student, instructor, admin |
| Status | Ativo ou Inativo |
| Progresso | Percentual de conclusao |
| Acoes | Editar, Desativar |

---

## Gestao de Usuarios

### Criar Novo Usuario

1. Clique no botao **"Novo Usuario"**
2. Preencha os campos:
   - **Nome** - Nome completo
   - **Email** - Email corporativo
   - **Perfil** - Selecione o tipo de acesso
   - **Senha** - Sera gerada automaticamente ou definida
3. Clique em **"Criar"**

### Perfis Disponiveis

| Perfil | Acesso | Uso |
|--------|--------|-----|
| **Aluno** | Cursos e dashboard proprio | Colaboradores em treinamento |
| **Instrutor** | + Dashboard da equipe | Lideres tecnicos, mentores |
| **Admin** | + Gestao de usuarios/cursos | RH, T&D, gestores |

### Editar Usuario

1. Encontre o usuario na lista
2. Clique no icone de **editar** (lapiz)
3. Modifique os campos desejados
4. Clique em **"Salvar"**

### Desativar Usuario

1. Encontre o usuario na lista
2. Clique no icone de **desativar** (lixeira)
3. Confirme a acao no modal

::: warning Atencao
Usuarios desativados nao sao deletados. Seus dados e progresso sao preservados. Para reativar, contate o suporte.
:::

---

## Gestao de Cursos

### Criar Novo Curso

1. Clique no botao **"Novo Curso"**
2. Preencha os campos:
   - **Nome** - Titulo do curso
   - **Descricao** - Resumo do conteudo
   - **Icone** - Emoji representativo
   - **Dificuldade** - Iniciante, Intermediario, Avancado
   - **Duracao** - Tempo estimado em horas
3. Clique em **"Criar"**

### Editar Curso

1. Encontre o curso na lista
2. Clique no icone de **editar** (lapiz)
3. Modifique os campos desejados
4. Clique em **"Salvar"**

### Arquivar Curso

1. Encontre o curso na lista
2. Clique no icone de **arquivar**
3. Confirme a acao

Cursos arquivados:
- Nao aparecem para novos alunos
- Alunos matriculados podem continuar
- Podem ser reativados posteriormente

---

## Matriculas

### Matricular Usuario

1. Va para a aba **"Matriculas"** ou clique em um curso
2. Clique em **"Matricular Usuario"**
3. Selecione o usuario da lista
4. Selecione o curso
5. Clique em **"Matricular"**

### Matricula em Lote

1. Clique em **"Matricula em Lote"**
2. Selecione multiplos usuarios (Ctrl+Click)
3. Selecione o curso
4. Clique em **"Matricular Selecionados"**

### Cancelar Matricula

1. Encontre a matricula na lista
2. Clique em **"Cancelar"**
3. Confirme a acao

---

## Exportacao de Relatorios

### Exportar Usuarios

1. Va para a lista de usuarios
2. Clique em **"Exportar"**
3. Selecione o formato (Excel ou JSON)
4. O arquivo sera baixado automaticamente

### Dados Exportados

| Campo | Descricao |
|-------|-----------|
| Nome | Nome do usuario |
| Email | Email |
| Perfil | Tipo de acesso |
| Cursos Matriculados | Quantidade |
| Progresso Medio | Percentual |
| Ultimo Acesso | Data/hora |

### Exportar Analytics

1. Va para a aba **"Analytics"**
2. Clique em **"Exportar Relatorio"**
3. Selecione o periodo
4. Escolha o formato

---

## Analytics

### Metricas Disponiveis

| Metrica | Descricao |
|---------|-----------|
| Taxa de Conclusao | % de alunos que terminaram cursos |
| Tempo Medio | Tempo medio para conclusao |
| Modulos Dificeis | Modulos com mais abandono |
| Engajamento | Acessos por dia/semana |

### Filtrando Dados

- **Por Periodo** - Ultima semana, mes, trimestre
- **Por Curso** - Selecione um curso especifico
- **Por Usuario** - Veja progresso individual

---

## Permissoes do Administrador

| Permissao | Admin | C-Level |
|-----------|-------|---------|
| Ver usuarios | ✅ | ✅ |
| Criar usuarios | ✅ | ✅ |
| Editar usuarios | ✅ | ✅ |
| Desativar usuarios | ✅ | ✅ |
| Ver cursos | ✅ | ✅ |
| Criar cursos | ✅ | ✅ |
| Arquivar cursos | ✅ | ✅ |
| Exportar dados | ✅ | ✅ |
| Dashboard executivo | ❌ | ✅ |

---

## Boas Praticas

### Gestao de Usuarios

1. **Use emails corporativos** - Facilita identificacao
2. **Defina perfis corretos** - Evite dar mais acesso que necessario
3. **Revise periodicamente** - Desative usuarios inativos
4. **Monitore progresso** - Identifique quem precisa de ajuda

### Gestao de Cursos

1. **Nomes claros** - Evite abreviacoes
2. **Descricoes completas** - Ajuda na escolha
3. **Atualize periodicamente** - Conteudo desatualizado desmotiva
4. **Archive em vez de deletar** - Preserve historico

### Relatorios

1. **Exporte semanalmente** - Mantenha historico
2. **Compartilhe metricas** - Transparencia motiva
3. **Identifique padroes** - Modulos dificeis precisam revisao

---

## Perguntas Frequentes

### Como resetar senha de usuario?

1. Edite o usuario
2. Clique em "Resetar Senha"
3. Nova senha sera enviada por email

### Posso deletar um usuario permanentemente?

Nao. Por questoes de auditoria, usuarios sao desativados, nao deletados. Contate o suporte para casos especiais.

### Como ver historico de um usuario?

1. Clique no usuario na lista
2. Va para a aba "Historico"
3. Veja todas as acoes e progresso

### O que acontece quando desativo um usuario?

- Perde acesso a plataforma
- Dados e progresso preservados
- Pode ser reativado a qualquer momento
- Licenca liberada para outro usuario

---

## Suporte

Precisa de ajuda?

- **Email**: suporte@trainb2b.com
- **Chat**: Icone no canto inferior direito
- **Documentacao**: https://docs.trainb2b.com
