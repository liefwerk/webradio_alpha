<template>
  <div id="header">
    <p id="title">Alfonz - handpicked ecclectic music</p>
    <Navigation />
  </div>
</template>

<script>
import Navigation from '@/components/menus/Navigation.vue'

export default {
  name: 'Header',
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>

  #header {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    position: relative;
  }

  #title {
    font-family: 'VT323', monospace;
    margin: 0 1rem;
    color: #dfdfdf;
    text-align: left;
    font-size: 2.2rem;
  }

  @media all and (max-width: 985px){
    #title {
      font-size: 1.5em;
    }
  }
</style>
