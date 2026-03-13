class LoginPage {
  // ─── Navegação ──────────────────────────────────────────────

  visit(): void {
    cy.visit("/");
  }

  goCadastre(): void {
    cy.get("button")
      .contains(/Criar conta/i)
      .click();
  }
}

export default new LoginPage();
