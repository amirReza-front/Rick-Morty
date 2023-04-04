export let baseObj = {
    data: {
      characters: {
        info: {
          count: 0,
          next: 0,
          pages: 0,
          prev: null,
        },
        results: [],
      },
    },
    singlePageData: {
      id: 0,
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
      image: "",
      created:"",
      origin: {
        name: "",
        url: "",
      },
      location: {
        name: "",
        url: "",
      },
      episode: [],
    },
  }
  export const BASE_API_URL = 'https://rickandmortyapi.com/graphql'