<template>
  <div>
    <button
      @click="triggerFileUpload"
      class="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-600 flex items-center"
    >
      <span class="hidden sm:inline">Upgrade Categories</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 sm:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 7h16M4 12h16m-7 5h7"
        />
      </svg>
    </button>
    <input
      type="file"
      @change="handleCategoryFileUpload"
      ref="categoryFileInput"
      accept=".json"
      class="hidden"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { toast } from 'vue3-toastify';

  export default defineComponent({
    emits: ['categoriesUpdated'],
    setup(_, { emit }) {
      const categoryFileInput = ref<HTMLInputElement | null>(null);

      const triggerFileUpload = () => {
        if (categoryFileInput.value) {
          categoryFileInput.value.click();
        }
      };

      const handleCategoryFileUpload = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const newCategories = JSON.parse(e.target?.result as string);
              localStorage.setItem('categories', JSON.stringify(newCategories));
              toast.success('Categories updated successfully!', {
                position: 'top-right',
                autoClose: 3000,
              });
              emit('categoriesUpdated');
            } catch (error) {
              toast.error(
                'Failed to update categories. Please make sure the JSON format is correct.',
                {
                  position: 'top-right',
                  autoClose: 3000,
                }
              );
            }
          };
          reader.readAsText(file);
        }
      };

      return {
        triggerFileUpload,
        handleCategoryFileUpload,
        categoryFileInput,
      };
    },
  });
</script>
