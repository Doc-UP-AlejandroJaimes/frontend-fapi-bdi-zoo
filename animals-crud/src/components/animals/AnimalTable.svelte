<script>
    export let animals;
    export let onDelete;
    export let onViewDetails;
  </script>
  
  <div class="overflow-x-auto">
    <table class="table-auto w-full text-sm border-collapse border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left border border-gray-300">Name</th>
          <th class="px-4 py-2 text-left border border-gray-300">Birth Date</th>
          <th class="px-4 py-2 text-center border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each animals as animal}
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 border border-gray-300">{animal.nombre}</td>
            <td class="px-4 py-2 border border-gray-300">{animal.fechanac}</td>
            <td class="px-4 py-2 border border-gray-300 text-center">
              <div class="flex justify-center space-x-2">
                <!-- Botón View Details -->
                <button
                  on:click={() => onViewDetails(animal.id)}
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zM2.458 12C3.732 7.943 7.283 5 12 5c4.718 0 8.268 2.943 9.542 7-.75 2.02-2.287 3.555-4.292 4.237C15.687 16.824 13.87 17 12 17c-4.718 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Details</span>
                </button>
  
                <!-- Botón Delete -->
                <button
                  on:click={() => onDelete(animal)}
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m5 0V4a1 1 0 011-1h2a1 1 0 011 1v3m-7 0h10" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  