class LoginPage {
      get emailInput() { return cy.get('[data-qa="login-email"]'); }
      get passwordInput() { return cy.get('[data-qa="login-password"]'); }
      get loginButton() { return cy.get('[data-qa="login-button"]') }

      login(email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.loginButton.click();
      }
    }
    export default new LoginPage();