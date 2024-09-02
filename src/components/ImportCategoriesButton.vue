<template>
  <div>
    <BaseButton
      text="Import Categories"
      aria-label="Import Categories"
      @click="triggerFileUpload"
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
            d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5h7.586l-.293.293a1 1 0 0 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 1.414l.293.293H4V9h5a2 2 0 0 0 2-2Z"
            clip-rule="evenodd"
          />
        </svg>
      </template>
    </BaseButton>
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
  import { isValidCategoryStructure } from '../utils.ts';
  import BaseButton from './BaseButton.vue';
  import { showToastError } from '../utils.ts';

  export default defineComponent({
    name: 'ImportCategoriesButton',
    components: {
      BaseButton,
    },
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
              if (isValidCategoryStructure(newCategories)) {
                localStorage.setItem(
                  'categories',
                  JSON.stringify(newCategories)
                );
                toast.success('Categories imported successfully!', {
                  position: 'top-right',
                  autoClose: 3000,
                });
                emit('categoriesUpdated', newCategories || {});
              } else {
                showToastError(
                  'The imported file does not have the correct structure.'
                );
              }
            } catch (error) {
              console.log(error);
              showToastError(
                'Failed to import categories. Please make sure the JSON format is correct.'
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
