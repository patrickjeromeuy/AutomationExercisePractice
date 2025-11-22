class SignupPage {
  get nameInput() { return cy.get('[data-qa="signup-name"]'); }
  get emailInput() { return cy.get('[data-qa="signup-email"]'); }
  get signupButton() { return cy.get('[data-qa="signup-button"]'); }
  get titleRadio() { return cy.get('input[type="radio"][name="title"]'); }
  get passwordInput() { return cy.get('[data-qa="password"]') }
  get daysDropdown() { return cy.get('[data-qa="days"]'); }
  get monthsDropdown() { return cy.get('[data-qa="months"]'); }
  get yearsDropdown() { return cy.get('[data-qa="years"]'); }

  signupUser(name, email) {
    this.nameInput.type(name);
    this.emailInput.type(email);
    this.signupButton.click();
    this.selectGender(0, 1)
    this.selectDay(1, 32);
    this.selectMonth(1, 13);
    this.selectYear(1990, 2021);
  }

  selectGender(min, max) {
    this.titleRadio
      .then($radioButtons => {
        cy.getRandomInt(min, max)
          .then(randomIndex => {
            cy.wrap($radioButtons)
              .eq(randomIndex)
                .click()
          })
      });
  }

  selectDay(min, max) {
    this.daysDropdown
      .then($days => {
        cy.getRandomInt(min, max)
          .then(randomIndex => {
            cy.wrap($days)
              .select(randomIndex)
          })
      })
  }

  selectMonth(min, max) {
    this.monthsDropdown
      .then($months => {
        cy.getRandomInt(min, max)
          .then(randomIndex => {
            cy.wrap($months)
              .select(randomIndex)
          })
      })
  }

  selectYear(min, max) {
    this.yearsDropdown
      .then($years => {
        cy.getRandomInt(min, max)
          .then(randomIndex => {
            cy.wrap($years)
              .select(String(randomIndex))
          })
      })
  }

}
export default new SignupPage();