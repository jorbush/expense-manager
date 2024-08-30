<template>
    <div>
      <button
        @click="triggerFileUpload"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upgrade Categories
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
    setup() {
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
            } catch (error) {
              toast.error('Failed to update categories. Please make sure the JSON format is correct.', {
                position: 'top-right',
                autoClose: 3000,
              });
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
