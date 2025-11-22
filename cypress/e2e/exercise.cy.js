import { faker } from '@faker-js/faker';

import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

const signupName = faker.person.fullName();
const signupEmail = faker.internet.email();

const loginEmail = 'mr.lawrence@protection.com'
const loginName = 'Mr Bean'

let months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];
let years = [];

let countries = [];

/*function getRandomInt(min, max) {
  min = Math.ceil(min);   // Ensure min is an integer
  max = Math.floor(max);  // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}*/

describe('Signup / Login', () => {
  beforeEach(() => {
    cy.visit('http://automationexercise.com/')
  })

  //Register User
  it.only('should create an account then delete account', () => {
    cy.contains('Signup / Login').click()
    cy.get(".signup-form h2").should('contain', "New User Signup!")
    /*cy.get('[data-qa="signup-name"]').type(signupName)
    cy.get('[data-qa="signup-email"]').type(signupEmail)
    cy.get('[data-qa="signup-button"]').click()*/
    SignupPage.signupUser(signupName, signupEmail)
    cy.get(".login-form h2").first().should('contain', "Enter Account Information")
    //cy.get('[type="radio"]').eq(getRandomInt(0,1)).check()
    //SignupPage.selectGender(0, 1)
    cy.get('[data-qa="name"]').should('have.value', signupName)
    cy.get('[data-qa="email"]').should('be.disabled')
    cy.get('[data-qa="email"]').should('have.value', signupEmail)
    cy.get('[data-qa="password"]').type('admin')

    /*cy.get('[data-qa="days"]')
    .find('option')
    .its('length')
    .then((optionsLength) => {
      const randomIndex = getRandomInt(1, optionsLength - 1);
      cy.get('[data-qa="days"]').select(randomIndex)
      cy.get('[data-qa="days"]')
      .find('option')
      .each(($option) => {
        const value = $option.attr('value');
        days.push(value);
      })
      .then(() => {
        cy.get('[data-qa="days"]').should('have.value', days[randomIndex])
      })
    });

    cy.get('[data-qa="months"]')
    .find('option')
    .its('length')
    .then((optionsLength) => {
      const randomIndex = getRandomInt(1, optionsLength - 1);
      cy.get('[data-qa="months"]').select(randomIndex)
      cy.get('[data-qa="months"]').find('option:selected').should('have.text', months[randomIndex - 1])
    });

    cy.get('[data-qa="years"]')
    .find('option')
    .its('length')
    .then((optionsLength) => {
      const randomIndex = getRandomInt(1, optionsLength - 1);
      cy.get('[data-qa="years"]').select(randomIndex)
      cy.get('[data-qa="years"]')
      .find('option')
      .each(($option) => {
        const value = $option.attr('value');
        years.push(value);
      })
      .then(() => {
        cy.get('[data-qa="years"]').should('have.value', years[randomIndex])
      })
    });*/

    cy.get('[type="checkbox"]').not('[disabled]').check()
    cy.get('[type="checkbox"]').not('[disabled]').should('be.checked')

    cy.get('[data-qa="first_name"]').type('Bean')
    cy.get('[data-qa="last_name"]').type('Sabine')
    cy.get('[data-qa="company"]').type('Bean Sabine')
    cy.get('[data-qa="address"]').type('Bean Sabine')
    cy.get('[data-qa="address2"]').type('Bean Sabine')

    cy.get('[data-qa="country"]')
    .find('option')
    .its('length')
    .then((optionsLength) => {
      const randomIndex = getRandomInt(0, optionsLength - 1);
      cy.get('[data-qa="country"]').select(randomIndex)
      cy.get('[data-qa="country"]')
      .find('option')
      .each(($option) => {
        const value = $option.attr('value');
        countries.push(value);
      })
      .then(() => {
        cy.get('[data-qa="country"]').should('have.value', countries[randomIndex])
      })
    });

    cy.get('[data-qa="state"]').type('Beane')
    cy.get('[data-qa="city"]').type('Sabine City')
    cy.get('[data-qa="zipcode"]').type('Sabine City')
    cy.get('[data-qa="mobile_number"]').type('091112222223232')
    cy.get('[data-qa="create-account"]').click()

    cy.get('[data-qa="account-created"]').should('contain', "Account Created!")
    cy.get('[data-qa="continue-button"]').click()

    cy.get('.nav.navbar-nav').last().should('contain', signupName)
    //cy.get('a[href="/logout"]').click();
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('contain', "Account Deleted!")
    cy.get('[data-qa="continue-button"]').click()
  })
  //Login User with correct email and password
  it('should login the user', () => {
    cy.contains('Signup / Login').click()
    cy.get(".login-form h2").should('contain', "Login to your account")
    LoginPage.login(loginEmail, "admin")
    cy.get('.nav.navbar-nav').last().should('contain', loginName)
    //cy.get('a[href="/delete_account"]').click();
    //cy.get('[data-qa="account-deleted"]').should('contain', "Account Deleted!")
  })
  //Login User with incorrect email and password
  it('should display error message', () => {
    cy.contains('Signup / Login').click()
    cy.get(".login-form h2").should('contain', "Login to your account")
    cy.get('[data-qa="login-email"]').type('randomrandom@mmm.com')
    cy.get('[data-qa="login-password"]').type('admin')
    cy.get('[data-qa="login-button"]').click()
    cy.get('.login-form p').should('contain', "Your email or password is incorrect!")
  })
  //Logout User
  it('should logout the user', () => {
    cy.contains('Signup / Login').click()
    cy.get(".login-form h2").should('contain', "Login to your account")
    LoginPage.login(loginEmail, 'admin')
    /*cy.get('[data-qa="login-email"]').type(loginEmail)
    cy.get('[data-qa="login-password"]').type('admin')
    cy.get('[data-qa="login-button"]').click()*/
    cy.get('.nav.navbar-nav').last().should('contain', 'Logged in as ' + loginName)
    HomePage.logout()
    cy.url().should('eq', 'https://automationexercise.com/login')
  })
  //Register User with existing email
  it('should not register the user', () => {
    cy.contains('Signup / Login').click()
    cy.get(".signup-form h2").should('contain', "New User Signup!")
    cy.get('[data-qa="signup-name"]').type(signupName)
    cy.get('[data-qa="signup-email"]').type(loginEmail)
    cy.get('[data-qa="signup-button"]').click()
    cy.get('.signup-form p').should('contain', "Email Address already exist!")
  })
  //Contact Us Form
  it('should send contact us form', () => {
    cy.get('a[href="/contact_us"]').click();
    cy.get(".contact-form h2").should('contain', "Get In Touch")
    cy.get('[data-qa="name"]').type(signupName)
    cy.get('[data-qa="email"]').type(signupEmail)
    cy.get('[data-qa="subject"]').type('Lorem ipsum')
    cy.get('[data-qa="message"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
    cy.get('[data-qa="submit-button"]').click()
    cy.on('window:alert', (text) => {
      expect(text).to.eq('Press OK to proceed!');
    });
    cy.get(".contact-form").should('contain', "Success! Your details have been submitted successfully.")
    cy.get('#form-section a[href="/"]').click();
    cy.url().should('eq', 'https://automationexercise.com/')
  })
  //Verify Test Cases Page
  it('should redirect user to test cases page', () => {
    cy.get('.nav.navbar-nav a[href="/test_cases"]').click();
    cy.url().should('eq', 'https://automationexercise.com/test_cases')
  })
})