export const CADASTRE_SELECTORS = {
  form: "form",

  // Campos de texto
  firstName: "#firstName",
  lastName: "#lastName",
  email: "#email",
  emailConfirm: "#email2",
  password: "#password1",
  passwordConfirm: "#password2",

  // Botões de visibilidade de senha
  togglePasswordVisibility: 'input#password1 ~ div[role="button"]',
  togglePasswordConfirmVisibility: 'input#password2 ~ div[role="button"]',

  // Checkboxes
  checkboxPrivacyTerms: "#acceptedPrivacyDocument",
  checkboxAge18: "#is18YearsOldOrMore",

  // Botões de ação
  btnSubmit: 'button[aria-label="Criar cadastro no site Lacrei Saúde"]',
  btnBack: 'button[aria-label="Voltar para página de login"]',

  // Mensagens de erro por campo
  errorFirstName: "div:has(> #firstName) ~ div p",
  errorLastName: "div:has(> #lastName) ~ div p",
  errorEmail: "div:has(> #email) ~ div p",
  errorEmailConfirm: "div:has(> #email2) ~ div p",
  errorPassword: "div:has(> #password1) ~ div p",
  errorPasswordConfirm: "div:has(> #password2) ~ div p",

  // Critérios de validação de senha
  passwordCriteriaList: "#password1-criteria",
  passwordCriteriaItems: "#password1-criteria li",

  // Links de termos e privacidade
  linkTermsOfUse: 'a[aria-label="Ir para termos de uso"]',
  linkPrivacyPolicy: 'a[aria-label="Ir para política de privacidade"]',
};
