import { CreateTeamPage } from './create-team.po';

describe('workspace-project App', () => {
  let page: CreateTeamPage;

  beforeEach(() => {
    page = new CreateTeamPage();
  });

  it('should display Create Team title', () => {
    page.navigateTo();
    expect(page.getPageTitleText()).toContain('Create team');
  });

});
