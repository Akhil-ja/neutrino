const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = 'https://trackapi.nutritionix.com/v2';

const headers = {
  'x-app-id': APP_ID,
  'x-app-key': APP_KEY,
  'Content-Type': 'application/json',
};

export const searchInstant = async (query) => {
  const response = await fetch(`${BASE_URL}/search/instant`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getNaturalNutrients = async (query) => {
  const response = await fetch(`${BASE_URL}/natural/nutrients`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getItemById = async (nix_item_id) => {
  const response = await fetch(`${BASE_URL}/search/item?nix_item_id=${nix_item_id}`, {
    method: 'GET',
    headers: headers,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
