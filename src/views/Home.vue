<template>
  <div class="container">
  <Header />
  <YoutubePlayer />
  </div>
</template>

<script>
// @ is an alias to /src
import YoutubePlayer from '../components/YoutubePlayer'
import Header from '../components/Header'

export default {
  components: {
    YoutubePlayer,
    Header
  }
}
</script>
