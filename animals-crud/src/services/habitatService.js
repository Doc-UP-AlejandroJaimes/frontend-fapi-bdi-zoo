import { API_BASE_URL } from '../config/config.js';

export async function fetchHabitats() {
  const response = await fetch(`${API_BASE_URL}/habitats/`);
  const data = await response.json();
  return data.results;
}
