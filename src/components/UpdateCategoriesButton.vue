<template>
  <div>
    <button
      @click="triggerFileUpload"
      class="bg-vue-400 text-white px-4 py-2 rounded hover:bg-vue-600 dark:bg-vue-700 dark:hover:bg-vue-800"
    >
      <span class="hidden sm:inline">Update Categories</span>
      <svg
        class="w-6 h-6 sm:hidden"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
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
