import { browser, by, element, ElementFinder } from 'protractor';

export class HomePage {

  navigateTo() {
    return browser.get('/');
  }

  get phoneControl(): ElementFinder {
    return element(by.tagName('app-phone-input'));
  }

  get phoneInput(): ElementFinder {
    return element(by.className('phone-number'));
  }

  get btnCall(): ElementFinder {
    return element(by.className('btn-call'));
  }

  get btnSubmit(): ElementFinder {
    return element(by.className('btn-submit'));
  }

  get message(): ElementFinder {
    return element(by.tagName('h4'));
  }

}
