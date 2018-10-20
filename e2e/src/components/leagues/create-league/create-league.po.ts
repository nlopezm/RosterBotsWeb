import { browser, by, element } from 'protractor';

export class CreateLeaguePage {

  private league = {
    name: 'test' + (new Date().getMilliseconds()).toString(),
    starterPlayers: 10,
    substitutePlayers: 10,
    salaryCap: 5000
  };

  navigateTo() {
    return browser.get('/leagues/create');
  }

  fillForm(league: any = this.league) {
    element(by.css('[formControlName="name"]')).sendKeys(league.name);
    element(by.css('[formControlName="starterPlayers"]')).sendKeys(league.starterPlayers);
    element(by.css('[formControlName="substitutePlayers"]')).sendKeys(league.substitutePlayers);
    element(by.css('[formControlName="salaryCap"]')).sendKeys(league.salaryCap);
    element(by.css('.mat-fab')).click();
  }

  getPageTitleText() {
    return element(by.css('app-navbar')).getText();
  }

}
