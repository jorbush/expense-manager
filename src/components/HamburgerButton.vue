<template>
  <button
    @click="toggleSidebar"
    class="text-gray-600 focus:outline-none focus:ring fixed top-4 left-4 z-50"
  >
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'HamburgerButton',
    emits: ['toggle'],
    setup(_, { emit }) {
      const toggleSidebar = () => {
        emit('toggle');
      };

      return {
        toggleSidebar,
      };
    },
  });
</script>
