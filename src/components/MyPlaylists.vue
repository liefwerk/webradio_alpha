<template>
  <div>
    <h2>My Playlists</h2>
    <div>
      <p v-for="playlist in playlists" :key="playlist.id">{{playlist.playlist_name}}</p>
    </div>
    <AddPlaylist />
  </div>
</template>

<script>
import AddPlaylist from '@/components/AddPlaylist'
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'MyPlaylists',
  components: {
    AddPlaylist
  },
  data () {
    return {
      playlists: []
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
        console.log(data)
        data.map(playlist => {
          this.playlists.push(playlist)
        })
      }
    }
  },
  created () {
    this.handleFetching()
  }
}
</script>
