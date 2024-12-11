<script>
    export let animal;
    export let onCancel;
    export let onConfirm;
  </script>
  
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">
        ¿Está seguro de eliminar al animal <span class="text-red-500">{animal.nombre}</span>?
      </h2>
      <div class="flex justify-end space-x-4">
        <button
          on:click={onCancel}
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          on:click={onConfirm}
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
  