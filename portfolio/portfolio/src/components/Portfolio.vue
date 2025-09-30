<template>
  <section class="py-12 bg-gray-100">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">My Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src="@/assets/project1.png" alt="Project 1" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold">Project Title 1</h3>
            <p class="text-gray-600">Brief description of the project goes here.</p>
            <a href="#" class="text-blue-500 hover:underline">View Project</a>
          </div>
        </div>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src="@/assets/project2.png" alt="Project 2" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold">Project Title 2</h3>
            <p class="text-gray-600">Brief description of the project goes here.</p>
            <a href="#" class="text-blue-500 hover:underline">View Project</a>
          </div>
        </div>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src="@/assets/project3.png" alt="Project 3" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-xl font-semibold">Project Title 3</h3>
            <p class="text-gray-600">Brief description of the project goes here.</p>
            <a href="#" class="text-blue-500 hover:underline">View Project</a>
          </div>
        </div>
        <!-- Add more project cards as needed -->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'Portfolio',
}
</script>

<style scoped>
</style>