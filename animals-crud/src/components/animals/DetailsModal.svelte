<script>
    export let animal;
    export let onClose;
  </script>
  
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">{animal.nombre} Details</h2>
      <p><strong>Species:</strong> {animal.especie.nombre}</p>
      <p><strong>Birth Date:</strong> {animal.fechanac}</p>
      <p><strong>Caretaker:</strong> {animal.cuidador.nombre}</p>
      <p><strong>Habitat:</strong> {animal.habitat.nombre}</p>
      <button
        on:click={onClose}
        class="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
      >
        Close
      </button>
    </div>
  </div>
  