<template>
  <div class="container">
    <YoutubePlayer />
    <!--<Maintenance />-->
  </div>
</template>

<script>
// @ is an alias to /src
import YoutubePlayer from '../components/YoutubePlayer'
// import Maintenance from '../components/Maintenance'

export default {
  components: {
    YoutubePlayer
    // Maintenance
  }
}
</script>
