export interface Pokedex {
  id: string;
  img: string | URL;
  no: string;
  name: string;
  subName?: string;
  types: string[];
  url: string | URL;
}
