<template>
  <div class="container mx-auto p-8 max-w-screen-lg">
    <h1 class="text-3xl font-bold text-center mb-6">Expense Manager</h1>
    <FileUploader @fileLoaded="handleFileLoaded" />
    <TransactionTable :transactions="transactions" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import FileUploader from './components/FileUploader.vue';
  import TransactionTable from './components/TransactionTable.vue';
  import { Transaction } from './types/Transaction';

  export default defineComponent({
    components: {
      FileUploader,
      TransactionTable,
    },
    setup() {
      const transactions = ref<any[]>([]);
      const categories = ref<any>({});

      const loadCategories = () => {
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) {
          categories.value = JSON.parse(storedCategories);
        } else {
          const defaultCategories = {
            Food: [
              'starbucks',
              'mcdonalds',
              'burger king',
              'kfc',
              'dominos',
              'pizza hut',
            ],
            Transport: ['uber', 'lyft', 'taxi', 'metro', 'bus'],
            Shopping: ['amazon', 'ebay', 'walmart', 'target', 'best buy'],
            Others: [],
          };
          localStorage.setItem('categories', JSON.stringify(defaultCategories));
          categories.value = defaultCategories;
        }
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
      };
    },
  });
</script>
