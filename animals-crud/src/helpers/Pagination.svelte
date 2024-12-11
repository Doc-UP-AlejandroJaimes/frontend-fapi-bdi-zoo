<script>
    export let currentPage = 1; // Página actual
    export let totalPages = 1; // Total de páginas
    export let onPrevious; // Función para el botón "Anterior"
    export let onNext; // Función para el botón "Siguiente"
  </script>
  
  <div class="flex justify-between items-center mt-6">
    <!-- Texto de Resultados -->
    <div class="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded shadow">
        <span class="font-semibold text-gray-800">Resultados:</span>
        <span class="text-blue-500 font-bold">
          Página {currentPage} de {totalPages}
        </span>
    </div>
  
    <!-- Botones de Paginación -->
    <div class="flex items-center space-x-2">
      <!-- Botón Anterior -->
      <button
        on:click={onPrevious}
        class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        Previous
      </button>
  
      <!-- Botón Siguiente -->
      <button
        on:click={onNext}
        class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
  