<template>
  <button
    :class="[
      'px-4 py-2 rounded',
      'bg-gradient-to-r from-vue-400 to-vue-500',
      'hover:bg-gradient-to-r hover:from-vue-600 hover:to-vue-700',
      'dark:bg-vue-700 dark:hover:bg-vue-800',
      'text-white',
      className,
    ]"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    <span v-if="text" class="hidden sm:inline">{{ text }}</span>
    <slot name="icon"></slot>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'BaseButton',
    props: {
      text: {
        type: String,
        default: '',
      },
      ariaLabel: {
        type: String,
        required: true,
      },
      className: {
        type: String,
        default: '',
      },
    },
    emits: ['click'],
  });
</script>
