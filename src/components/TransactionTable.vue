<template>
  <div class="overflow-x-auto mt-4">
    <table
      v-if="transactions.length > 0"
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
            Import
          </th>
          <th
            class="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
          >
            Category
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
            {{ transaction.Importe }}
          </td>
          <td class="px-4 py-2 text-gray-700 dark:text-gray-400">
            {{ transaction.Category }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Transaction } from '../types/Transaction';

  export default defineComponent({
    props: {
      transactions: {
        type: Array as PropType<Transaction[]>,
        required: true,
      },
    },
  });
</script>
