<script>
  export let currentPage = 1; 
  export let totalPages = 1; 
  export let onPageChange = (newPage) => {}; // Callback para manejar el cambio de página

  function previousPage() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1); // Llama al callback con la nueva página
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1); // Llama al callback con la nueva página
    }
  }
</script>

<div class="flex justify-between items-center mt-6">
  <div class="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded shadow">
    <span class="font-semibold text-gray-800">Resultados:</span>
    <span class="text-blue-500 font-bold">
      Página {currentPage} de {totalPages}
    </span>
  </div>

  <div class="flex items-center space-x-2">
    <button
      on:click={previousPage}
      class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed"
      disabled={currentPage === 1}
    >
      Previous
    </button>

    <button
      on:click={nextPage}
      class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
</div>
