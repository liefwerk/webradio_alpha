<template>
  <div id="titre-footer">
    <h2>{{this.name}}</h2>
  </div>
</template>

<script>
export default {
  name: 'PlaylistTitle',
  props: {
    name: String
  }
}
</script>

<style lang="scss">
  #titre-footer h2 {
    color: var(--secondary)
  }
</style>
