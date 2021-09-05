<template>
  <div class="wrapper">
    <h2>My Playlists</h2>
      <div v-for="(playlist) in playlists" :key="playlist.id">
        <input class="input" v-if="playlist.edit" v-model="playlist.playlist_name"
          @blur="playlist.edit = false; $emit('update'); editPlaylistName(playlist)"
          @keyup.enter="playlist.edit = false; $emit('update'); editPlaylistName(playlist)">
        <div v-else class="wrapper-flex">
          <div class="playlist-icon">
            <edit-icon @click="playlist.edit = true" size="1x" class="icon"></edit-icon>
          </div>
          <div class="playlist-icon">
            <trash-icon @click="deletePlaylist(playlist.id)" size="1x" class="icon"></trash-icon>
          </div>
          <p class="playlist-name">{{playlist.playlist_name}}</p>
        </div>
      </div>
    <AddPlaylistModal
      v-if="showAddPlaylist"
      @closeModal="showAddPlaylist = false"
      @refreshItems="handleFetching"/>
    <DeletePlaylistModal
      v-if="showDeletePlaylist"
      @closeModal="showDeletePlaylist = false"
      @refreshItems="handleFetching"
      :playlistId="playlistId" />
    <button @click="showAddPlaylist = !showAddPlaylist">Add a new playlist</button>
  </div>
</template>

<script>
import AddPlaylistModal from '@/components/modals/AddPlaylistModal'
import DeletePlaylistModal from '@/components/modals/DeletePlaylistModal'
import { createClient } from '@supabase/supabase-js'
import { EditIcon, TrashIcon } from 'vue-feather-icons'

export default {
  name: 'MyPlaylists',
  components: {
    AddPlaylistModal,
    DeletePlaylistModal,
    EditIcon,
    TrashIcon
  },
  data () {
    return {
      playlists: [],
      playlistId: null,
      showAddPlaylist: false,
      showDeletePlaylist: false
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
        const _playlists = []
        data.map(playlist => {
          playlist.edit = false
          _playlists.push(playlist)
        })
        this.playlists = _playlists
      }
    },
    async editPlaylistName (val) {
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
    },
    async deletePlaylist (id) {
      this.playlistId = id
      this.showDeletePlaylist = true
    }
  },
  created () {
    this.handleFetching()
  }
}
</script>

<style lang="scss" scoped>

  .wrapper {
    text-align: left;
    h2 {
      margin:0 0 1rem 0;
    }
    .input {
      background-color: transparent;
      border: 1px solid var(--white);
      color: var(--white);
      padding: .5rem;
      font-family: 'Courier New', monospace;
      font-size: 1rem;
    }

    .wrapper-flex {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      .playlist-name {
        margin: 0 1rem 1rem;
      }
      .playlist-icon {
        margin: 0 .5rem 1rem 0;
        .icon {
          color: var(--white);
          &:hover {
            color: var(--primary);
            cursor: pointer;
          }
        }
      }
    }
  }

</style>
