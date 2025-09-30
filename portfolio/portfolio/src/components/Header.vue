<template>
  <header class="bg-gray-800 text-white">
    <div class="container mx-auto flex justify-between items-center p-4">
      <h1 class="text-2xl font-bold">My Portfolio</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="#hero" class="hover:text-gray-400">Home</a></li>
          <li><a href="#about" class="hover:text-gray-400">About</a></li>
          <li><a href="#skills" class="hover:text-gray-400">Skills</a></li>
          <li><a href="#portfolio" class="hover:text-gray-400">Portfolio</a></li>
          <li><a href="#contact" class="hover:text-gray-400">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
</style>