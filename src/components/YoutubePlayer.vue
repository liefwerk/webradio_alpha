<template>
  <div class="container">
    <button v-for="id in idList" :key="id.id" @click="changeId(id.playlist_id)">{{id.playlist_name}}</button>
      <iframe width="560" height="315" :src="`https://www.youtube-nocookie.com/embed/videoseries?list=`+ this.currentId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Youtube-Player',
  data () {
    return {
      idList: '',
      currentId: ''
      // fullLink: 'https://www.youtube-nocookie.com/embed/videoseries?list=' + this.currentId
    }
  },
  methods: {
    changeId: function (id) {
      this.currentId = id
      console.log(this.currentId)
    }
  },
  watch: {
    // changeId: function (id) {
    //   this.currentId = id
    //   console.log(this.currentId)
    // }
  },
  async created () {
    const config = {
      headers: {
        Accept: 'application/json',
        crossdomain: true,
        AccessControlAllowOrigin: '*'
      }
    }
    try {
      const instance = axios.create({
        baseURL: 'http://localhost:3000'
      }, config)
      const res = await instance.get('/playlists-ids')
      this.idList = await res.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
