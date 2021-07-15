<template>
  <div class="my-playlists">
    <h2>My Playlists</h2>
      <div v-for="(playlist) in playlists" :key="playlist.id">
        <input class="input" v-if="playlist.edit" v-model="playlist.playlist_name"
          @blur="playlist.edit = false; $emit('update'); editPlaylistName(playlist)"
          @keyup.enter="playlist.edit = false; $emit('update'); editPlaylistName(playlist)">
        <div v-else class="wrapper-flex">
          <p>{{playlist.playlist_name}}</p>
          <edit-icon @click="playlist.edit = true" size="1.5x" class="playlist-icons"></edit-icon>
        </div>
      </div>
    <AddPlaylist v-if="showAddPlaylist" />
    <button @click="showAddPlaylist = !showAddPlaylist">Add a new playlist</button>
  </div>
</template>

<script>
import AddPlaylist from '@/components/AddPlaylist'
import { createClient } from '@supabase/supabase-js'
import { EditIcon } from 'vue-feather-icons'

export default {
  name: 'MyPlaylists',
  components: {
    AddPlaylist,
    EditIcon
  },
  data () {
    return {
      playlists: [],
      showAddPlaylist: false
    }
  },
  methods: {
    async handleFetching () {
      const supabaseUrl = this.$store.state.supabaseUrl
      const supabaseKey = this.$store.state.supabaseKey
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { data, error } = await supabase
        .from('Playlists')
        .select('*')
        .eq('user_id', this.$store.state.userId)
      if (error) console.log(error)
      else {
        data.map(playlist => {
          playlist.edit = false
          this.playlists.push(playlist)
        })
      }
    },
    async editPlaylistName (val) {
      console.log(val)
      const supabaseUrl = this.$store.state.supabaseUrl
      const supabaseKey = this.$store.state.supabaseKey
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { data, error } = await supabase
        .from('Playlists')
        .update({ playlist_name: val.playlist_name })
        .eq('id', val.id)

      if (error) console.log(error)
      else {
        console.log(data)
      }
    }
  },
  created () {
    this.handleFetching()
  }
}
</script>

<style lang="scss">

  .my-playlists {
    .input {
      background-color: transparent;
      border: 1px solid var(--white);
      color: var(--white);
      padding: .5rem;
      font-family: 'Courier New', monospace;
      font-size: 1rem;
    }

    .playlist-icons {
      color: var(--white);
      margin-left: .5em;

      &:hover {
        color: var(--primary);
        cursor: pointer;
      }
    }
    .wrapper-flex {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }
  }

</style>
