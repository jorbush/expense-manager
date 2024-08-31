<template>
  <div>
    <button
      @click="triggerFileUpload"
      class="bg-vue-400 text-white px-4 py-2 rounded hover:bg-vue-600 dark:bg-vue-700 dark:hover:bg-vue-800"
    >
      <span class="hidden sm:inline">Upgrade Categories</span>
      <svg
        class="w-6 h-6 sm:hidden"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        ></path>
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
