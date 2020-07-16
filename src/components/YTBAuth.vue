<template>
  <div class="container">
    <div v-for="item in items" :key="item.kind">
      {{item.id}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'YTBAuth',
  data () {
    return {
      items: []
    }
  },
  async created () {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    try {
      const res = await axios.get('https://www.googleapis.com/youtube/v3/playlists?part=id&channelId=UCYnQ_5gtRv33rcRdOoQP6yg&maxResults=25&key=AIzaSyAmnNvmU9IfYzfgAZYTcM5mOd9D6gjfIrw', config)
      this.items = res.data.items
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
