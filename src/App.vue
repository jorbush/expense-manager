<template>
  <div class="container mx-auto p-8 max-w-screen-lg relative">
    <h1 class="text-3xl font-bold text-center mb-6">Expense Manager</h1>
    <div class="absolute top-0 right-0 mt-4 mr-4">
      <UpgradeCategoriesButton @categoriesUpdated="loadCategories" />
    </div>
    <FileUploader @fileLoaded="handleFileLoaded" />
    <TransactionTable :transactions="transactions" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import FileUploader from './components/FileUploader.vue';
  import TransactionTable from './components/TransactionTable.vue';
  import UpgradeCategoriesButton from './components/UpgradeCategoriesButton.vue';
  import { Transaction } from './types/Transaction';

  export default defineComponent({
    components: {
      FileUploader,
      TransactionTable,
      UpgradeCategoriesButton,
    },
    setup() {
      const transactions = ref<Transaction[]>([]);
      const categories = ref<Record<string, string[]>>({});

      const loadCategories = () => {
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) {
          categories.value = JSON.parse(storedCategories);
        } else {
          const defaultCategories = {};
          localStorage.setItem('categories', JSON.stringify(defaultCategories));
          categories.value = defaultCategories;
        }

        transactions.value = transactions.value.map((transaction) => ({
          ...transaction,
          Category: assignCategory(transaction.Concepto),
        }));
      };

      const handleFileLoaded = (data: Transaction[]) => {
        transactions.value = data.map((transaction) => ({
          ...transaction,
          Category: assignCategory(transaction.Concepto),
        }));
      };

      const assignCategory = (description: string) => {
        const descriptionLower = description.toLowerCase();
        for (const [category, keywords] of Object.entries(categories.value)) {
          if (
            (keywords as string[]).some((keyword) =>
              descriptionLower.includes(keyword)
            )
          ) {
            return category;
          }
        }
        return 'Others';
      };

      loadCategories();

      return {
        transactions,
        handleFileLoaded,
        loadCategories,
      };
    },
  });
</script>
