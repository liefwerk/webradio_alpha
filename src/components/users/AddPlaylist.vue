<template>
  <div class="add-playlist playlist-form">
    <form class="form" v-on:submit.prevent="">
      <fieldset class="playlist-name">
        <legend>Name of the playlist</legend>
        <input type="text" v-model="name" required>
      </fieldset>
      <fieldset class="password">
        <legend>ID of the playlist</legend>
        <input type="text" v-model="playlistId" required>
      </fieldset>
      <button class="button" @click="addPlaylist">Add the playlist</button>
    </form>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'AddPlaylist',
  data () {
    return {
      name: undefined,
      playlistId: undefined
    }
  },
  methods: {
    async addPlaylist () {
      const supabaseUrl = this.$store.state.supabaseUrl
      const supabaseKey = this.$store.state.supabaseKey
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data, error } = await supabase
        .from('Playlists')
        .insert([
          { playlist_id: this.playlistId, playlist_name: this.name, user_id: this.$store.state.userId }
        ])
      if (error) console.log(error)
      else {
        console.log(data)
      }
    }
  }
}
</script>

<style lang="scss">

.playlist-form {
  position: relative;
  color: var(--white);
  font-family: 'VT323', monospace;
  font-size: 1.25rem;

  form {
    // width: 300px;
    margin: 0 auto;

    fieldset {
      border: none;
      padding: 0;
      margin: .5em 0;

      input {
        width: 300px;
        height: 2rem;
        padding: 0 .5em 0 .5em;
      }

    }

    button {
      width: 300px;
      border: none;
      padding: .25rem 0;
      margin-top: .5rem;
      background-color: #d03636;
      font-family: 'VT323', monospace;
      cursor: pointer;
      font-size: 1.25rem;

      &:hover {
        background: var(--white);
      }
    }
  }
}
</style>
