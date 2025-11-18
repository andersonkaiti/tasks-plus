
# 📋 Plano de Teste e Gestão de Qualidade

Este documento detalha as fases obrigatórias do processo de Garantia de Qualidade (QA) aplicadas ao projeto.

---

## 1. Descoberta e Requisitos Testáveis

### O que o sistema deve fazer?

- Gerenciar usuários e tarefas.
- Permitir login/logout.
- Operações CRUD (Criar, Ler, Atualizar, Deletar) para tarefas.

### Requisitos com critérios claros (Gherkin)
- **R1: Login válido**
  - **Dado** que o usuário está na página de login  
  - **Quando** informar email e senha válidos  
  - **Então** deve acessar o painel principal

- **R2: Login inválido**
  - **Dado** que o usuário está na página de login  
  - **Quando** informar dados incorretos  
  - **Então** deve ver mensagem de erro

- **R3: Criar tarefa**
  - **Dado** que o usuário está logado  
  - **Quando** preencher os dados obrigatórios e salvar  
  - **Então** a tarefa será criada e listada
  
### Fluxos Principais e Riscos
- Fluxo principal: Login → Gerenciar tarefas → Logout
- Riscos: Perda de dados, falhas de autenticação, indisponibilidade.

---

## 2. Plano de Teste e Gestão

- **Objetivos:** Garantir que o sistema atenda requisitos funcionais e não funcionais com qualidade.
- **Tipos de Teste:** Funcionais, E2E, Não Funcionais (desempenho, usabilidade), API.
- **Papéis:**
  - QA Leader: Organização, garantia de padrões.
  - QA Engineer: Escrita/execução dos testes.
  - Dev: Correção de defeitos e TDD.
- **Ferramentas:** GitHub, Jira ou Issues, Postman, testes automatizados (ex: Cypress/Selenium).
- **Datas:** Fase de testes entre 10/06/2024 e 15/06/2024.
- **Critérios Início/Fim:**
  - Início: Aplicação deployada em staging
  - Fim: 100% dos testes críticos executados e principais defeitos corrigidos

---

## 3. Matriz de Rastreabilidade

| Requisito | Casos de Teste | Evidência/Defeito         |
|-----------|---------------|---------------------------|
| R1        | CT-01, CT-02  | Issue #1, Screenshot1.png |
| R2        | CT-03         | Issue #2                  |
| R3        | CT-04, CT-05  |                          |

---

## 4. Casos de Teste

| ID    | Objetivo                   | Pré-condições          | Passos                                                          | Dados                     | Resultado Esperado                   | Técnica         |
|-------|----------------------------|------------------------|-----------------------------------------------------------------|--------------------------|--------------------------------------|----------------|
| CT-01 | Logar com sucesso          | Usuário registrado     | 1. Acessar login. 2. Informar dados válidos. 3. Clicar Entrar.  | email válido, senha      | Painel principal visível             | Equivalência   |
| CT-02 | Impedir login inválido     | -                      | 1. Acessar login. 2. Dados incorretos. 3. Clicar Entrar.        | email inválido, senha    | Mensagem "Login inválido"            | Limite         |
| CT-03 | Logout                     | Usuário logado         | 1. Clicar logout no painel                                      | -                        | Redireciona para login               | Decisão        |
| CT-04 | Criar tarefa               | Usuário logado         | 1. Novo. 2. Preencher. 3. Salvar.                              | Título, data             | Tarefa listada                       | E2E            |
| CT-05 | Teste não funcional - API  | -                      | 1. Enviar POST via Postman                                     | Dados tarefa             | Status 201, tarefa criada            | API/Desempenho |

*Inclui classes de equivalência e limites. CT-04 é E2E. CT-05 é não funcional.*

---

## 5. Dados e Ambiente

- **Massa de dados:**  
  - Usuários: `teste1@email.com`, senha: `Senha@123`  
  - Tarefas de exemplo para cada cenário.

- **Guia de Instalação:**  
  1. Clone o repositório:  
     `git clone <URL>`
  2. Instale dependências:  
     `npm install`
  3. Configure `.env`
  4. Rode o servidor:  
     `npm start`
  5. Acesse em `http://localhost:3000`

---

## 6. Execução Manual e Defeitos

- Execução dos testes CT-01 a CT-05 em dois ciclos:
  - 1º ciclo: execução inicial
  - 2º ciclo: regressão após correção

- Registro de resultados: "Passou" ou "Falhou"
- Defeitos registrados em Issues do GitHub (ou Jira) com:
  - Título, passos, resultado esperado/obtido, severidade, prioridade, evidências.

---

## 7. Automação Mínima

- Automatizar pelo menos 3 testes:
  1. Login válido/inválido (CT-01, CT-02)
  2. Fluxo principal E2E (CT-04)
  3. API (CT-05, ex: POST de tarefa via Postman/Newman)

---

## 8. TDD e CI/CD

- Exemplo TDD:
  1. Escrever teste para cenário de login com senha inválida (deve falhar)
  2. Implementar correção no código para passar (deve passar)
  3. Refatorar mantendo testes verdes

- **CI/CD:**  
  - Pipeline automatizado (ex: GitHub Actions) com etapas:
    - Instalação dependências
    - Linter
    - Execução de testes
    - Deploy (opcional)

---

## 9. Métricas e Relatório Final

- Cobertura de requisitos (% casos executados/sucesso)
- Taxa de aprovação (casos "Passou" vs total)
- Defeitos encontrados: quantidade, severidade
- Principais riscos identificados e recomendações

---

## 10. Apresentação Final

- Demonstração de até 10 minutos apresentando:
  - Objetivos e requisitos
  - Plano e matriz
  - Execução e automação
  - Resultados e aprendizados

---

