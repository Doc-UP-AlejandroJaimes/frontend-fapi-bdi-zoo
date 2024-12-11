<script>
  import { onMount } from 'svelte';
  import { fetchCuidadores } from '../../services/cuidadoresService';
  import { fetchHabitats } from '../../services/habitatService';
  import { fetchEspecies } from '../../services/especieService';
  import { createAnimal } from '../../services/animalService';
  import Alert from './Alert.svelte';
    
  export let onSuccess; // Callback para notificar éxito
  export let onClose; // Callback para cerrar el modal

  let cuidadores = [];
  let habitats = [];
  let especies = [];

  let form = {
    nombre: '',
    fechanac: '',
    idcuidador: null,
    idhabitat: null,
    idespecie: null,
  };

  let isSubmitting = false;
  let successMessage = ''; // Mensaje de éxito
  let errorMessage = ''; // Mensaje de error

  async function loadData() {
    try {
      cuidadores = await fetchCuidadores();
      habitats = await fetchHabitats();
      especies = await fetchEspecies();
    } catch (error) {
      errorMessage = 'Error cargando datos.';
      console.error(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true;
    successMessage = '';
    errorMessage = '';

    try {
      const response = await createAnimal(form);
      successMessage = `Animal "${response.nombre}" creado correctamente.`; // Mostramos mensaje de éxito
      setTimeout(() => {
        successMessage = '';
        onClose(); // Cerramos el modal después de la alerta
      }, 3000);
      form = { nombre: '', fechanac: '', idcuidador: null, idhabitat: null, idespecie: null }; // Resetear formulario
      onSuccess?.(successMessage); // Notificar éxito al padre
    } catch (error) {
      errorMessage = 'Error creando animal.';
      console.error(error);
    } finally {
      isSubmitting = false;
    }
  }

  onMount(loadData);
</script>

<div class="space-y-6">
  <!-- Alertas de Éxito y Error -->
  {#if successMessage}
    <Alert type="success" message={successMessage} />
  {/if}
  {#if errorMessage}
    <Alert type="error" message={errorMessage} />
  {/if}

  <!-- Formulario -->
  <form on:submit={handleSubmit} class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Nombre -->
    <div class="col-span-1 md:col-span-2">
      <label for="nombre" class="block text-gray-600 font-medium mb-1">Nombre</label>
      <input
        type="text"
        id="nombre"
        bind:value={form.nombre}
        required
        placeholder="Ingresa el nombre del animal"
        class="block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- Fecha de Nacimiento -->
    <div class="col-span-1">
      <label for="fechanac" class="block text-gray-600 font-medium mb-1">Fecha de Nacimiento</label>
      <input
        type="date"
        id="fechanac"
        bind:value={form.fechanac}
        required
        class="block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- Cuidador -->
    <div class="col-span-1">
      <label for="idcuidador" class="block text-gray-600 font-medium mb-1">Cuidador</label>
      <select
        id="idcuidador"
        bind:value={form.idcuidador}
        required
        class="block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled selected>Seleccionar Cuidador</option>
        {#each cuidadores as cuidador}
          <option value={cuidador.id}>{cuidador.nombre}</option>
        {/each}
      </select>
    </div>

    <!-- Hábitat -->
    <div class="col-span-1">
      <label for="idhabitat" class="block text-gray-600 font-medium mb-1">Hábitat</label>
      <select
        id="idhabitat"
        bind:value={form.idhabitat}
        required
        class="block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled selected>Seleccionar Hábitat</option>
        {#each habitats as habitat}
          <option value={habitat.id}>{habitat.nombre}</option>
        {/each}
      </select>
    </div>

    <!-- Especie -->
    <div class="col-span-1 md:col-span-2">
      <label for="idespecie" class="block text-gray-600 font-medium mb-1">Especie</label>
      <select
        id="idespecie"
        bind:value={form.idespecie}
        required
        class="block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled selected>Seleccionar Especie</option>
        {#each especies as especie}
          <option value={especie.id}>{especie.nombre}</option>
        {/each}
      </select>
    </div>

    <!-- Botones -->
    <div class="col-span-1 md:col-span-2 flex justify-end space-x-4">
      <button
        type="button"
        on:click={onClose}
        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:ring focus:ring-gray-300"
      >
        Cerrar
      </button>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creando...' : 'Crear Animal'}
      </button>
    </div>
  </form>
</div>
