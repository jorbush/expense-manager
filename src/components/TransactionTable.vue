<template>
  <div class="overflow-x-auto mt-4">
    <table
      v-if="transactions.length > 0"
      class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">
            Concept
          </th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">
            Import
          </th>
          <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">
            Category
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions"
          :key="transaction.id"
          class="border-t"
        >
          <td class="px-4 py-2 text-gray-700">{{ transaction.Concepto }}</td>
          <td class="px-4 py-2 text-gray-700">{{ transaction.Importe }}</td>
          <td class="px-4 py-2 text-gray-700">{{ transaction.Category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      transactions: {
        type: Array,
        required: true,
      },
    },
  });
</script>
