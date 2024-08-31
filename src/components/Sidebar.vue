<template>
  <div class="sidebar bg-gray-200 p-4 w-64 h-full">
    <h2 class="text-lg font-bold mb-4">Saved Results</h2>
    <ul>
      <li
        v-for="result in results"
        :key="result.id"
        @click="selectResult(result.id)"
        class="cursor-pointer p-2 hover:bg-gray-300"
      >
        {{ result.id }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';

  export default defineComponent({
    emits: ['resultSelected'],
    setup(_, { emit }) {
      const results = ref<{ id: string; transactions: any[] }[]>([]);

      const loadResults = () => {
        const storedResults = JSON.parse(
          localStorage.getItem('results') || '[]'
        );
        results.value = storedResults;
      };

      const selectResult = (id: string) => {
        emit('resultSelected', id);
      };

      onMounted(() => {
        loadResults();
        document.addEventListener('updateResults', loadResults);
      });

      return {
        results,
        selectResult,
      };
    },
  });
</script>
