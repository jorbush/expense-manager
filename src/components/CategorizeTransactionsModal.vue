<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-6 relative"
    >
      <h2 class="text-2xl font-bold mb-4 text-center">
        Categorize Transactions
      </h2>
      <div class="flex justify-end space-x-4 mb-4">
        <ImportCategoriesButton @categoriesUpdated="loadCategories" />
        <ExportCategoriesButton />
      </div>
      <CategoryManager
        :categories="categories"
        @categoriesUpdated="updateCategories"
      />
      <div class="flex justify-end mt-6">
        <button
          @click="saveChanges"
          class="bg-vue-400 text-white px-4 py-2 rounded hover:bg-vue-600"
        >
          Save Changes
        </button>
        <button
          @click="closeModal"
          class="ml-4 text-gray-600 dark:text-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
      >
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
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
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, PropType } from 'vue';
  import ImportCategoriesButton from './ImportCategoriesButton.vue';
  import ExportCategoriesButton from './ExportCategoriesButton.vue';
  import CategoryManager from './CategoryManager.vue';

  export default defineComponent({
    components: {
      ImportCategoriesButton,
      ExportCategoriesButton,
      CategoryManager,
    },
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      categories: {
        type: Object as PropType<Record<string, string[]>>,
        required: true,
      },
    },
    emits: ['close', 'categoriesUpdated'],
    setup(props, { emit }) {
      const loadCategories = () => {
        emit('categoriesUpdated');
      };

      const updateCategories = (
        updatedCategories: Record<string, string[]>
      ) => {
        emit('categoriesUpdated', updatedCategories);
      };

      const saveChanges = () => {
        localStorage.setItem('categories', JSON.stringify(props.categories));
        emit('close');
      };

      const closeModal = () => {
        emit('close');
      };

      return {
        loadCategories,
        updateCategories,
        saveChanges,
        closeModal,
      };
    },
  });
</script>

<style scoped>
  .fixed {
    background: rgba(0, 0, 0, 0.5);
  }
</style>
