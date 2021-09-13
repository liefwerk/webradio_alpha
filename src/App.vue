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
  --white: #dadbe3;
}

* {
  box-sizing: border-box;
}

body {
  background: #121212;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Courier New', monospace;
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

.link {
  text-decoration: none;
  color: var(--secondary);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}

button {
  border: none;
  padding: .25rem 2rem;
  margin-top: .5rem;
  background-color: var(--primary);
  font-family: 'VT323', monospace;
  cursor: pointer;
  font-size: 1.25rem;

  &:hover {
    background: var(--white);
  }
}

</style>
