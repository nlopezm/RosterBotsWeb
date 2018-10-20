import { browser, by, element } from 'protractor';

export class CreateTeamPage {

  name: string = 'test' + (new Date().getMilliseconds()).toString();

  navigateTo() {
    return browser.get('/leagues/1/teams/create');
  }

  fillForm(team: any = this.name) {
    element(by.css('[formControlName="name"]')).sendKeys(this.name);
    element(by.css('.mat-fab')).click();
  }

  getPageTitleText() {
    return element(by.css('app-navbar')).getText();
  }

}
