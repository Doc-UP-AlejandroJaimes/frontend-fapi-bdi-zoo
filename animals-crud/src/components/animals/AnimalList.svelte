<script>
  import { onMount } from 'svelte';
  import { fetchAnimals, deleteAnimal, fetchAnimalDetail } from '../../services/animalService';
  import Pagination from '../../helpers/Pagination.svelte';
  import AnimalTable from './AnimalTable.svelte';
  import ConfirmationModal from './ConfirmationModal.svelte';
  import DetailsModal from './DetailsModal.svelte';
  import Alert from './Alert.svelte';

  export let animals = []; // Lista de animales desde el padre
  let totalAnimals = 0;
  let currentPage = 1;
  let pageSize = 3;
  let selectedAnimal = null;
  let animalToDelete = null;
  let isLoading = false;
  let error = null;
  let alertMessage = '';
  let alertTimeout;

  async function loadAnimals() {
    if (animals.length === 0) {
      // Solo carga si no se pasan datos desde el padre
      isLoading = true;
      error = null;
      try {
        const data = await fetchAnimals(currentPage, pageSize);
        animals = data.results;
        totalAnimals = data.total;
      } catch (err) {
        error = 'Failed to load animals';
        console.error(err);
      } finally {
        isLoading = false;
      }
    }
  }

  async function confirmDelete() {
    try {
      await deleteAnimal(animalToDelete.id);
      alertMessage = `Animal ${animalToDelete.nombre} eliminado correctamente.`;
      animalToDelete = null;
      clearTimeout(alertTimeout);
      alertTimeout = setTimeout(() => (alertMessage = ''), 3000); // Elimina la alerta después de 3 segundos
      await loadAnimals();
    } catch (err) {
      error = 'Failed to delete animal';
      console.error(err);
    }
  }

  async function viewAnimalDetails(id) {
    try {
      selectedAnimal = await fetchAnimalDetail(id);
    } catch (err) {
      error = 'Failed to fetch animal details';
      console.error(err);
    }
  }

  function changePage(newPage) {
    currentPage = newPage;
    loadAnimals();
  }

  function dismissAlert() {
    alertMessage = ''; // Cierra la alerta manualmente
    clearTimeout(alertTimeout); // Limpia el temporizador si aún está activo
  }

  onMount(loadAnimals);
</script>

<div class="container mx-auto p-6">
  <!-- Alerta de error -->
  {#if error}
    <div class="relative">
      <Alert type="error" message={error} />
      <button
        on:click={() => (error = null)}
        class="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
        aria-label="Cerrar alerta"
      >
        ✖
      </button>
    </div>
  {/if}

  <!-- Alerta de éxito -->
  {#if alertMessage}
    <div class="relative">
      <Alert type="success" message={alertMessage} />
      <button
        on:click={dismissAlert}
        class="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
        aria-label="Cerrar alerta"
      >
        ✖
      </button>
    </div>
  {/if}

  <!-- Tabla de animales -->
  {#if isLoading}
    <div class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
    </div>
  {:else}
    <AnimalTable
      {animals}
      onDelete={(animal) => (animalToDelete = animal)}
      onViewDetails={(id) => viewAnimalDetails(id)}
    />
  {/if}

  <!-- Modal de Confirmación -->
  {#if animalToDelete}
    <ConfirmationModal
      animal={animalToDelete}
      onCancel={() => (animalToDelete = null)}
      onConfirm={confirmDelete}
    />
  {/if}

  <!-- Modal View Details -->
  {#if selectedAnimal}
    <DetailsModal animal={selectedAnimal} onClose={() => (selectedAnimal = null)} />
  {/if}

  <!-- Paginación -->
  <Pagination
    currentPage={currentPage}
    totalPages={Math.ceil(totalAnimals / pageSize)}
    onPrevious={() => currentPage > 1 && changePage(currentPage - 1)}
    onNext={() =>
      currentPage < Math.ceil(totalAnimals / pageSize) && changePage(currentPage + 1)
    }
  />
</div>
