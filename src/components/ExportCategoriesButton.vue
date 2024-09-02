<template>
  <BaseButton
    text="Export Categories"
    ariaLabel="Export Categories"
    @click="exportCategories"
  >
    <template #icon>
      <svg
        class="w-6 h-6 sm:hidden"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v9.293l-2-2a1 1 0 0 0-1.414 1.414l.293.293h-6.586a1 1 0 1 0 0 2h6.586l-.293.293A1 1 0 0 0 18 16.707l2-2V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
          clip-rule="evenodd"
        />
      </svg>
    </template>
  </BaseButton>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BaseButton from './BaseButton.vue';
  import { showToastError } from '../utils.ts';

  export default defineComponent({
    name: 'ExportCategoriesButton',
    components: {
      BaseButton,
    },
    setup() {
      const exportCategories = () => {
        const categories = localStorage.getItem('categories');
        if (categories) {
          const blob = new Blob([categories], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'categories.json';
          link.click();
          URL.revokeObjectURL(url);
        } else {
          showToastError('No categories found in local storage.');
        }
      };

      return {
        exportCategories,
      };
    },
  });
</script>
