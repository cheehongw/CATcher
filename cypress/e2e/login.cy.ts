/// <reference types="cypress" />
import { AppConfig } from '../../src/environments/environment';

const loginPage = {
  navigateToRoot: () => {
    return cy.visit('/');
  },

  getTitle: () => {
    return cy.get('app-layout-header');
  },

  getConfirmationScreenTitle: () => {
    return cy.get('.login-title');
  },

  login: () => {
    loginPage.selectSession();
  },

  confirmUser: () => {
    // cy.wait(ExpectedConditions.presenceOf(cy.get('.sign-in-button')))
    const confirm = cy.get('.sign-in-button');
    confirm.click();
  },

  selectSession: () => {
    const profiles = cy.get('app-profiles');

    profiles.click();
    const options = cy.get('.mat-select-arrow').eq(1);
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
    loginPage.getConfirmationScreenTitle().should('equal', 'Confirm Login Account');
    loginPage.confirmUser();
  });
});
