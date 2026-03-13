# 🌈 QA Automação — Lacrei Saúde

Projeto de automação de testes end-to-end desenvolvido como parte do Desafio Técnico de Quality Assurance da **Lacrei Saúde**, plataforma de saúde inclusiva para a comunidade LGBTQIAPN+.

> 🔗 **Ambiente de testes:** [paciente-staging.lacreisaude.com.br](https://paciente-staging.lacreisaude.com.br/)  
> 📋 **Documentação Notion:** [Gestão de casos de teste e bugs](https://www.notion.so/QA-Lacrei-Sa-de-a886afb9c2554e47b683ba94ab6b4d42?source=copy_link)

---

## 📑 Índice

- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Configuração do Ambiente](#️-configuração-do-ambiente)
- [Executando os Testes](#-executando-os-testes)
- [Cobertura de Testes](#-cobertura-de-testes)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Testes de Acessibilidade](#️-testes-de-acessibilidade)
- [Testes de Desempenho](#-testes-de-desempenho)
- [Testes de Responsividade](#-testes-de-responsividade)
- [Gestão de Bugs](#-gestão-de-bugs)
- [Checklist de Segurança](#-checklist-de-segurança)
- [Rollback de Testes Automatizados](#-rollback-de-testes-automatizados)

---

## 🧰 Tecnologias

| Ferramenta | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^15.8.1 | Framework de automação E2E |
| [Cucumber (Gherkin)](https://github.com/badeball/cypress-cucumber-preprocessor) | ^24.0.1 | BDD — cenários em linguagem natural |
| [TypeScript](https://www.typescriptlang.org/) | ^5.9.3 | Tipagem estática |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | ^7.1.4 | Geração de relatórios HTML |
| [ESLint + Prettier](https://eslint.org/) | ^9.x | Qualidade e padronização de código |
| [GitHub Actions](https://github.com/features/actions) | — | Pipeline CI/CD |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/) | — | Acessibilidade e desempenho |

---

## 📁 Estrutura do Projeto

```
qa-lacrei-saude/
├── .github/
│   └── workflows/
│       └── e2e-cadastro.yml          # Pipeline CI/CD
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   └── cadastre.feature      # Cenários BDD em Gherkin (pt-BR)
│   │   └── steps/
│   │       └── cadastre.ts           # Step definitions
│   ├── pages/
│   │   ├── CadastrePage.ts           # Page Object — formulário de cadastro
│   │   └── LoginPage.ts              # Page Object — página de login
│   ├── support/
│   │   ├── constants/
│   │   │   ├── messages.ts           # Mensagens de validação esperadas
│   │   │   └── password.ts           # Critérios e visibilidade de senha
│   │   ├── selectors/
│   │   │   └── cadastreSelectors.ts  # Seletores CSS isolados por página
│   │   ├── commands.ts               # Comandos customizados Cypress
│   │   └── e2e.ts                    # Configuração global de suporte
│   └── fixtures/
│       └── example.json
├── cypress.config.ts                 # Configuração do Cypress
├── tsconfig.json                     # Configuração TypeScript
├── eslint.config.js                  # Regras de lint
└── package.json
```

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) **v22 ou superior**
- [npm](https://www.npmjs.com/) **v9 ou superior**
- [Google Chrome](https://www.google.com/chrome/) instalado na máquina
- Acesso à internet (ambiente de staging externo)

---

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/LucasMCFidelis/qa-lacrei-saude.git
cd qa-lacrei-saude
```

### 2. Instale as dependências

```bash
npm ci
```

### 3. Verifique a configuração

O arquivo `cypress.config.ts` já aponta para o ambiente de staging:

```ts
baseUrl: "https://paciente-staging.lacreisaude.com.br/"
```

Nenhuma variável de ambiente adicional é necessária para executar os testes de cadastro, pois os dados são gerados dinamicamente com `Date.now()` para garantir e-mails únicos a cada execução.

---

## ▶️ Executando os Testes

### Modo interativo (Cypress UI)

```bash
npx cypress open
```

Selecione **E2E Testing** → **Chrome** → escolha o arquivo `cadastre.feature`.

### Modo headless (linha de comando)

```bash
# Testes de cadastro
npx cypress run --browser chrome --spec "cypress/e2e/features/cadastre.feature"

# Todos os testes
npx cypress run --browser chrome
```

### Gerar relatório HTML após execução

```bash
npx mochawesome-merge cypress/reports/json/*.json -o cypress/reports/report.json
npx marge cypress/reports/report.json --reportDir cypress/reports/html --inline
```

O relatório ficará disponível em `cypress/reports/html/index.html`.

---

## 🧪 Cobertura de Testes

Os cenários estão escritos em **Gherkin (pt-BR)** e cobrem o fluxo de **Cadastro de Usuário**.

### Fluxo Principal

| ID | Cenário |
|---|---|
| CT-001 | Cadastro com todos os dados obrigatórios preenchidos corretamente |

### Validações de E-mail

| ID | Cenário |
|---|---|
| CT-002 | Rejeição com e-mail já existente na base |
| CT-003 | Rejeição com e-mail em formato inválido |
| CT-004 | Rejeição com domínio de e-mail inexistente |
| CT-005 | Rejeição com e-mail de confirmação divergente |

### Validações de Nome e Sobrenome

| ID | Cenário |
|---|---|
| CT-006 | Rejeição com campo Nome esvaziado após interação |
| CT-007 | Rejeição com campo Nome preenchido com espaços em branco |
| CT-008 | Rejeição com campo Nome com caracteres inválidos |
| CT-009 | Rejeição com campo Sobrenome esvaziado após interação |
| CT-010 | Rejeição com campo Sobrenome com espaços em branco |
| CT-011 | Rejeição com campo Sobrenome com caracteres inválidos |

### Validações de Senha

| ID | Cenário |
|---|---|
| CT-012 | Indicador `MIN_LENGTH` não atendido para senha < 8 caracteres |
| CT-013 | Indicador `UPPERCASE` não atendido para senha sem maiúscula |
| CT-014 | Indicador `LOWERCASE` não atendido para senha sem minúscula |
| CT-015 | Indicador `NUMBER` não atendido para senha sem número |
| CT-016 | Indicador `SPECIAL_CHAR` não atendido para senha sem caractere especial |
| CT-017 | Aceitação de senha de exatamente 8 caracteres atendendo todos os critérios |

### Termos, Privacidade e Interface

| ID | Cenário |
|---|---|
| CT-018 | Acesso ao documento de termos de uso pelo link no checkbox |
| CT-019 | Acesso ao documento de política de privacidade pelo link no checkbox |
| CT-020 | Alternância de visibilidade dos campos Senha e Confirmar senha |
| CT-021 | Botão desabilitado com checkbox de termos desmarcado |
| CT-022 | Botão desabilitado com checkbox de confirmação de idade desmarcado |

> 📄 Todos os cenários detalhados estão em [`cypress/e2e/features/cadastre.feature`](cypress/e2e/features/cadastre.feature).

---

## 🔄 Pipeline CI/CD

A pipeline está configurada em `.github/workflows/e2e-cadastro.yml` e executa automaticamente nos seguintes eventos:

- `push` nas branches `main` e `develop`
- `pull_request` para `main` e `develop`
- Execução manual via `workflow_dispatch`

### O que a pipeline faz

```
1. Checkout do repositório
2. Setup Node.js 22
3. npm ci (instalação de dependências)
4. Execução dos testes com Cypress + Chrome (headless)
5. Geração de relatório HTML (Mochawesome)
6. Upload de artefatos:
   ├── Relatório HTML        → retido por 30 dias
   ├── Screenshots (falhas)  → retidos por 7 dias
   └── Vídeos               → retidos por 7 dias
7. Publicação de resumo na aba Actions (GitHub Step Summary)
```

### Acessando os relatórios

Após cada execução, acesse **Actions → [execução] → Artifacts** no repositório para baixar:

- `cypress-report-{N}` — relatório HTML completo
- `cypress-screenshots-{N}` — prints de falhas
- `cypress-videos-{N}` — gravações das sessões

---

## ♿️ Testes de Acessibilidade

Validação realizada com **Google Lighthouse** e **Chrome DevTools** sobre o ambiente de staging.

### Checklist manual

| Item | Resultado |
|---|---|
| Navegação via teclado (`Tab`, `Enter`, `Esc`) | ✅ Verificado |
| Foco visível nos elementos interativos | ✅ Verificado |
| Uso com leitor de tela (NVDA / VoiceOver) | ✅ Verificado |
| Atributos `aria-label` nos botões críticos | ✅ Presente |
| Contraste de cores mínimo (WCAG AA) | ✅ Verificado |
| Campos de formulário com `label` associado | ✅ Verificado |
| Mensagens de erro anunciadas para leitores de tela | ✅ Verificado |

### Score Lighthouse — Acessibilidade

| Página | Score | Meta |
|---|---|---|
| Login / Cadastro | _registrar após execução_ | ≥ 90 |

> 📋 Resultados completos, prints e insights documentados no Notion.

---

## ⚡ Testes de Desempenho

Validação de performance com **Google Lighthouse** nas operações críticas do fluxo de cadastro.

### Resultados por operação

| Operação | Tempo de Resposta | Meta |
|---|---|---|
| Carregamento da página de cadastro | _registrar após execução_ | < 500ms |
| Submissão do formulário de cadastro | _registrar após execução_ | < 500ms |
| Redirecionamento pós-cadastro | _registrar após execução_ | < 500ms |

### Simulação de carga

- Ferramenta: Lighthouse (modo simulação)
- Usuários simultâneos simulados: 30
- Rede simulada: 4G

> 📋 Resultados, gráficos e análise completa documentados no Notion.

---

## 📱 Testes de Responsividade

Validação do comportamento da interface nas dimensões mobile e desktop.

### Breakpoints testados

| Dispositivo | Resolução | Resultado |
|---|---|---|
| Mobile | 375 × 812 (iPhone 12) | _registrar_ |
| Mobile (limite) | 600 × 900 | _registrar_ |
| Desktop | 1280 × 800 | _registrar_ |
| Desktop wide | 1920 × 1080 | _registrar_ |

### Itens validados

- Layout sem sobreposição de elementos
- Campos do formulário acessíveis e usáveis
- Botões com área de toque adequada (≥ 44px)
- Textos legíveis sem zoom horizontal
- Checkboxes e links visíveis e funcionais

> 📋 Bugs de responsividade encontrados estão registrados nas Issues do GitHub e no Notion.

---

## 🐛 Gestão de Bugs

Os bugs encontrados são registrados em:

- **GitHub Issues** — com labels de impacto (`crítico`, `alto`, `médio`, `baixo`)
- **Notion** — com descrição detalhada, passos para reprodução, prints/vídeos e sugestão de prioridade

### Classificação de impacto

| Nível | Descrição |
|---|---|
| 🔴 Crítico | Impede o fluxo principal; usuário não consegue concluir a ação |
| 🟠 Alto | Afeta funcionalidade importante, mas existe contorno |
| 🟡 Médio | Comportamento incorreto com baixo impacto na experiência |
| 🟢 Baixo | Problema visual ou de usabilidade menor |

> 🔗 [Ver Issues abertas no GitHub](../../issues)

---

## 🔒 Checklist de Segurança

| Item | Status |
|---|---|
| Nenhuma senha ou credencial real commitada no repositório | ✅ |
| Dados de teste gerados dinamicamente (sem dados reais de usuários) | ✅ |
| `.gitignore` configurado para ignorar reports, screenshots, vídeos e `node_modules` | ✅ |
| Testes executados exclusivamente no ambiente de staging | ✅ |
| Sem uso de dados pessoais sensíveis nos fixtures | ✅ |
| Pipeline sem exposição de variáveis de ambiente sensíveis | ✅ |

---

## 🔁 Rollback de Testes Automatizados

Em caso de falha na pipeline ou comportamento inesperado após um merge:

### 1. Identificar o commit problemático

```bash
git log --oneline -10
```

### 2. Reverter para o estado estável

```bash
# Opção A — reverter mantendo histórico (recomendado)
git revert HEAD
git push origin main

# Opção B — reset para commit específico (emergência)
git reset --hard <hash-do-commit-estável>
git push origin main --force
```

### 3. Verificar estabilidade

Acionar manualmente a pipeline via **Actions → Run workflow** e confirmar que todos os testes voltam a passar antes de retomar o desenvolvimento.

### 4. Abrir issue de rastreamento

Registrar uma issue no GitHub descrevendo o problema, o commit afetado, o rollback realizado e os próximos passos para correção definitiva.

---

## 👩‍💻 Organização da Documentação

| Local | Conteúdo |
|---|---|
| Este README | Configuração, execução, estrutura e processos |
| `cypress/e2e/features/` | Cenários BDD em Gherkin (pt-BR) |
| `cypress/pages/` | Page Objects por página da aplicação |
| `cypress/support/selectors/` | Seletores CSS isolados por contexto |
| `cypress/support/constants/` | Mensagens e constantes reutilizáveis |
| GitHub Issues | Registro e rastreamento de bugs |
| Notion | Documentação expandida, resultados e análises |

---

## 💙 Sobre o Projeto

Este projeto foi desenvolvido com o compromisso de que **qualidade é cuidado**. Cada cenário automatizado representa uma garantia a mais de que a plataforma Lacrei Saúde oferece uma experiência segura, acessível e acolhedora para toda a comunidade LGBTQIAPN+. 🌈✨