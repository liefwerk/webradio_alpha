<template>
  <div class="playlist-name">
    <h2>in {{this.name}}</h2>

  </div>
</template>

<script>
export default {
  name: 'PlaylistName',
  props: {
    name: String
  }
}
</script>

<style lang="scss">
</style>
