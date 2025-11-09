class SignupPage {
  get nameInput() { return cy.get('[data-qa="signup-name"]'); }
  get emailInput() { return cy.get('[data-qa="signup-email"]'); }
  get signupButton() { return cy.get('[data-qa="signup-button"]'); }

  signup(name, email) {
    this.nameInput.type(name);
    this.emailInput.type(email);
    this.signupButton.click();
  }
}
export default new SignupPage();