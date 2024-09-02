<template>
  <div>
    <div
      v-for="(keywords, category) in localCategories"
      :key="category"
      class="mb-4"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">{{ category }}</h3>
        <button @click="removeCategory(String(category))" class="text-red-600">
          Remove
        </button>
      </div>
      <div
        v-for="(_, index) in keywords"
        :key="index"
        class="flex items-center mt-2"
      >
        <input
          v-model="localCategories[category][index]"
          class="border rounded w-full px-2 py-1 bg-transparent"
        />
        <button
          @click="removeKeyword(String(category), index)"
          class="text-red-600 ml-2"
        >
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <button @click="addKeyword(String(category))" class="text-vue-400 mt-2">
        Add Keyword
      </button>
    </div>
    <button @click="addCategory" class="text-vue-400 mt-4">
      Add New Category
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, PropType, watch } from 'vue';

  export default defineComponent({
    props: {
      categories: {
        type: Object as PropType<Record<string, string[]>>,
        required: true,
      },
    },
    emits: ['categoriesUpdated'],
    setup(props, { emit }) {
      const localCategories = ref<Record<string, string[]>>({
        ...props.categories,
      });

      watch(
        () => props.categories,
        (newCategories) => {
          localCategories.value = { ...newCategories };
        },
        { deep: true }
      );

      const emitUpdate = () => {
        emit('categoriesUpdated', localCategories.value);
      };

      const addCategory = () => {
        const newCategory = prompt('Enter new category name');
        if (newCategory && !localCategories.value[newCategory]) {
          localCategories.value[newCategory] = [];
          emitUpdate();
        }
      };

      const removeCategory = (category: string) => {
        if (
          confirm(`Are you sure you want to delete the category "${category}"?`)
        ) {
          delete localCategories.value[category];
          emitUpdate();
        }
      };

      const addKeyword = (category: string) => {
        const newKeyword = prompt(
          `Enter new keyword for category "${category}"`
        );
        if (newKeyword) {
          localCategories.value[category].push(newKeyword);
          emitUpdate();
        }
      };

      const removeKeyword = (category: string, index: number) => {
        localCategories.value[category].splice(index, 1);
        emitUpdate();
      };

      return {
        localCategories,
        addCategory,
        removeCategory,
        addKeyword,
        removeKeyword,
      };
    },
  });
</script>
