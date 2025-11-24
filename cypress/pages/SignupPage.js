class SignupPage {
  //Sign Up
  get nameInput() { return cy.get('[data-qa="signup-name"]'); }
  get emailInput() { return cy.get('[data-qa="signup-email"]'); }
  get signupButton() { return cy.get('[data-qa="signup-button"]'); }
  //Account Information
  get titleRadio() { return cy.get('input[type="radio"][name="title"]'); }
  get fullName() { return cy.get('[data-qa="name"]'); }
  get email() { return cy.get('[data-qa="email"]'); }
  get passwordInput() { return cy.get('[data-qa="password"]') }
  get daysDropdown() { return cy.get('[data-qa="days"]'); }
  get monthsDropdown() { return cy.get('[data-qa="months"]'); }
  get yearsDropdown() { return cy.get('[data-qa="years"]'); }
  //Address Information
  get firstnameInput() { return cy.get('[data-qa="first_name"]') }
  get lastnameInput() { return cy.get('[data-qa="last_name"]') }
  get companyInput() { return cy.get('[data-qa="company"]') }
  get addressoneInput() { return cy.get('[data-qa="address"]') }
  get addresstwoInput() { return cy.get('[data-qa="address2"]') }

  signupUser(name, email) {
    this.nameInput.type(name);
    this.emailInput.type(email);
    this.signupButton.click();
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

  enterPassword(password) {
    this.passwordInput.type(password);
  }

  selectDay(day) {
    this.daysDropdown.select(day);
  }

  selectMonth(month) {
    this.monthsDropdown.select(month);
  }

  selectYear(year) {
    this.yearsDropdown.select(String(year));
  }

  enterFirstname(firstName) {
    this.firstnameInput.type(firstName);
  }

  enterLastname(lastName) {
    this.lastnameInput.type(lastName);
  }

  enterCompany(company) {
    this.companyInput.type(company);
  }

  enterAddressone(addressOne) {
    this.addressoneInput.type(addressOne);
  }

  enterAddresstwo(addressTwo) {
    this.addresstwoInput.type(addressTwo);
  }

}
export default new SignupPage();