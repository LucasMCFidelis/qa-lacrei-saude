import { CADASTRE_SELECTORS as S } from "../support/selectors/cadastreSelectors";

import LoginPage from "./LoginPage";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
}

class CadastrePage {
  // ─── Navegação ──────────────────────────────────────────────

  visit(): void {
    LoginPage.visit();
    LoginPage.goCadastre();
  }

  // ─── Preenchimento de campos ─────────────────────────────────

  fillFirstName(value: string): void {
    cy.get(S.firstName).clear().type(value);
  }

  fillLastName(value: string): void {
    cy.get(S.lastName).clear().type(value);
  }

  fillEmail(value: string): void {
    cy.get(S.email).clear().type(value);
  }

  fillEmailConfirm(value: string): void {
    cy.get(S.emailConfirm).clear().type(value);
  }

  fillPassword(value: string): void {
    cy.get(S.password).clear().type(value);
  }

  fillPasswordConfirm(value: string): void {
    cy.get(S.passwordConfirm).clear().type(value);
  }

  // ─── Ações sobre checkboxes ──────────────────────────────────

  acceptPrivacyTerms(): void {
    this.getAcceptPrivacyTerms().check({ force: true });
  }

  confirmAge18(): void {
    this.getConfirmAge18().check({ force: true });
  }

  acceptAllTerms(): void {
    this.acceptPrivacyTerms();
    this.confirmAge18();
  }

  // ─── Visibilidade de senha ────────────────────────────────────

  togglePasswordVisibility(): void {
    cy.get(S.togglePasswordVisibility).click();
  }

  togglePasswordConfirmVisibility(): void {
    cy.get(S.togglePasswordConfirmVisibility).click();
  }

  // ─── Submissão e navegação ────────────────────────────────────

  submit(): void {
    cy.get(S.btnSubmit).click();
  }

  goBack(): void {
    cy.get(S.btnBack).click();
  }

  // ─── Fluxo completo ──────────────────────────────────────────

  fillForm({
    firstName,
    lastName,
    email,
    emailConfirm,
    password,
    passwordConfirm,
  }: FormData): void {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillEmail(email);
    this.fillEmailConfirm(emailConfirm);
    this.fillPassword(password);
    this.fillPasswordConfirm(passwordConfirm);
  }

  registerUser(userData: FormData): void {
    this.fillForm(userData);
    this.acceptAllTerms();
    this.submit();
  }

  // ─── Assertions / Getters ─────────────────────────────────────

  getForm(): Cypress.Chainable {
    return cy.get(S.form);
  }

  getErrorFirstName(): Cypress.Chainable {
    return cy.get(S.errorFirstName);
  }

  getErrorLastName(): Cypress.Chainable {
    return cy.get(S.errorLastName);
  }

  getErrorEmail(): Cypress.Chainable {
    return cy.get(S.errorEmail);
  }

  getErrorEmailConfirm(): Cypress.Chainable {
    return cy.get(S.errorEmailConfirm);
  }

  getErrorPassword(): Cypress.Chainable {
    return cy.get(S.errorPassword);
  }

  getErrorPasswordConfirm(): Cypress.Chainable {
    return cy.get(S.errorPasswordConfirm);
  }

  getPasswordCriteriaItems(): Cypress.Chainable {
    return cy.get(S.passwordCriteriaItems);
  }

  isSubmitDisabled(): Cypress.Chainable {
    return cy.get(S.btnSubmit).should("be.disabled");
  }

  isSubmitEnabled(): Cypress.Chainable {
    return cy.get(S.btnSubmit).should("not.be.disabled");
  }

  getAcceptPrivacyTerms(): Cypress.Chainable {
    return cy.get(S.checkboxPrivacyTerms);
  }

  getConfirmAge18(): Cypress.Chainable {
    return cy.get(S.checkboxAge18);
  }

  shouldShowRequiredErrorOnFirstName(): void {
    this.getErrorFirstName().should(
      "contain.text",
      "Este campo é obrigatório.",
    );
  }

  shouldShowPasswordCriteriaCount(count: number): void {
    this.getPasswordCriteriaItems().should("have.length", count);
  }
}

export default new CadastrePage();
