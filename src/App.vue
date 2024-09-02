<template>
  <div :class="darkMode ? 'dark ' : ''">
    <div
      class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <div class="flex h-full">
        <Sidebar
          :isVisible="isSidebarVisible"
          @resultSelected="handleResultSelected"
        />
        <div class="flex-1 relative">
          <HamburgerButton @toggle="toggleSidebar" />
          <div class="container mx-auto p-8 max-w-screen-lg relative">
            <ThemeToggleButton class="ml-8" />
            <div class="flex justify-center items-center mb-6">
              <h1 class="text-3xl font-bold">Expense Manager</h1>
            </div>
            <div class="absolute top-0 right-0 mt-4 mr-4">
              <button
                @click="openCategorizeModal"
                class="bg-vue-400 text-white px-4 py-2 rounded hover:bg-vue-600 mt-4"
              >
                Categorize Transactions
              </button>
            </div>
            <FileUploader @fileLoaded="handleFileLoaded" />

            <TransactionTable :transactions="transactions" />
          </div>
        </div>
      </div>
      <Footer class="mt-auto" />
      <CategorizeTransactionsModal
        :isOpen="isCategorizeModalOpen"
        :categories="categories || {}"
        @close="closeCategorizeModal"
        @categoriesUpdated="updateCategories"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import FileUploader from './components/FileUploader.vue';
  import TransactionTable from './components/TransactionTable.vue';
  import Sidebar from './components/Sidebar.vue';
  import HamburgerButton from './components/HamburgerButton.vue';
  import ThemeToggleButton from './components/ThemeToggleButton.vue';
  import Footer from './components/Footer.vue';
  import CategorizeTransactionsModal from './components/CategorizeTransactionsModal.vue';
  import { Transaction } from './types/Transaction';
  import { isValidCategoryStructure } from './utils.ts';

  export default defineComponent({
    components: {
      FileUploader,
      TransactionTable,
      Sidebar,
      HamburgerButton,
      ThemeToggleButton,
      Footer,
      CategorizeTransactionsModal,
    },
    setup() {
      const transactions = ref<Transaction[]>([]);
      const categories = ref<Record<string, string[]>>({});
      const isSidebarVisible = ref(false);
      const isCategorizeModalOpen = ref(false);
      const darkMode = ref(false);

      const loadCategories = () => {
        try {
          const storedCategories = localStorage.getItem('categories');
          if (storedCategories) {
            categories.value = JSON.parse(storedCategories);
            if (!isValidCategoryStructure(categories.value)) {
              throw new Error('Invalid category structure');
            }
          } else {
            const defaultCategories = {};
            localStorage.setItem(
              'categories',
              JSON.stringify(defaultCategories)
            );
            categories.value = defaultCategories;
          }

          transactions.value = transactions.value.map((transaction) => ({
            ...transaction,
            Category: assignCategory(transaction.Concepto),
          }));
        } catch (error) {
          console.error('Error loading categories:', error);
          categories.value = {};
          localStorage.setItem('categories', JSON.stringify(categories.value));
        }
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

      const openCategorizeModal = () => {
        if (!isCategorizeModalOpen.value) {
          loadCategories();
          isCategorizeModalOpen.value = true;
        }
      };

      const closeCategorizeModal = () => {
        isCategorizeModalOpen.value = false;
      };

      const updateCategories = (
        updatedCategories: Record<string, string[]>
      ) => {
        categories.value = updatedCategories;
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
      };

      loadCategories();

      return {
        transactions,
        handleFileLoaded,
        loadCategories,
        handleResultSelected,
        isSidebarVisible,
        toggleSidebar,
        openCategorizeModal,
        closeCategorizeModal,
        isCategorizeModalOpen,
        updateCategories,
        categories,
        darkMode,
      };
    },
  });
</script>
