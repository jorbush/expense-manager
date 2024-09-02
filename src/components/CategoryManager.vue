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
          class="border rounded w-full px-2 py-1"
        />
        <button
          @click="removeKeyword(String(category), index)"
          class="text-red-600 ml-2"
        >
          X
        </button>
      </div>
      <button @click="addKeyword(String(category))" class="text-blue-600 mt-2">
        Add Keyword
      </button>
    </div>
    <button @click="addCategory" class="text-blue-600 mt-4">
      Add Category
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
