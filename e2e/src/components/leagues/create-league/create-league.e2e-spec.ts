import { CreateLeaguePage } from './create-league.po';

describe('workspace-project App', () => {
  let page: CreateLeaguePage;

  beforeEach(() => {
    page = new CreateLeaguePage();
  });

  it('should display Create League title', () => {
    page.navigateTo();
    expect(page.getPageTitleText()).toContain('Create');
  });

  it('when creating a League should redirect to Leagues section', () => {
    page.navigateTo();
    page.fillForm();
    expect(page.getPageTitleText()).toContain('Leagues');
  });


});
