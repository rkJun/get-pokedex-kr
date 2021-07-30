import fs from 'fs';
import puppeteer, { Page } from 'puppeteer';
import cheerio from 'cheerio';
import { POKEDEX_KR_URL } from './constants';
import { Pokedex } from './interfaces';

(async () => {
  const browser = await puppeteer.launch();
  const page: puppeteer.Page = await browser.newPage();
  await page.goto(POKEDEX_KR_URL);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  const scrollHeight = 'document.body.scrollHeight';
  let windowInnerHeight = await page.evaluate('window.innerHeight');
  let previousScrollHeight = 0;
  let nextScrollHeight = 0;

  let count = 0;
  do {
    previousScrollHeight = await page.evaluate(scrollHeight);
    await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
    await page.waitForFunction(`${scrollHeight} > ${previousScrollHeight}`, {
      timeout: 30000,
    });
    nextScrollHeight = await page.evaluate(scrollHeight);

    // console.log('while nextScrollHeight :>> ', nextScrollHeight, previousScrollHeight);
    count++;
  } while (nextScrollHeight > previousScrollHeight + windowInnerHeight);

  console.log('total scroll count :>> ', count);

  const content: string = await page.content();
  const $ = cheerio.load(content);

  const pokedexList: Pokedex[] = [];
  $('#pokedexlist li').each((i, el) => {
    const id: string = $(el).attr('id').replace('#pokedex_', '');
    const img: string = $(el).find('img').attr('src');
    const [no, name] = $(el).find('h3').text().split(' ');
    const subName: string = $(el).find('.bx-txt>p').text();
    const types = $(el)
      .find('span.badge')
      .map((i, el) => $(el).text())
      .toArray();
    const url = `https://pokemonkorea.co.kr/pokedex/view/${id}?word=&characters=&area=&snumber=1&snumber2=898&typetextcs=&sortselval=number%20asc,number_count%20asc`;

    const pokedex: Pokedex = {
      id,
      img,
      no,
      name,
      subName,
      types,
      url,
    };

    pokedexList.push(pokedex);
  });

  const outputFileName = './output/pokedexList.json';

  fs.writeFileSync(outputFileName, JSON.stringify(pokedexList, null, 2));

  console.log('successfully finished.');
  await browser.close();
})();
