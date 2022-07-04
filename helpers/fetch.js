const BASE_URL = 'https://dev-creator-backoffice-api.shopcat.click/graphql?productId=53'

export async function fetchAPI(query, variables = {}) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  })
  return response.json();
}
