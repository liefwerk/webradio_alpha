<template>
  <div class="container">
    <div id="btns-parent">
      <button v-for="id in idList" :key="id.id" @click="changePlaylist(id.playlist_id, id.playlist_name)">{{id.playlist_name}}</button>
    </div>
    <h2>{{this.currentName}}</h2>
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
      currentId: '',
      currentName: ''
      // fullLink: 'https://www.youtube-nocookie.com/embed/videoseries?list=' + this.currentId
    }
  },
  methods: {
    changePlaylist: function (id, name) {
      this.currentId = id
      this.currentName = name
    }
  },
  watch: {},
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
        baseURL: 'http://45.33.98.225:4000'
      }, config)
      const res = await instance.get('/playlists-ids')
      this.idList = await res.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="css" scoped>
  #btns-parent {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 1.5em;
  }

  h2 {
    color: blue;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  button {
    background: red;
    font-family: Courier New;
    border: 2px dotted black;
    margin: .3em;
    padding: .3em .9em;
    color: #dfdfdf;
  }

  button:focus {
    border: 2px solid black;
  }

</style>
