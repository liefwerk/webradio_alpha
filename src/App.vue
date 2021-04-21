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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  color: #dfdfdf;
}

</style>
