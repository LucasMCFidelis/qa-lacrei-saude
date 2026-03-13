import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import CadastrePage from "../../pages/CadastrePage";
import {
  PASSWORD_CRITERIA,
  PASSWORD_VISIBILITY,
  PasswordCriteriaKey,
} from "../../support/constants/password";
import { MESSAGES_CADASTRE } from "../../support/constants/messages";

// ─── Dados compartilhados entre steps ────────────────────────

let savedEmail: string;

// ─── Dados de teste ───────────────────────────────────────────

const timestamp = Date.now();

const VALID_USER = {
  firstName: "Maria",
  lastName: "Silva",
  email: `maria.teste+${timestamp}@email.com`,
  emailConfirm: `maria.teste+${timestamp}@email.com`,
  password: "Senha@123",
  passwordConfirm: "Senha@123",
};

// ─── Contexto / Dado ──────────────────────────────────────────

Given("que estou na página de cadastro", () => {
  CadastrePage.visit();
});

Given("que dei consentimento nos checkboxes obrigatórios", () => {
  CadastrePage.acceptAllTerms();
});

Given("que tenho salvo o e-mail de uma conta já cadastrada", () => {
  const user = VALID_USER;
  CadastrePage.visit()
  CadastrePage.registerUser(user);
  savedEmail = user.email;
});

// ─── Ações / Quando ───────────────────────────────────────────

When(
  "submeto o formulário com todos os campos preenchidos com dados válidos",
  () => {
    CadastrePage.fillForm(VALID_USER);
    CadastrePage.submit();
  },
);

When("preencho todos os campos obrigatórios com dados válidos", () => {
  CadastrePage.fillForm(VALID_USER);
});

When("preencho o campo {string} com o e-mail salvo", (campo: string) => {
  if (campo === "E-mail") {
    CadastrePage.fillEmail(savedEmail);
    CadastrePage.fillEmailConfirm(savedEmail);
  }
});

When("submeto o formulário", () => {
  CadastrePage.submit();
});

When(
  "preencho o campo {string} com um e-mail em formato inválido",
  (campo: string) => {
    if (campo === "E-mail") CadastrePage.fillEmail("email-invalido");
  },
);

When("retiro o foco do campo {string}", (campo: string) => {
  const map: Record<string, string> = {
    "E-mail": "#email",
    "Confirmar e-mail": "#email2",
    Nome: "#firstName",
    Sobrenome: "#lastName",
    Senha: "#password1",
    "Confirmar senha": "#password2",
  };
  cy.get(map[campo]).blur();
});

When(
  "preencho os campos {string} e {string} com valores distintos",
  (campo1: string, campo2: string) => {
    CadastrePage.fillEmail("email.um@teste.com");
    CadastrePage.fillEmailConfirm("email.dois@teste.com");
  },
);

When(
  "preencho os campos {string} e {string} com um e-mail com domínio inexistente",
  (campo1: string, campo2: string) => {
    CadastrePage.fillEmail("usuario@example.com");
    CadastrePage.fillEmailConfirm("usuario@example.com");
  },
);

When("preencho o campo {string} com valor válido", (campo: string) => {
  if (campo === "Nome") CadastrePage.fillFirstName("Maria");
  if (campo === "Sobrenome") CadastrePage.fillLastName("Silva");
});

When("limpo o campo {string}", (campo: string) => {
  if (campo === "Nome") cy.get("#firstName").clear().blur();
  if (campo === "Sobrenome") cy.get("#lastName").clear().blur();
});

When("preencho o campo {string} com espaços em branco", (campo: string) => {
  if (campo === "Nome") CadastrePage.fillFirstName("     ");
  if (campo === "Sobrenome") CadastrePage.fillLastName("     ");
});

When("preencho o campo {string} com caracteres inválidos", (campo: string) => {
  if (campo === "Nome") CadastrePage.fillFirstName("M@r!@ ##$");
  if (campo === "Sobrenome") CadastrePage.fillLastName("S!lv@ ##$");
});

When(
  "preencho o campo {string} com uma senha com menos de 8 caracteres",
  (campo: string) => {
    CadastrePage.fillPassword("Ab1@");
  },
);

When(
  "preencho o campo {string} com uma senha sem letra maiúscula",
  (campo: string) => {
    CadastrePage.fillPassword("senha@123");
  },
);

When(
  "preencho o campo {string} com uma senha sem letra minúscula",
  (campo: string) => {
    CadastrePage.fillPassword("SENHA@123");
  },
);

When(
  "preencho o campo {string} com uma senha sem caractere numérico",
  (campo: string) => {
    CadastrePage.fillPassword("Senha@abc");
  },
);

When(
  "preencho o campo {string} com uma senha sem caractere especial",
  (campo: string) => {
    CadastrePage.fillPassword("Senha1234");
  },
);

When(
  "preencho o campo {string} com uma senha de exatamente 8 caracteres atendendo todos os demais critérios",
  (campo: string) => {
    CadastrePage.fillPassword("Senh@123");
  },
);

When("acesso o link de termos de uso presente no checkbox", () => {
  cy.get('a[aria-label="Ir para termos de uso"]').click();
});

When("acesso o link de política de privacidade presente no checkbox", () => {
  cy.get('a[aria-label="Ir para política de privacidade"]').click();
});

When("preencho o campo {string} com uma senha válida", (campo: string) => {
  if (campo === "Senha") CadastrePage.fillPassword("Senh@123");
  if (campo === "Confirmar senha") CadastrePage.fillPasswordConfirm("Senh@123");
});

When(
  "aciono o botão de visualizar senha do campo {string}",
  (campo: string) => {
    if (campo === "Senha") CadastrePage.togglePasswordVisibility();
    if (campo === "Confirmar senha")
      CadastrePage.togglePasswordConfirmVisibility();
  },
);

When(
  "aciono novamente o botão de visualizar senha do campo {string}",
  (campo: string) => {
    if (campo === "Senha") CadastrePage.togglePasswordVisibility();
    if (campo === "Confirmar senha")
      CadastrePage.togglePasswordConfirmVisibility();
  },
);

When(
  "desmarco o checkbox de aceite dos termos de uso e política de privacidade",
  () => {
    CadastrePage.getAcceptPrivacyTerms().uncheck({ force: true });
  },
);

When("desmarco o checkbox de confirmação de idade mínima de 18 anos", () => {
  CadastrePage.getConfirmAge18().uncheck({ force: true });
});

// ─── Verificações / Então ─────────────────────────────────────

Then("devo ser redirecionada para a página de confirmação de cadastro", () => {
  cy.url().should("include", "/saude/paciente/cadastrar/verificando/");
});

Then("devo visualizar a mensagem {string}", (mensagem: string) => {
  cy.contains(mensagem).should("be.visible");
});

Then(
  "devo visualizar uma mensagem informando a obrigatoriedade do campo {string}",
  (campo: string) => {
    if (campo === "Nome") CadastrePage.shouldShowRequiredErrorOnFirstName();
    if (campo === "Sobrenome")
      CadastrePage.getErrorLastName().should(
        "contain.text",
        "Este campo é obrigatório.",
      );
  },
);

Then(
  "devo visualizar uma mensagem informando que o campo {string} está em formato inválido",
  (campo: string) => {
    if (campo === "E-mail") CadastrePage.getErrorEmail().should("be.visible");
  },
);

Then(
  "devo visualizar uma mensagem informando que o e-mail informado é inválido",
  () => {
    CadastrePage.getForm().contains(
      "O domínio do e-mail parece não existir ou não pode receber e-mails.",
    );
  },
);

Then(
  "devo visualizar uma mensagem informando que os e-mails não coincidem",
  () => {
    CadastrePage.getErrorEmailConfirm().should("be.visible");
  },
);

Then(
  "devo visualizar uma mensagem informando que o campo {string} contém caracteres inválidos",
  (campo: string) => {
    if (campo === "Nome") CadastrePage.getErrorFirstName().should("be.visible");
    if (campo === "Sobrenome")
      CadastrePage.getErrorLastName().should("be.visible");
  },
);

Then(
  "o indicador de critério {string} deve permanecer não atendido",
  (criterioKey: string) => {
    const criterioLabel = PASSWORD_CRITERIA[criterioKey as PasswordCriteriaKey];

    CadastrePage.getPasswordCriteriaItems()
      .contains(criterioLabel)
      .find("svg title")
      .should("contain.text", "Erro");
  },
);

Then(
  "todos os indicadores de critério devem estar marcados como atendidos",
  () => {
    CadastrePage.getPasswordCriteriaItems().each(($item) => {
      cy.wrap($item).find("svg title").should("not.contain.text", "Erro");
    });
  },
);

Then("devo visualizar o documento de termos de uso", () => {
  cy.url().should("include", "termos");
});

Then("devo visualizar o documento de política de privacidade", () => {
  cy.url().should("include", "privacidade");
});

Then("o conteúdo do campo {string} deve estar visível", (campo: string) => {
  const selector = campo === "Senha" ? "#password1" : "#password2";
  cy.get(selector).should("have.attr", "type", "text");
});

Then("o ícone do botão deve refletir o estado de senha visível", () => {
  cy.get("svg title").contains(PASSWORD_VISIBILITY.active).should("exist");
});

Then("o conteúdo do campo {string} deve estar oculto", (campo: string) => {
  const selector = campo === "Senha" ? "#password1" : "#password2";
  cy.get(selector).should("have.attr", "type", "password");
});

Then("o ícone do botão deve refletir o estado de senha oculta", () => {
  cy.get("svg title").contains(PASSWORD_VISIBILITY.inactive).should("exist");
});

Then(
  "devo visualizar uma mensagem informando que o consentimento é obrigatório",
  () => {
    cy.contains(MESSAGES_CADASTRE.requiredConsentTerms).should("be.visible");
  },
);

Then("o botão de cadastro deve permanecer desabilitado", () => {
  CadastrePage.isSubmitDisabled();
});

Then(
  "devo visualizar uma mensagem informando que é obrigatório ter 18 anos ou mais",
  () => {
    cy.contains(MESSAGES_CADASTRE.mimAge18).should("be.visible");
  },
);
