<template>
  <footer class="bg-gray-800 text-white py-4">
    <div class="container mx-auto text-center">
      <p>&copy; {{ new Date().getFullYear() }} Your Name. All rights reserved.</p>
      <div class="mt-2">
        <a href="https://github.com/yourusername" class="text-gray-400 hover:text-white mx-2">GitHub</a>
        <a href="https://linkedin.com/in/yourusername" class="text-gray-400 hover:text-white mx-2">LinkedIn</a>
        <a href="mailto:youremail@example.com" class="text-gray-400 hover:text-white mx-2">Email</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
</style>