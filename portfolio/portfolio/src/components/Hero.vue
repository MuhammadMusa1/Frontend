<template>
  <section class="flex items-center justify-center h-screen bg-gray-800 text-white">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p class="text-lg mb-8">I'm a passionate developer with a knack for creating beautiful and functional web applications.</p>
      <router-link to="#portfolio" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View My Work
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<style scoped>
</style>