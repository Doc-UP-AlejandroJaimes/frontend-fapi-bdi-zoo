<script>
  import { onMount } from 'svelte'; // Importamos onMount de Svelte
  import AnimalList from '../components/animals/AnimalList.svelte';
  import AnimalForm from '../components/animals/AnimalForm.svelte';
  import Alert from '../components/animals/Alert.svelte';
  import { API_BASE_URL } from '../config/config.js';

  let showModal = false; // Controla si el modal de creación está abierto
  let alertMessage = ''; // Mensaje de alerta
  let animals = []; // Lista de animales compartida entre los componentes
  let alertTimeout;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  // Refrescar la lista de animales desde la API
  async function refreshAnimals() {
    try {
      const response = await fetch(`${API_BASE_URL}/animales/`);
      const data = await response.json();
      animals = data.results || []; // Aseguramos que siempre sea un array
    } catch (error) {
      console.error('Error al cargar animales:', error);
    }
  }

  // Mostrar mensaje de éxito
  function showSuccessMessage(message) {
    alertMessage = message;
    clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
      alertMessage = '';
    }, 3000);
  }

  // Cerrar alerta manualmente
  function dismissAlert() {
    alertMessage = '';
    clearTimeout(alertTimeout);
  }

  // Cargar la lista de animales al montar el componente
  onMount(refreshAnimals);
</script>

<div class="container mx-auto p-6">
  <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">Animal Management</h1>

  <!-- Botón para abrir el modal -->
  <div class="text-right mb-4">
    <button
      class="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:ring focus:ring-green-300 inline-flex items-center space-x-2"
      on:click={openModal}
      aria-label="Agregar animal"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <span>Animal</span>
    </button>
  </div>

  <!-- Alerta -->
  {#if alertMessage}
    <div class="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">
      {alertMessage}
    </div>
  {/if}

  <!-- Modal para crear animal -->
  {#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        <!-- Botón de cerrar en la esquina superior derecha -->
        <button
          on:click={closeModal}
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          aria-label="Cerrar modal"
        >
          ✖
        </button>

        <h2 class="text-2xl font-bold text-gray-700 mb-4">Crear Animal</h2>
        <AnimalForm
          onClose={closeModal}
          onSuccess={(message) => {
            showSuccessMessage(message);
            refreshAnimals();
          }}
        />
      </div>
    </div>
  {/if}

  <!-- Tabla de animales -->
  <AnimalList {animals}/>
</div>
