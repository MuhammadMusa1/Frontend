<template>
  <section id="skills" class="py-20 bg-gray-100">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-10">My Skills</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="skill">
          <h3 class="text-xl font-semibold">Frontend Development</h3>
          <div class="w-full bg-gray-300 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" style="width: 90%"></div>
          </div>
        </div>
        <div class="skill">
          <h3 class="text-xl font-semibold">Backend Development</h3>
          <div class="w-full bg-gray-300 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" style="width: 80%"></div>
          </div>
        </div>
        <div class="skill">
          <h3 class="text-xl font-semibold">SQL</h3>
          <div class="w-full bg-gray-300 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" style="width: 75%"></div>
          </div>
        </div>
        <div class="skill">
          <h3 class="text-xl font-semibold">Analytics</h3>
          <div class="w-full bg-gray-300 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" style="width: 70%"></div>
          </div>
        </div>
        <div class="skill">
          <h3 class="text-xl font-semibold">Data Science</h3>
          <div class="w-full bg-gray-300 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" style="width: 65%"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'Skills',
}
</script>

<style scoped>
.skill {
  margin-bottom: 1.5rem;
}
</style>