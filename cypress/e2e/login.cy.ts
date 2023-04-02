/// <reference types="cypress" />
import { AppConfig } from '../../src/environments/environment';

const loginPage = {
  navigateToRoot: () => {
    return cy.visit('/');
  },

  getTitle: () => {
    return cy.get('.app-root').get('.app-layout-header');
  },

  getConfirmationScreenTitle: () => {
    return cy.get('.login-title', { timeout: 12_000 });
  },

  login: () => {
    loginPage.selectSession();
  },

  confirmUser: () => {
    // cy.wait(ExpectedConditions.presenceOf(cy.get('.sign-in-button')))
    const confirm = cy.get('.mat-card').should('be.visible').contains('Confirm Login Account');
    confirm.get('.sign-in-button').should('be.visible').should('exist').contains('Continue as').click();
  },

  selectSession: () => {
    const profiles = cy.get('.mat-select-placeholder');
    profiles.click();

    const options = cy.get('.mat-option').eq(1);
    options.click();

    const button = cy.get('.sign-in-button');
    button.click();
  },

  bypassAuthentication: () => {
    loginPage.login();
    loginPage.confirmUser();
  }
};

describe("CATcher's Login Page", () => {
  before(() => {
    loginPage.navigateToRoot();
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  // it('displays "CATcher" in header bar', async () => {
  //   loginPage.getTitle().should('equal', `CATcher v${AppConfig.version}\nreceipt\nmail`);
  // });

  it('allows users to authenticate themselves', async () => {
    loginPage.login();
    loginPage.getConfirmationScreenTitle().should('contain', 'Confirm Login Account');
    loginPage.confirmUser();
  });
});
