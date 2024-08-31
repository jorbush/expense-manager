<template>
  <div
    class="fixed top-0 left-0 w-64 h-full bg-gray-200 shadow-md transition-transform duration-300 z-40"
    :class="{ '-translate-x-full': !isVisible, 'translate-x-0': isVisible }"
  >
    <h2 class="pl-20 text-lg font-bold p-4">History</h2>
    <ul>
      <li
        v-for="result in results"
        :key="result.id"
        @click="selectResult(result.id)"
        class="cursor-pointer p-2 px-5 hover:bg-gray-300"
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
