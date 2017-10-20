import { TournamentJsPage } from './app.po';

describe('tournament-js App', () => {
  let page: TournamentJsPage;

  beforeEach(() => {
    page = new TournamentJsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
