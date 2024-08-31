<template>
  <div class="flex h-screen">
    <Sidebar
      :isVisible="isSidebarVisible"
      @resultSelected="handleResultSelected"
    />
    <div class="flex-1 relative">
      <button
        @click="toggleSidebar"
        class="text-gray-600 focus:outline-none focus:ring fixed top-4 left-4 z-50"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <div class="container mx-auto p-8 max-w-screen-lg relative">
        <h1 class="text-3xl font-bold text-center mb-6">Expense Manager</h1>
        <div class="absolute top-0 right-0 mt-4 mr-4">
          <UpgradeCategoriesButton @categoriesUpdated="loadCategories" />
        </div>
        <FileUploader @fileLoaded="handleFileLoaded" />
        <TransactionTable :transactions="transactions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import FileUploader from './components/FileUploader.vue';
  import TransactionTable from './components/TransactionTable.vue';
  import UpgradeCategoriesButton from './components/UpgradeCategoriesButton.vue';
  import Sidebar from './components/Sidebar.vue';
  import { Transaction } from './types/Transaction';

  export default defineComponent({
    components: {
      FileUploader,
      TransactionTable,
      UpgradeCategoriesButton,
      Sidebar,
    },
    setup() {
      const transactions = ref<Transaction[]>([]);
      const categories = ref<Record<string, string[]>>({});
      const isSidebarVisible = ref(false);

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
        const processedTransactions = data.map((transaction) => ({
          ...transaction,
          Category: assignCategory(transaction.Concepto),
        }));
        const id = new Date().toISOString();
        const result = { id, transactions: processedTransactions };
        const storedResults = JSON.parse(
          localStorage.getItem('results') || '[]'
        );
        storedResults.push(result);
        localStorage.setItem('results', JSON.stringify(storedResults));
        transactions.value = processedTransactions;
        document.dispatchEvent(new Event('updateResults'));
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

      const handleResultSelected = (id: string) => {
        const storedResults = JSON.parse(
          localStorage.getItem('results') || '[]'
        );
        const selectedResult = storedResults.find(
          (result: any) => result.id === id
        );
        if (selectedResult) {
          transactions.value = selectedResult.transactions;
        }
      };

      const toggleSidebar = () => {
        isSidebarVisible.value = !isSidebarVisible.value;
      };

      loadCategories();

      return {
        transactions,
        handleFileLoaded,
        loadCategories,
        handleResultSelected,
        isSidebarVisible,
        toggleSidebar,
      };
    },
  });
</script>
