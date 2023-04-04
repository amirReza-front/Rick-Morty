import { BASE_API_URL } from "./constance";

export function fetchData(query: string): Promise<any> {

  const response = fetch(BASE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({query})
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        // Handle data here if needed
      }
      return data;
    })
    .catch((e) => {
      console.log(e);
    });

  return response;
}