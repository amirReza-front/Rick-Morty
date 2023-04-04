export interface IcharacterProps {
  data: {
    characters: {
      info: {
        count: number;
        next: number;
        pages: number;
        prev: any;
      };
      results: ResultsChar[];
    };
  };
  singlePageData: IsingleChars;
}
export interface ResultsChar {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode?: string[];
}
export interface IsingleChars {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: string[];
}
