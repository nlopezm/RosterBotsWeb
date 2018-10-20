import { CreatePlayerPage } from './create-player.po';

describe('workspace-project App', () => {
  let page: CreatePlayerPage;

  beforeEach(() => {
    page = new CreatePlayerPage();
  });

  it('should display Create Player title', () => {
    page.navigateTo();
    expect(page.getPageTitleText()).toContain('Create player');
  });

});
