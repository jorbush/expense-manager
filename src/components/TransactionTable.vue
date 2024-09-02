<template>
  <div class="overflow-x-auto mt-4">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
      Expenses
    </h2>
    <div
      v-for="(transactions, category) in groupedExpenses"
      :key="`expense-${category}`"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
        {{ category }}
      </h3>
      <table
        class="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
      >
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th
              class="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
            >
              Concept
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="border-t border-gray-200 dark:border-gray-700"
          >
            <td class="px-4 py-2 text-gray-700 dark:text-gray-400">
              {{ transaction.Concepto }}
            </td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-400">
              {{ formatAmount(transaction.Importe) }}
            </td>
          </tr>
          <tr class="border-t-2 border-gray-300 dark:border-gray-600 font-bold">
            <td class="px-4 py-2 text-gray-800 dark:text-gray-200">
              Total {{ category }}
            </td>
            <td class="px-4 py-2 text-gray-800 dark:text-gray-200">
              {{ formatAmount(getCategoryTotal(transactions)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-xl font-bold mb-8 text-gray-800 dark:text-gray-200">
      Total Expenses: {{ formatAmount(totalExpenses) }}
    </div>

    <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
      Incomes
    </h2>
    <div
      v-for="(transactions, category) in groupedIncomes"
      :key="`income-${category}`"
      class="mb-8"
    >
      <h3 class="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
        {{ category }}
      </h3>
      <table
        class="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
      >
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th
              class="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
            >
              Concept
            </th>
            <th
              class="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="border-t border-gray-200 dark:border-gray-700"
          >
            <td class="px-4 py-2 text-gray-700 dark:text-gray-400">
              {{ transaction.Concepto }}
            </td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-400">
              {{ formatAmount(transaction.Importe) }}
            </td>
          </tr>
          <tr class="border-t-2 border-gray-300 dark:border-gray-600 font-bold">
            <td class="px-4 py-2 text-gray-800 dark:text-gray-200">
              Total {{ category }}
            </td>
            <td class="px-4 py-2 text-gray-800 dark:text-gray-200">
              {{ formatAmount(getCategoryTotal(transactions)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-xl font-bold mb-8 text-gray-800 dark:text-gray-200">
      Total Incomes: {{ formatAmount(totalIncomes) }}
    </div>

    <div class="text-2xl font-bold text-gray-800 dark:text-gray-200">
      Net Income: {{ formatAmount(totalIncomes - totalExpenses) }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';
  import { Transaction } from '../types/Transaction';

  export default defineComponent({
    props: {
      transactions: {
        type: Array as PropType<Transaction[]>,
        required: true,
      },
    },
    setup(props) {
      const expenses = computed(() =>
        props.transactions.filter((t) => parseFloat(t.Importe) < 0)
      );
      const incomes = computed(() =>
        props.transactions.filter((t) => parseFloat(t.Importe) >= 0)
      );

      const groupTransactions = (transactions: Transaction[]) => {
        return transactions.reduce(
          (acc, transaction) => {
            if (!acc[transaction.Category]) {
              acc[transaction.Category] = [];
            }
            acc[transaction.Category].push(transaction);
            return acc;
          },
          {} as Record<string, Transaction[]>
        );
      };

      const groupedExpenses = computed(() => groupTransactions(expenses.value));
      const groupedIncomes = computed(() => groupTransactions(incomes.value));

      const getCategoryTotal = (transactions: Transaction[]) => {
        return transactions.reduce(
          (sum, t) => sum + Math.abs(parseFloat(t.Importe)),
          0
        );
      };

      const totalExpenses = computed(() =>
        expenses.value.reduce(
          (sum, t) => sum + Math.abs(parseFloat(t.Importe)),
          0
        )
      );

      const totalIncomes = computed(() =>
        incomes.value.reduce((sum, t) => sum + parseFloat(t.Importe), 0)
      );

      const formatAmount = (amount: number | string) => {
        const value = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
        }).format(value);
      };

      return {
        groupedExpenses,
        groupedIncomes,
        getCategoryTotal,
        totalExpenses,
        totalIncomes,
        formatAmount,
      };
    },
  });
</script>
