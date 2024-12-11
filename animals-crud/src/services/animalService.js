import { API_BASE_URL } from '../config/config.js';

export async function fetchAnimals(page = 1, pageSize = 10) {
  const response = await fetch(`${API_BASE_URL}/animales/?page=${page}&pageSize=${pageSize}`);
  const data = await response.json();
  return data;
}

export async function fetchAnimalDetail(id) {
  const response = await fetch(`${API_BASE_URL}/animales/${id}`);
  const data = await response.json();
  return data;
}

export async function createAnimal(animal) {
  const response = await fetch(`${API_BASE_URL}/animales/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animal),
  });
  if (!response.ok) {
    throw new Error('Error creating animal');
  }
  return response.json();
}

export async function deleteAnimal(id) {
  console.log('deleteAnimal', id);
  const response = await fetch(`${API_BASE_URL}/animales/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response.json());
  if (!response.ok) {
    throw new Error('Error deleting animal');
  }
}
