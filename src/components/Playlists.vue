<template>
  <div id="btns-parent" class="show-me">
    <p>{{this.idList.playlist_id}}</p>
    <button v-for="id in idList" :key="id.id" @click="handleClick(id.playlist_id, id.playlist_name)">{{id.playlist_name}}</button>
  </div>
</template>

<script>
export default {
  name: 'Playlists',
  data () {
    return {
      playlist: {
        id: '',
        name: ''
      }
    }
  },
  props: {
    idList: Array
  },
  methods: {
    handleClick (id, name) {
      this.playlist.id = id
      this.playlist.name = name
      this.$emit('send-playlist', this.playlist)
    }
  },
  created () {
    this.$emit('created')
  }
}
</script>
