import { AngularPwaStarterPage } from './app.po';

describe('angular-pwa-starter App', () => {
  let page: AngularPwaStarterPage;

  beforeEach(() => {
    page = new AngularPwaStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
