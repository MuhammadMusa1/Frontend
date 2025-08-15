<template>
  <DefaultLayout>
    <Header />
    <Hero />
    <About />
    <Skills />
    <Portfolio />
    <Contact />
    <Footer />
  </DefaultLayout>
</template>

<script lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue';
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Portfolio from './components/Portfolio.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    DefaultLayout,
    Header,
    Hero,
    About,
    Skills,
    Portfolio,
    Contact,
    Footer,
  },
};
</script>

<style>
/* Add any global styles here */
</style>