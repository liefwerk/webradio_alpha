<template>
  <div class="container">
    <div id="flex-btn-iframe">
      <div id="titre-btn">
        <h2>{{this.currentName}}</h2>
        <div id="btns-parent">
          <button v-for="id in idList" :key="id.id" @click="changePlaylist(id.playlist_id, id.playlist_name)">{{id.playlist_name}}</button>
        </div>
      </div>
      <div class="wrap-element">
        <iframe class="wrapped-iframe" width="500" height="500" :src="`https://www.youtube-nocookie.com/embed/videoseries?list=`+ this.currentId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
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
        AccessControlAllowOrigin: '*',
        crossdomain: true
      }
    }
    try {
      // const PORT = process.env.PORT || 3000
      const instance = axios.create({
        baseURL: 'https://webradio-alpha-db.herokuapp.com'
      }, config)
      const res = await instance.get('/playlists')
      this.idList = await res.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="css" scoped>

  .container {
    margin: 0 auto;
    max-width: 80vw;
  }

  #flex-btn-iframe {
    display: flex;
    flex-flow: column;
  }

  /* Responsive Iframe */

  .wrap-element {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 50%;
    bottom: 0;
    left: 0;
  }

  .wrapped-iframe {
    position: inherit;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  #btns-parent {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    width: 90%;
    left: 0;
  }

  h2 {
    color: blue;
  }

  button {
    background: red;
    font-family: Courier New;
    font-weight: bold;
    height: 2em;
    border: 2px dotted black;
    margin: .3em;
    padding: .3em .9em;
    color: #dfdfdf;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid black;
  }

  @media all and (max-width: 893px){
    .container {
      max-width: 100%;
    }
    button {
      font-size: .8em;
      padding: .2em .4em;
    }
  }

</style>
