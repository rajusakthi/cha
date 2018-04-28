import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for Cha-angular', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be Cha-angular', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('Cha-angular');
    })
  });

  it('navbar-brand should be cha@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('cha@0.0.1');
  });

  
    it('House component should be loadable',() => {
      page.navigateTo('/House');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('House');
    });

    it('House table should have 8 columns',() => {
      page.navigateTo('/House');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });

  

});
