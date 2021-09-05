<template>
  <div class="main-header">
    <div class="site-title">
      <router-link to="/" class="title">Alfonz - handpicked eclectic music</router-link>
    </div>
    <div class="navigation">
      <Navigation />
    </div>
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

  .main-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 1rem 0;
    .site-title {
      display: flex;
      justify-content: flex-end;
      z-index: 1;
      position: relative;
      width: 100%;
      .title {
        font-family: 'VT323', monospace;
        color: #dfdfdf;
        text-align: left;
        text-decoration: none;
        font-size: 1.75rem;
        &:hover {
          color: var(--primary);
        }
      }
    }
    .navigation {
      z-index: 299;
    }
  }
</style>
