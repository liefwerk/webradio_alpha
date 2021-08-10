<template>
  <div id="btns-parent" class="show-me">
    <div class="filters">
      <p
        v-for="(filter, index) in filters"
        :key="index"
        :class="filter === activeFilter ? 'active-filter' : ''"
        @click="handleFilter(filter)">
        {{filter}}
      </p>

    </div>
    <p>{{this.idList.playlist_id}}</p>
    <button
      v-for="id in idList"
      :key="id.id"
      @click="handlePlaylist(id.playlist_id, id.playlist_name)"
      :class="id.playlist_id === activeItem ? 'active' : ''">
        {{id.playlist_name}}
    </button>
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
      },
      filters: [
        'All',
        'My Playlists'
      ],
      activeItem: null,
      activeFilter: null
    }
  },
  props: {
    idList: Array
  },
  methods: {
    handlePlaylist (id, name) {
      this.playlist.id = id
      this.playlist.name = name
      this.$emit('send-playlist', this.playlist)
      this.activeItem = id
    },
    handleFilter (filter) {
      this.activeFilter = filter
    }
  },
  created () {
    this.$emit('created')
  }
}
</script>
<style lang="scss" scoped>
  .filters {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 0 1rem 0 1rem;
    p {
      font-size: 2rem;
      font-family: 'VT323', monospace;
      margin: 1rem 0 0;
      cursor: pointer;
      &.active-filter {
        color: red;
      }
    }
  }
  #btns-parent button.active {
    color: red;
  }
</style>
