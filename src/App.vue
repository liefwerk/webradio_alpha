<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  beforeCreate () {
    this.$store.commit('initializeStore')
  }
}
</script>

<style lang="scss">

:root {
  --primary: #d03636;
  --secondary: #e2a23f;
  --white: #ebebf2;
}

* {
  box-sizing: border-box;
}

body {
  background: #121212;
  overflow: hidden;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  color: #dfdfdf;
  font-family: 'Courier New', monospace;
}

h1, h2 {
    font-family: 'VT323', monospace;
    margin: 0 1rem;
    color: #dfdfdf;
    text-align: left;
}

h1 {
    font-size: 2rem;
}

h2 {
    font-size: 1.8rem;
}

</style>
