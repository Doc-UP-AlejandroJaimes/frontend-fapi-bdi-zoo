import { API_BASE_URL } from '../config/config.js';

export async function fetchEspecies() {
  const response = await fetch(`${API_BASE_URL}/especies/`);
  const data = await response.json();
  return data.results;
}
