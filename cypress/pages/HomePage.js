class HomePage {
    get logoutButton() { return cy.get('a[href="/logout"]'); }

    logout() {
        this.logoutButton.click();
    }
}

export default new HomePage();