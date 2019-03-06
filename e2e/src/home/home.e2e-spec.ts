import { HomePage } from './home.po';
import { browser } from 'protractor';

describe('Home Page', () => {
  let page: HomePage;

  beforeAll(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('Should have phone input control', () => {
    expect(page.phoneControl.isPresent()).toBeTruthy();
  });

  it('Should have call button disabled by default', () => {
    expect(page.btnCall.isPresent()).toBeTruthy();
    expect(page.btnCall.isEnabled()).toBeFalsy();
  });

  it('Should have submit button', () => {
    expect(page.btnSubmit.isPresent()).toBeTruthy();
  });

  it('Incorrect phone number should show error messsage', () => {
    page.phoneInput.clear();
    page.phoneInput.sendKeys('+14244444').then(() => {
      page.btnSubmit.click();
      expect(page.message.getText()).toEqual('Phone number is invalid');
    });
  });

  it('Correct phone number should show valid messsage and enable call button', () => {
    page.phoneInput.clear();
    page.phoneInput.sendKeys('14244444444').then(() => {
      page.btnSubmit.click();
      expect(page.message.getText()).toEqual('Submitted phone number: 1 (424) 444-4444');
      expect(page.btnCall.isEnabled()).toBeTruthy();
    });
  });

});
