
import { browser, by, element } from 'protractor';

export class CreatePlayerPage {

  navigateTo() {
    return browser.get('/leagues/1/teams/1/players/create');
  }

  getPageTitleText() {
    return element(by.css('app-navbar')).getText();
  }

}
