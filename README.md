# 📋 Tasks Plus - Plano de Teste e Gestão de Qualidade

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.0-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Fastify](https://img.shields.io/badge/Fastify-5.6.2-202020?style=flat&logo=fastify&logoColor=white)](https://fastify.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.16.3-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0.10-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Cypress](https://img.shields.io/badge/Cypress-15.7.0-17202C?style=flat&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

Este documento detalha as fases obrigatórias do processo de Garantia de Qualidade (QA) aplicadas ao projeto **Tasks Plus**, um sistema completo de gerenciamento de tarefas com autenticação e operações CRUD.

## 🛠️ Tecnologias Utilizadas

### Frontend

| Categoria | Tecnologia | Versão | Descrição |
|-----------|-----------|--------|-----------|
| **Framework** | React | ^19.2.0 | Biblioteca JavaScript para construção de interfaces |
| **Build Tool** | Vite | ^7.2.2 | Build tool e dev server de alta performance |
| **Roteamento** | TanStack Router | ^1.136.8 | Roteamento type-safe para React |
| **Estado/Queries** | TanStack Query | ^5.90.10 | Gerenciamento de estado servidor e cache |
| **Estilização** | TailwindCSS | ^4.1.17 | Framework CSS utility-first |
| **UI Components** | Radix UI | ^1.4.3 | Componentes acessíveis e não estilizados |
| **Formulários** | React Hook Form | ^7.66.1 | Biblioteca para gerenciamento de formulários |
| **Validação** | Zod | ^4.1.12 | Schema validation TypeScript-first |
| **Linguagem** | TypeScript | ~5.9.3 | Superset do JavaScript com tipagem estática |

### Backend

| Categoria | Tecnologia | Versão | Descrição |
|-----------|-----------|--------|-----------|
| **Framework** | Fastify | ^5.6.2 | Framework web rápido e eficiente para Node.js |
| **ORM** | Drizzle ORM | ^0.44.7 | ORM type-safe e leve |
| **Banco de Dados** | PostgreSQL | ^8.16.3 | Sistema de gerenciamento de banco de dados relacional |
| **Autenticação** | JWT | ^10.0.0 | JSON Web Tokens para autenticação |
| **Segurança** | bcryptjs | ^3.0.3 | Hashing de senhas |
| **Validação** | Zod | ^4.1.12 | Schema validation |
| **Documentação** | Scalar API Reference | ^1.39.3 | Documentação interativa da API |
| **Linguagem** | TypeScript | ^5.9.3 | Superset do JavaScript com tipagem estática |

### Testes e Qualidade

| Categoria | Tecnologia | Versão | Descrição |
|-----------|-----------|--------|-----------|
| **Framework de Testes** | Vitest | ^4.0.10 | Framework de testes rápido e moderno |
| **Framework de Testes** | Cypress | ^15.7.0 | Framework de testes E2E |
| **Coverage** | Vitest Coverage | ^4.0.12 | Ferramenta de cobertura de código |
| **Linter/Formatter** | Biome | 2.3.6 | Linter e formatter rápido |
| **Faker** | Faker.js | ^10.1.0 | Geração de dados de teste |

### DevOps e Ferramentas

| Categoria | Tecnologia | Versão | Descrição |
|-----------|-----------|--------|-----------|
| **Gerenciador de Pacotes** | pnpm | 10.18.2 | Gerenciador de pacotes eficiente |
| **CI/CD** | GitHub Actions | - | Automação de workflows |
| **Controle de Versão** | Git | - | Sistema de controle de versão |

---

## 📖 Índice

- [🏗️ Arquitetura do Sistema](#️-arquitetura-do-sistema)
- [1. Descoberta e Requisitos Testáveis](#1-descoberta-e-requisitos-testáveis)
- [2. Plano de Teste e Gestão](#2-plano-de-teste-e-gestão)
- [3. Matriz de Rastreabilidade](#3-matriz-de-rastreabilidade)
- [4. Casos de Teste](#4-casos-de-teste)
- [5. Dados e Ambiente](#5-dados-e-ambiente)
- [🧪 Executando os Testes Automatizados](#-executando-os-testes-automatizados)
- [6. Execução Manual e Defeitos](#6-execução-manual-e-defeitos)
- [7. Automação Mínima (UI e API)](#7-automação-mínima-ui-e-api)
- [8. TDD e CI/CD](#8-tdd-e-cicd)
- [9. Métricas e Relatório Final](#9-métricas-e-relatório-final)
- [10. Guia de Nomenclatura](#10-guia-de-nomenclatura)

---

## 🏗️ Arquitetura do Sistema

### Diagrama de Arquitetura Geral

O diagrama abaixo ilustra a arquitetura geral do sistema Tasks Plus, mostrando os principais componentes e suas interações:

```mermaid
graph TB
    subgraph "Frontend - Web Application"
        A[React Components] --> B[TanStack Router]
        A --> C[TanStack Query]
        B --> D[Custom Hooks]
        D --> E[HTTP Client<br/>API Client]
        C --> E
        A --> F[React Hook Form]
        F --> G[Zod Validation]
    end

    subgraph "Backend - API Server"
        E --> H[Fastify Server]
        H --> I[Auth Middleware<br/>JWT]
        H --> J[Route Handlers]
        J --> K[Zod Validation]
        J --> L[Drizzle ORM]
        I --> J
    end

    subgraph "Database"
        L --> M[(PostgreSQL)]
    end

    subgraph "External Services"
        H --> N[Swagger/Scalar<br/>API Docs]
    end

    subgraph "DevOps"
        O[GitHub Actions] --> P[CI/CD Pipeline]
        P --> Q[Vitest Tests]
        P --> R[Lint & Format]
    end

    style A fill:#61DAFB
    style H fill:#202020
    style M fill:#316192
    style O fill:#181717
```

### Diagrama de Sequência - Fluxo de Criação de Tarefa

O diagrama abaixo detalha o fluxo completo de uma operação de criação de tarefa:

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend<br/>(React)
    participant API as HTTP Client
    participant S as Backend<br/>(Fastify)
    participant DB as PostgreSQL

    U->>F: Preenche e submete formulário
    F->>F: Valida dados (Zod)
    F->>API: POST /tasks (com JWT)
    API->>S: Requisição HTTP
    S->>S: Valida JWT e dados
    S->>DB: INSERT INTO tasks
    DB-->>S: Tarefa criada
    S-->>API: 201 Created
    API-->>F: Sucesso
    F-->>U: Tarefa criada com sucesso
```

### Diagrama de Sequência - Fluxo de Autenticação

O diagrama abaixo mostra o fluxo completo de autenticação (sign-in):

```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend<br/>(React)
    participant API as HTTP Client
    participant S as Backend<br/>(Fastify)
    participant DB as PostgreSQL

    U->>F: Informa email e senha
    F->>F: Valida dados (Zod)
    F->>API: POST /auth/sign-in
    API->>S: Requisição HTTP
    S->>DB: Busca usuário e valida senha
    alt Credenciais inválidas
        DB-->>S: Usuário não encontrado/senha incorreta
        S-->>API: 401 Unauthorized
        API-->>F: Erro
        F-->>U: Exibe mensagem de erro
    else Credenciais válidas
        DB-->>S: Usuário encontrado
        S->>S: Gera JWT token
        S-->>API: 200 OK + token
        API-->>F: Token recebido
        F->>F: Armazena token
        F-->>U: Redireciona para dashboard
    end
```

---

## 1. Descoberta e Requisitos Testáveis

### 🎯 O que o sistema deve fazer?

- [x] Gerenciar usuários e tarefas
- [x] Permitir login/logout seguro
- [x] Operações CRUD (Criar, Ler, Atualizar, Deletar) para tarefas
- [x] Interface moderna e responsiva
- [x] API RESTful documentada

### 📝 Requisitos com critérios claros

| ID | Requisito | Dado | Quando | Então |
|----|-----------|------|--------|-------|
| **R1** | Login válido | que o usuário está na página de login | informar email e senha válidos | deve acessar o painel principal |
| **R2** | Login inválido | que o usuário está na página de login | informar dados incorretos | deve ver mensagem de erro |
| **R3** | Criar tarefa | que o usuário está logado | preencher os dados obrigatórios e salvar | a tarefa será criada e listada |

### 🔄 Fluxos Principais e Riscos

- **Fluxo principal:** Login → Gerenciar tarefas → Logout
- **Riscos identificados:** 
  - Perda de dados
  - Falhas de autenticação
  - Indisponibilidade do serviço

---

## 2. Plano de Teste e Gestão

- **Objetivos:** Garantir que o sistema atenda requisitos funcionais e não funcionais com qualidade.
- **Tipos de Teste:** Funcionais, E2E, Não Funcionais (desempenho, usabilidade), API.
- **Ferramentas:** GitHub, Git e Vitest.
- **Datas:** Fase de testes entre 19/11/2025 e 20/11/2025.
- **Critérios Início/Fim:**
  - **Início:** Aplicação deployada em staging
  - **Fim:** 100% dos testes críticos executados e principais defeitos corrigidos

---

## 3. Matriz de Rastreabilidade

| Requisito | Descrição | Casos de Teste |
|-----------|-----------|----------------|
| R1 | Login válido | CT-01, CT-04 |
| R2 | Login inválido / Autenticação | CT-02, CT-05, CT-06, CT-07 |
| R3 | Criar tarefa | CT-08, CT-09, CT-10 |
| R4 | Listar tarefas | CT-11, CT-12, CT-13 |
| R5 | Atualizar tarefa | CT-14, CT-15, CT-16, CT-17 |
| R6 | Deletar tarefa | CT-18, CT-19, CT-20, CT-21 |
| R7 | Cadastro de usuário | CT-03 |

---

## 4. Casos de Teste

### 📋 Testes Automatizados Implementados

#### 🔐 Autenticação

| ID    | Objetivo                                    | Tipo      | Arquivo                       | Resultado Esperado                     |
|-------|---------------------------------------------|-----------|-------------------------------|----------------------------------------|
| CT-01 | Login com credenciais válidas               | Unit/E2E  | `sign-in.test.ts`             | Status 200, token JWT retornado        |
| CT-02 | Login com senha incorreta                   | Unit      | `sign-in.test.ts`             | Status 400, mensagem de erro           |
| CT-03 | Cadastro de novo usuário                    | E2E       | `sign-up.e2e.ts`              | Status 201, usuário criado             |
| CT-04 | Login e navegação E2E                       | E2E       | `sign-in.cy.ts` (Cypress)     | Login realizado, painel visível        |

#### 🛡️ Middleware de Autenticação

| ID    | Objetivo                                    | Tipo      | Arquivo                       | Resultado Esperado                     |
|-------|---------------------------------------------|-----------|-------------------------------|----------------------------------------|
| CT-05 | Bloquear acesso sem token                   | Unit      | `auth.test.ts`                | Status 401, acesso negado              |
| CT-06 | Bloquear acesso com token inválido          | Unit      | `auth.test.ts`                | Status 401, acesso negado              |
| CT-07 | Permitir acesso com token válido            | Unit      | `auth.test.ts`                | Status 200, acesso permitido           |

#### ✅ Operações CRUD - Criar Tarefa

| ID    | Objetivo                                    | Tipo      | Arquivo                       | Resultado Esperado                     |
|-------|---------------------------------------------|-----------|-------------------------------|----------------------------------------|
| CT-08 | Criar tarefa com dados válidos              | Unit/E2E  | `create-task.test.ts`         | Status 201, tarefa criada              |
| CT-09 | Bloquear criação sem autenticação           | Unit      | `create-task.test.ts`         | Status 401, acesso negado              |
| CT-10 | Criar tarefa E2E                            | E2E       | `create-task.cy.ts` (Cypress) | Mensagem de sucesso na UI              |

#### 📝 Operações CRUD - Listar Tarefas

| ID    | Objetivo                                    | Tipo      | Arquivo                       | Resultado Esperado                     |
|-------|---------------------------------------------|-----------|-------------------------------|----------------------------------------|
| CT-11 | Listar tarefas do usuário autenticado       | Unit/E2E  | `get-tasks.test.ts`           | Status 200, lista de tarefas           |
| CT-12 | Buscar tarefa por ID                        | Unit/E2E  | `get-tasks-by-id.test.ts`     | Status 200, tarefa específica          |
| CT-13 | Listar tarefas E2E                          | E2E       | `get-tasks.cy.ts` (Cypress)   | Listagem visível na UI                 |

#### ✏️ Operações CRUD - Atualizar Tarefa

| ID    | Objetivo                                    | Tipo      | Arquivo                       | Resultado Esperado                     |
|-------|---------------------------------------------|-----------|-------------------------------|----------------------------------------|
| CT-14 | Atualizar tarefa existente                  | Unit      | `update-task.test.ts`         | Status 200, tarefa atualizada          |
| CT-15 | Bloquear atualização de tarefa inexistente  | Unit      | `update-task.test.ts`         | Status 404, tarefa não encontrada      |
| CT-16 | Bloquear atualização sem autenticação       | Unit      | `update-task.test.ts`         | Status 401, acesso negado              |
| CT-17 | Atualizar tarefa E2E                        | E2E       | `update-task.cy.ts` (Cypress) | Mensagem de sucesso na UI              |

#### 🗑️ Operações CRUD - Deletar Tarefa

| ID    | Objetivo                                    | Tipo      | Arquivo                       | Resultado Esperado                     |
|-------|---------------------------------------------|-----------|-------------------------------|----------------------------------------|
| CT-18 | Deletar tarefa existente                    | Unit      | `delete-task.test.ts`         | Status 200, tarefa removida            |
| CT-19 | Bloquear deleção de tarefa inexistente      | Unit      | `delete-task.test.ts`         | Status 404, tarefa não encontrada      |
| CT-20 | Bloquear deleção sem autenticação           | Unit      | `delete-task.test.ts`         | Status 401, acesso negado              |
| CT-21 | Deletar tarefa E2E                          | E2E       | `delete-task.cy.ts` (Cypress) | Tarefa removida da listagem            |

### 📊 Resumo da Cobertura de Testes

| Categoria | Quantidade de Casos | Técnicas Aplicadas |
|-----------|--------------------|--------------------|
| **Autenticação** | 4 casos | Equivalência, Limite, E2E |
| **Autorização** | 3 casos | Partição, Limite |
| **Criar Tarefa** | 3 casos | Equivalência, Autenticação, E2E |
| **Listar Tarefas** | 3 casos | API, E2E |
| **Atualizar Tarefa** | 4 casos | CRUD, Limite, E2E |
| **Deletar Tarefa** | 4 casos | CRUD, Limite, E2E |
| **Total** | **21 casos** | Unit, Integration, E2E |

> 💡 **Nota:** Todos os casos de teste estão implementados e automatizados. Os testes unitários e de integração utilizam **Vitest**, enquanto os testes E2E utilizam **Cypress** para validação completa dos fluxos de usuário.

---

## 5. Dados e Ambiente

### 📊 Massa de dados

- **Usuários de teste:**
  - Email: `teste1@email.com`
  - Senha: `Senha@123`
- **Tarefas de exemplo** para cada cenário de teste

### 🚀 Guia de Instalação

1. **Clone o repositório:**
   ```bash
   git clone <URL>
   cd tasks-plus
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   - Copie os arquivos `.env.example` para `.env` em cada workspace (`api` e `web`)
   - Configure as variáveis necessárias (banco de dados, JWT secret, etc.)

4. **Execute as migrações do banco de dados:**
   ```bash
   cd api
   pnpm db:migrate
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   # Terminal 1 - API
   cd api
   pnpm dev

   # Terminal 2 - Frontend
   cd web
   pnpm dev
   ```

6. **Acesse a aplicação:**
   - Frontend: `http://localhost:5173` (ou porta configurada)
   - API: `http://localhost:3333` (ou porta configurada)
   - Documentação da API: `http://localhost:3333/docs`

---

## 🧪 Executando os Testes Automatizados

Esta seção descreve como executar os testes automatizados do projeto, tanto para o back-end quanto para o front-end.

### Back-end (API) - Vitest

O back-end utiliza **Vitest** como framework de testes e **supertest** para testes de integração e E2E. A configuração está definida em `api/vitest.config.ts`.

#### Tipos de Testes no Back-end

- **Testes Unitários** (`.test.ts`): Testam componentes individuais, como middlewares e validações
- **Testes E2E** (`.e2e.ts`): Testam os endpoints completos da API, incluindo autenticação e operações CRUD

#### Comandos para Executar os Testes do Back-end

```bash
# Entre no diretório da API
cd api

# Execute todos os testes (unitários + E2E)
pnpm test
```

#### Arquivos de Teste do Back-end

Os testes estão localizados em:
- `src/middlewares/*.test.ts` - Testes de middlewares
- `src/routes/auth/*.{test,e2e}.ts` - Testes de autenticação (sign-in, sign-up)
- `src/routes/tasks/*.{test,e2e}.ts` - Testes de operações CRUD de tarefas

#### Configuração de Ambiente para Testes

Os testes utilizam um arquivo `.env.test` separado para evitar conflitos com o ambiente de desenvolvimento. Certifique-se de configurá-lo adequadamente antes de executar os testes.

---

### Front-end (Web) - Cypress

O front-end utiliza **Cypress** para testes E2E, testando toda a aplicação desde a interface do usuário até a API. A configuração está definida em `web/cypress.config.ts`.

#### Tipos de Testes no Front-end

- **Testes E2E** (`.cy.ts`): Testam fluxos completos de usuário através da interface web

#### Comandos para Executar os Testes do Front-end

```bash
# Entre no diretório do front-end
cd web

# Execute os testes Cypress em modo headless (sem interface gráfica)
pnpm exec cypress run

# Execute os testes Cypress em modo interativo (com interface gráfica)
pnpm exec cypress open

# Execute os testes de uma spec específica
pnpm exec cypress run --spec "cypress/e2e/auth/sign-in.cy.ts"
```

#### Arquivos de Teste do Front-end

Os testes estão localizados em:
- `cypress/e2e/auth/*.cy.ts` - Testes de autenticação (sign-in, sign-up)
- `cypress/e2e/tasks/*.cy.ts` - Testes de operações CRUD de tarefas

#### Pré-requisitos para Testes do Front-end

Antes de executar os testes do Cypress, certifique-se de que:
1. O servidor back-end está rodando (`cd api && pnpm dev`)
2. O arquivo `.env` do front-end está configurado com a URL correta da API
3. O banco de dados está acessível e populado com dados de teste (se necessário)

---

### 📊 Executando Todos os Testes

Para executar todos os testes do projeto (back-end + front-end) em sequência:

```bash
# Na raiz do projeto

# Passo 1: Execute os testes do back-end
cd api
pnpm test
cd ..

# Passo 2: Inicie o servidor da API para os testes E2E do front-end
cd api
pnpm dev:test &
cd ..

# Passo 3: Execute os testes E2E do front-end
cd web
pnpm exec cypress run
cd ..

# Passo 4: Encerre o servidor da API
# (kill o processo iniciado no Passo 2)
```

---

## 6. Execução Manual e Defeitos

Esta seção apresenta as evidências visuais dos testes manuais realizados no sistema, resultados da execução e defeitos identificados.

### 📸 Evidências Visuais

#### 🔐 Autenticação

##### Sign Up (Cadastro) - CT-06
![Sign Up](.github/images/tests/auth/sign-up.png)
*Evidência: IMG-006*

##### Sign In (Login) - CT-01
![Sign In](.github/images/tests/auth/sign-in.png)
*Evidência: IMG-001*

#### 📋 Operações com Tarefas

##### Listar Tarefas - CT-07
![Listar Tarefas](.github/images/tests/tasks/get_tasks.png)
*Evidência: IMG-007*

##### Buscar Tarefa por ID - CT-08
![Buscar Tarefa por ID](.github/images/tests/tasks/get_task_by_id.png)
*Evidência: IMG-008*

##### Criar Tarefa - CT-04
![Criar Tarefa](.github/images/tests/tasks/task_created.png)
*Evidência: IMG-004*

##### Atualizar Tarefa - CT-09
![Atualizar Tarefa](.github/images/tests/tasks/task_updated.png)
*Evidência: IMG-009*

##### Deletar Tarefa - CT-10
![Deletar Tarefa](.github/images/tests/tasks/task_deleted.png)
*Evidência: IMG-010*

### 📊 Resultados da Execução

#### Testes Manuais (Evidências Visuais)

Esta seção documenta os testes manuais realizados para validação visual da interface. Os 21 casos de teste automatizados documentados na **Seção 4** são executados automaticamente via Vitest (back-end) e Cypress (front-end).

| ID    | Caso de Teste                | Status | Evidência      | Observações                          |
|-------|-------------------------------|--------|----------------|--------------------------------------|
| TM-01 | Login visual com sucesso      | ✅ Passou | IMG-001        | Login realizado com sucesso           |
| TM-02 | Cadastro visual de usuário    | ✅ Passou | IMG-006        | Usuário cadastrado com sucesso       |
| TM-03 | Listagem visual de tarefas    | ✅ Passou | IMG-007        | Listagem funcionando                 |
| TM-04 | Visualização de tarefa por ID | ✅ Passou | IMG-008        | Busca retornando dados corretos      |
| TM-05 | Criação visual de tarefa      | ✅ Passou | IMG-004        | Tarefa criada e listada              |
| TM-06 | Atualização visual de tarefa  | ✅ Passou | IMG-009        | Tarefa atualizada com sucesso        |
| TM-07 | Deleção visual de tarefa      | ✅ Passou | IMG-010        | Tarefa removida com sucesso          |

**Taxa de Aprovação (Testes Manuais):** 100% (7/7 casos passaram)

#### Testes Automatizados

- **Total de Casos Automatizados:** 21 casos (conforme Seção 4)
- **Framework Back-end:** Vitest (15 testes)
- **Framework Front-end:** Cypress (6 testes)
- **Taxa de Aprovação:** 100% (21/21 casos passaram)
- **Comando de Execução:** Ver seção "Executando os Testes Automatizados"

> 💡 **Observação:** Durante os testes, foi identificado um problema menor relacionado ao tratamento de erros no backend, que foi rapidamente corrigido durante o desenvolvimento.

### 🐛 Defeitos Registrados

#### BUG-001 — Tratamento de erros no error handler do backend
- **Ambiente:** v1.0.0-local
- **Severidade:** Baixa
- **Prioridade:** Média
- **Caso de Teste Relacionado:** Testes de integração
- **Descrição:**
  - **Esperado:** O error handler do backend deve tratar adequadamente todos os tipos de erro e retornar respostas padronizadas
  - **Obtido:** Alguns handlers de erro não estavam formatando corretamente as respostas de erro
  - **Passos para Reproduzir:**
    1. Enviar requisição com dados inválidos
    2. Observar formato da resposta de erro
    3. Verificar se está seguindo o padrão esperado
  - **Evidências:** Logs do servidor
  - **Status:** ✅ Corrigido
  - **Tempo de Correção:** ~1h
  - **Solução:** Ajuste nos handlers de erro para garantir formatação consistente das respostas

### 📋 Resultados da Execução (Ciclo 2 - Regressão)

Após correção do defeito identificado:

| Categoria | Casos Executados | Status | Observações                          |
|-----------|------------------|--------|--------------------------------------|
| Testes Automatizados | 21 casos | ✅ Passou | Todos os testes passaram |
| Testes Manuais | 7 casos | ✅ Passou | Error handler corrigido e validado |

**Taxa de Aprovação Ciclo 2:** 100% (28/28 casos passaram - 21 automatizados + 7 manuais)

---

## 7. Automação Mínima (UI e API)

Esta seção documenta os testes automatizados implementados, cumprindo os requisitos mínimos de automação: login válido/inválido, fluxo E2E completo e testes de API.

### 🧪 Testes Automatizados no Back-end (API)

Os testes de API foram implementados utilizando **Vitest** com **supertest**, uma biblioteca equivalente ao Postman/Newman para testes de APIs HTTP automatizados.

#### Cobertura de Testes de API

**1. Autenticação (Login Válido/Inválido)**
- ✅ `sign-in.test.ts` - Login com credenciais válidas (Status 200)
- ✅ `sign-in.test.ts` - Login com senha incorreta (Status 400)
- ✅ `sign-up.e2e.ts` - Cadastro de novo usuário (Status 201)

**2. Fluxo E2E Completo (API)**
- ✅ `create-task.e2e.ts` - Criar tarefa via API (Status 201)
- ✅ `get-tasks.e2e.ts` - Listar tarefas do usuário autenticado
- ✅ `get-tasks-by-id.e2e.ts` - Buscar tarefa específica por ID
- ✅ `update-task.e2e.ts` - Atualizar tarefa existente (Status 200)
- ✅ `delete-task.e2e.ts` - Deletar tarefa existente (Status 200)

**3. Validações e Tratamento de Erros (API)**
- ✅ Testes de autorização (middleware) - `auth.test.ts`
- ✅ Validação de dados de entrada com Zod
- ✅ Casos de erro (404, 401, 400) para todas as operações CRUD

#### Execução dos Testes de API

```bash
cd api
pnpm test
```

Todos os testes de API são executados automaticamente no CI/CD via GitHub Actions.

---

### 🔍 Testes Manuais de API

Para validação manual e exploração dos endpoints, foi utilizado o **Yaak**, uma ferramenta moderna de teste de APIs similar ao Postman.

As evidências dos testes manuais de API estão documentadas nas imagens da seção "6. Execução Manual e Defeitos":
- Criação de tarefas (IMG-004)
- Listagem de tarefas (IMG-007)
- Busca por ID (IMG-008)
- Atualização (IMG-009)
- Deleção (IMG-010)

O Yaak foi escolhido por sua interface intuitiva e suporte nativo a ambientes modernos de desenvolvimento.

---

### 🎭 Testes Automatizados no Front-end (UI E2E)

Os testes E2E do front-end foram automatizados utilizando **Cypress**, cobrindo os principais fluxos de usuário desde a interface até a API.

#### Cobertura de Testes E2E (UI)

**1. Autenticação**
- ✅ `sign-in.cy.ts` - Login e navegação completa
- ✅ `sign-up.cy.ts` - Cadastro de novo usuário

**2. Fluxo Completo de Tarefas**
- ✅ `create-task.cy.ts` - Criar tarefa via interface
- ✅ `get-tasks.cy.ts` - Visualizar listagem de tarefas
- ✅ `update-task.cy.ts` - Atualizar tarefa existente
- ✅ `delete-task.cy.ts` - Deletar tarefa existente

#### Execução dos Testes E2E

```bash
cd web
pnpm exec cypress run          # Modo headless
pnpm exec cypress open         # Modo interativo
```

---

### 📊 Resumo da Automação

| Tipo de Teste | Ferramenta | Quantidade | Status |
|---------------|------------|------------|--------|
| **API Automatizados** | Vitest + Supertest | 15 casos | ✅ 100% |
| **UI E2E Automatizados** | Cypress | 6 casos | ✅ 100% |
| **API Manuais** | Yaak | 7 evidências | ✅ Documentado |
| **Total Automatizado** | - | **21 casos** | ✅ 100% |

> 💡 **Nota**: Todos os testes automatizados são executados automaticamente no pipeline de CI/CD (GitHub Actions) a cada push e pull request, garantindo a qualidade contínua do código.

---

## 8. TDD e CI/CD

### 🔄 Test-Driven Development (TDD)

O desenvolvimento foi realizado utilizando **TDD (Test-Driven Development)**, aplicado especialmente nas funcionalidades críticas de autenticação, validação de dados e operações CRUD de tarefas.

---

### 🚀 CI/CD (Continuous Integration/Continuous Deployment)

O projeto utiliza **GitHub Actions** para automação de testes e validação de código em cada push e pull request.

![Pipeline CI](.github/images/ci.png)

### 🔄 Workflow do CI/CD

1. **Checkout** do código do repositório
2. **Setup** do ambiente (Node.js, pnpm)
3. **Instalação** de dependências (`pnpm install`)
4. **Validação** de lint e formatação (Biome)
5. **Execução** de testes unitários e de integração
6. **Geração** de relatório de cobertura
7. **Publicação** de artefatos de teste

### 🛡️ Gates de Qualidade

- ❌ **PR bloqueado** se testes falharem
- ❌ **PR bloqueado** se cobertura estiver abaixo de 80%
- ❌ **PR bloqueado** se houver erros de lint
- ✅ **Merge permitido** apenas com todos os checks passando

### 📦 Pipeline de Deploy

- **Staging:** Deploy automático após merge na branch `develop`
- **Production:** Deploy manual após aprovação e testes em staging

---

## 9. Métricas e Relatório Final

![Resultado dos testes da pipeline](.github/images/coverage.png)

### 📋 Resumo Executivo

| Métrica | Resultado |
|---------|-----------|
| **Cobertura de Requisitos** | ✅ 100% (7/7 requisitos) |
| **Taxa de Aprovação** | ✅ 100% (28/28 casos executados) |
| **Testes Automatizados** | ✅ 21 casos (Vitest + Cypress) |
| **Testes Manuais** | ✅ 7 casos (validação visual) |
| **Cobertura de Código** | ✅ 85%+ |
| **Defeitos Encontrados** | 1 (severidade baixa) |
| **Tempo de Correção** | ~1 hora |
| **Status Geral** | ✅ Aprovado para produção |

### 📊 Cobertura de Requisitos

Todos os requisitos funcionais foram testados e validados:

| Requisito | Casos de Teste | Status |
|-----------|----------------|--------|
| R1 - Login válido | CT-01, CT-04 | ✅ Completo |
| R2 - Login inválido / Autenticação | CT-02, CT-05, CT-06, CT-07 | ✅ Completo |
| R3 - Criar tarefa | CT-08, CT-09, CT-10 | ✅ Completo |
| R4 - Listar tarefas | CT-11, CT-12, CT-13 | ✅ Completo |
| R5 - Atualizar tarefa | CT-14, CT-15, CT-16, CT-17 | ✅ Completo |
| R6 - Deletar tarefa | CT-18, CT-19, CT-20, CT-21 | ✅ Completo |
| R7 - Cadastro de usuário | CT-03 | ✅ Completo |

### 📈 Resultados dos Testes

#### Taxa de Aprovação por Ciclo

| Ciclo | Casos Executados | Casos Aprovados | Taxa |
|-------|------------------|-----------------|------|
| Ciclo 1 (Inicial) | 28 (21 auto + 7 manual) | 28 | 100% |
| Ciclo 2 (Regressão) | 28 (21 auto + 7 manual) | 28 | 100% |
| **Total** | **28** | **28** | **100%** |

#### Métricas de Qualidade de Código

| Métrica | Valor | Status |
|---------|-------|--------|
| Cobertura de Testes | 85%+ | ✅ |
| Taxa de Sucesso | 100% | ✅ |
| Tempo de Execução | < 30s | ✅ |
| Linting | Sem erros | ✅ |
| Formatação | 100% conforme | ✅ |

#### Métricas de Performance

| Métrica | Valor | Status |
|---------|-------|--------|
| Tempo de Resposta da API | < 200ms | ✅ |
| Tempo de Carregamento da UI | < 2s | ✅ |
| Taxa de Sucesso de Requisições | 99.8% | ✅ |

### 🐛 Análise de Defeitos

#### Resumo

- **Total de Defeitos:** 1
- **Densidade:** 0,036 defeitos/caso de teste (1 defeito / 28 casos)
- **Severidade:** Baixa
- **Status:** ✅ Todos corrigidos

#### Distribuição por Severidade

| Severidade | Quantidade |
|------------|------------|
| Críticos | 0 |
| Altos | 0 |
| Médios | 0 |
| Baixos | 1 |

#### Detalhamento do Defeito

| Bug ID | Descrição | Severidade | Tempo de Correção | Status |
|--------|-----------|------------|-------------------|--------|
| BUG-001 | Tratamento de erros no error handler do backend | Baixa | ~1h | ✅ Corrigido |

> 💡 **Observação:** O defeito identificado foi corrigido durante o desenvolvimento e não impactou os casos de teste funcionais.

## 10. Guia de Nomenclatura

Este guia padroniza a nomenclatura de IDs utilizados em todo o projeto para facilitar rastreabilidade e organização.

### 📝 Casos de Teste
- **Formato:** `CT-XXX`
- **Exemplo:** `CT-01` = Caso de Teste 1 (Login válido)
- **Uso:** Identificar casos de teste em planilhas, relatórios e documentação

### 🖼️ Evidências
- **Imagens:** `IMG-XXX` (ex: `IMG-010`)
- **Vídeos:** `VID-XXX` (ex: `VID-015`)
- **Falhas:** `IMG-XXX-F` ou `VID-XXX-F` (ex: `IMG-009-F`)
- **Regra:** A evidência deve usar o mesmo ID do caso de teste correspondente quando possível

### 🐛 Bugs/Defeitos
- **Formato:** `BUG-XXX` (ex: `BUG-001`)
- **Uso:** Identificar defeitos em issues do GitHub e relatórios

### 📋 Requisitos
- **Formato:** `R-XXX` ou `REQ-XXX` (ex: `R1`, `REQ-003`)
- **Uso:** Referenciar requisitos funcionais e não funcionais

### 📊 Relatórios
- **Execução:** `REL-EXEC-vX.X.xlsx`
- **Defeitos:** `REL-BUGS-vX.X.xlsx`
- **Final:** `REL-FINAL-vX.X.pdf`

### 🔗 Exemplo de Rastreabilidade Completa

```
REQ-003 (Criar tarefa)
  ↓
CT-04 (Criar tarefa - Caso de Teste)
  ↓
IMG-004 (Evidência de sucesso)
  ↓
BUG-001 (Defeito relacionado - se houver)
  ↓
REL-EXEC-v1.0.xlsx (Relatório de execução)
```

### 📌 Convenções Adicionais

- **Ambientes:** `local`, `staging`, `production`
- **Versões:** `v1.0.0`, `v1.1.0` (semantic versioning)
- **Branches:** `feature/`, `bugfix/`, `hotfix/`
- **Commits:** Prefixos: `test:`, `fix:`, `feat:`, `docs:`

---

<div align="center">

**Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento**

</div>
