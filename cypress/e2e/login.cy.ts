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
    const confirm = cy.get('app-auth-confirm-login', { timeout: 12_000 }).should('be.visible');
    confirm.get('button').should('contain', 'Continue as');
    confirm.click();
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
  beforeEach(() => {
    loginPage.navigateToRoot();
  });

  it('displays "CATcher" in header bar', async () => {
    loginPage.getTitle().should('equal', `CATcher v${AppConfig.version}\nreceipt\nmail`);
  });

  it('allows users to authenticate themselves', async () => {
    loginPage.login();
    loginPage.getConfirmationScreenTitle().should('contain', 'Confirm Login Account');
    // cy.pause();
    loginPage.confirmUser();
  });
});
