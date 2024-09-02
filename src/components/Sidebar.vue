<template>
  <div
    :class="[
      'fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-40',
      isVisible ? 'translate-x-0' : '-translate-x-full',
      'w-64 bg-gray-100 dark:bg-gray-800 shadow-md overflow-y-auto',
    ]"
  >
    <h2 class="pl-20 text-lg font-bold p-4">History</h2>
    <ul>
      <li
        v-for="result in results"
        :key="result.id"
        @click="selectResult(result.id)"
        class="cursor-pointer p-2 px-5 hover:bg-gray-300 text-center"
      >
        {{ result.id }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';

  export default defineComponent({
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
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

      const updateResults = () => {
        loadResults();
      };

      onMounted(() => {
        loadResults();
        document.addEventListener('updateResults', updateResults);
      });

      return {
        results,
        selectResult,
      };
    },
  });
</script>

<style scoped>
  .translate-x-0 {
  transform: translateX(0);
}

.-translate-x-full {
  transform: translateX(-100%);
}
</style>
