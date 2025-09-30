<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-600">404 - Not Found</h1>
      <p class="mt-4 text-lg text-gray-700">Sorry, the page you are looking for does not exist.</p>
      <router-link to="/" class="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Go to Home
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound'
}
</script>

<style scoped>
</style>