import { API_BASE_URL } from '../config/config.js';

export async function fetchCuidadores() {
  const response = await fetch(`${API_BASE_URL}/cuidadores/`);
  const data = await response.json();
  return data.results;
}
