<template>
  <div class="container">
    <div class="sub-container">
      <div id="btns-parent">
        <button v-for="id in idList" :key="id.id" @click="loadPlaylist(id.playlist_id, id.playlist_name)">{{id.playlist_name}}</button>
      </div>
      <div class="video-container">
        <youtube :player-vars="playerVars" ref="youtube" @playing="playing"></youtube>
      </div>
    </div>
    <div class="controls">
      <button id="pause-btn" @click="prevVideo">prev song</button>
      <button id="play-btn" @click="playVideo">play</button>
      <button id="pause-btn" @click="pauseVideo">pause</button>
      <button id="pause-btn" @click="nextVideo">next song</button>
    </div>
    <div id="titre-footer"><h2>{{this.currentName}}</h2></div>
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
      currentName: '',
      playerVars: {
        listType: 'playlist',
        list: this.currentId
      }
    }
  },
  methods: {
    changePlaylist: function (id, name) {},
    playVideo () {
      this.player.playVideo()
    },
    pauseVideo () {
      this.player.pauseVideo()
    },
    prevVideo () {
      this.player.prevVideo()
    },
    nextVideo () {
      this.player.nextVideo()
    },
    playing () {
    },
    loadPlaylist (id, name) {
      this.currentId = id
      this.currentName = name
      this.player.loadPlaylist({ listType: 'playlist', list: this.currentId, modestbranding: 1, rel: 0 })
    }
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  },
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
      this.currentId = this.idList[0].playlist_id
      console.log(this.currentId)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="css" scoped>

  .sub-container {
    margin: 0 auto;
    display: grid;
    grid-template-columns: [row1-start] 35% [line2] auto [end];
    position: relative;
    overflow: hidden;
  }

  /* Responsive Iframe */

  .video-container {
    float: none;
    clear: both;
    width: 100%;
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 25px;
    height: 0;
  }
  .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }

  #btns-parent {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin: 0 auto;
    position: relative;
  }

  #titre-footer {
    padding: 0;
    margin: .3em 1em;
    position: absolute;
    bottom: 1em;
    right: 1em;
  }

  /* Controls */

  .controls {
    padding-bottom: 1em;
  }

  h2 {
    color: blue;
    margin: 0;
    font-size: 1em;
  }

  button {
    background: red;
    font-family: Courier New;
    font-weight: bold;
    min-height: 3em;
    border: 2px dotted black;
    margin: .3em;
    padding: .3em .9em;
    color: #dfdfdf;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid black;
  }

  @media all and (max-width: 985px){
    .sub-container {
      grid-template-columns: none;
      grid-template-rows: [rows1-start] auto [line2] 1fr [end];
    }

    #btns-parent {
      flex-flow: row nowrap;
      margin: 0 1.7em;
      overflow: scroll;
      justify-content: flex-start;
    }

    button {
      height: 5em;
      min-width: 15em;
    }

    .wrap-element {
      height: 50vh;
    }
  }

  @media all and (min-width: 986px) and (max-width: 1280px){
    .sub-container {
      grid-template-columns: [column1-start] 45% [line2] auto [end];
      grid-template-rows: none;
    }
  }

</style>
