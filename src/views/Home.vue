<template>
  <div class="container">
    <YoutubePlayer />
    <div>{{this.isAuthenticated}}</div>
    <!--<Maintenance />-->
  </div>
</template>

<script>
// @ is an alias to /src
import YoutubePlayer from '../components/YoutubePlayer'
// import Maintenance from '../components/Maintenance'

export default {
  name: 'Home',
  components: {
    YoutubePlayer
    // Maintenance
  },
  data () {
    return {
      username: '',
      isAuthenticated: false
    }
  },
  methods: {
    checkAuth () {
      this.isAuthenticated = this.$store.state.isAuthenticated
      this.username = this.$store.state.userId
    }
  },
  created () {
    this.checkAuth()
  }
}
</script>
