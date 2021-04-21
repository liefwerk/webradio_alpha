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
