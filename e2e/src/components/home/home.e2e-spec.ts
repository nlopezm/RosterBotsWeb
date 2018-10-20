import { HomePage } from './home.po';

describe('workspace-project App', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Welcome to the Roster Bots website!');
  });

});
