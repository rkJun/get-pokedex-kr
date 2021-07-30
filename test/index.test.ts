import puppeteer from 'puppeteer';
import { POKEDEX_KR_URL } from '../src/constants';

test('POKEDEX_KR_URL status check', async () => {
  jest.setTimeout(30000);

  const browser = await puppeteer.launch();
  const page: puppeteer.Page = await browser.newPage();
  const response = await page.goto(POKEDEX_KR_URL);
  const status = response.status();
  expect(status).toEqual(200);
});
