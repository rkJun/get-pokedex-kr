# get-pokedex-kr
## 소개
- 포켓몬 코리아 사이트의 포켓몬 도감을 크롤링, JSON 으로 출력해주는 소스입니다.
- 크롤링 주소 : https://pokemonkorea.co.kr/pokedex
- [puppeteer](https://github.com/puppeteer/puppeteer) 로 작성하였습니다.
- 최종  json 파일은 `output` 폴더내에 `pokedexList.json` 라는 파일명으로 저장되어 있습니다.
- 현재 해당 사이트는 요청당 18개의 포켓몬을 제공하고 있어, 총 60회 정도의 요청을 보내므로, 사이트에 부하를 줄 수 있습니다. (총 데이터 1081건) 그러므로 테스트/스터디 용도 외에 다른 용도 사용을 자제하여 주시기 바랍니다.
- 사이트 부하 발생등 상기 이유로, 포켓몬 상세 페이지에 있는 내용은 가져오지 않습니다. (총 데이터 1801건에 대한 추가 요청 발생해버리는 문제)
- 이미 https://pokeapi.co/ 라는 곳에서 포켓몬에 대한 api 를 제공하고 있지만, 한글 공식 정보를 가져오고 싶어 만들었습니다.
## 사용방법
- 소스를 내려 받은 뒤 `npm run build` 후 `npm run start` 하여 실행
- 실행시 포켓몬 도감을 크롤링하여, 완료시에 output/pokedexList.json 파일을 생성합니다.

## Response: Pokedex Array
```
export interface Pokedex {
  id: string;
  img: string | URL;
  no: string;
  name: string;
  subName?: string;
  types: string[];
  url: string | URL;
}
```
```
example
[
  {
    "id": "1",
    "img": "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000101.png",
    "no": "No.001",
    "name": "이상해씨",
    "subName": "",
    "types": [
      "풀",
      "독"
    ],
    "url": "https://pokemonkorea.co.kr/pokedex/view/1?word=&characters=&area=&snumber=1&snumber2=898&typetextcs=&sortselval=number%20asc,number_count%20asc"
  },
  ...
]
```