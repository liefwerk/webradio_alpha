<template>
  <div class="container">
    <div class="sub-container">
      <div id="btns-parent">
        <button v-for="id in idList" :key="id.id" @click="loadPlaylist(id.playlist_id, id.playlist_name)">{{id.playlist_name}}</button>
      </div>
      <div class="video-container">
        <div id="video-mask"></div>
        <youtube :player-vars="playerVars" ref="youtube" @playing="playing"></youtube>
      </div>
    </div>
    <div class="controls">
      <button id="pause-btn" @click="prevVideo">prev song</button>
      <button id="pause-btn" @click="pauseVideo">pause</button>
      <button id="play-btn" @click="playVideo">play</button>
      <button id="pause-btn" @click="nextVideo">next song</button>
      <span style="color: white">{{this.songTitle}}</span>
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
      currentTime: '',
      songTitle: '',
      playerVars: {
        listType: 'playlist',
        list: this.currentId
      }
    }
  },
  methods: {
    playVideo () {
      this.player.playVideo()
      document.querySelector('#play-btn').classList.add('playing')
    },
    pauseVideo () {
      this.player.pauseVideo()
      document.querySelector('#play-btn').classList.remove('playing')
    },
    prevVideo () {
      this.player.previousVideo()
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
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="css" >

  .sub-container {
    margin: 0 auto;
    display: flex;
    height: 100vh;
    flex-flow: row wrap;
    position: relative;
    justify-content: center;
    align-items: center;
  }

  /* Responsive Iframe */

  .video-container {
    position: relative;
    padding-bottom: 37%;
    height: 0;
    width: 50%;
    flex: 0 1 50%;
    align-self: flex-start;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  /* The mask */

  #video-mask {
    background-image: url(/img/microonde.2265529c.png);
    position: absolute;
    width: 100vw;
    height: 150%;
    background-size: 80%;
    background-repeat: no-repeat;
    z-index: 9;
    transform: translate(-13%,-15%);
  }

  #btns-parent {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    position: relative;
    flex: 0 1 50%;
  }

  #titre-footer {
    padding: 0;
    margin: .3em 1em;
    position: absolute;
    top: 3.5em;
    right: .5em;
  }

  /* Controls */

  .controls {
    padding-bottom: .5em;
    position: fixed;
    bottom: 0;
  }

  h2 {
    color: #ffb300;
    margin: 0;
    font-size: 1em;
  }

  button {
    background: red;
    font-family: Courier New;
    font-weight: bold;
    border: none;
    height: 2em;
    margin: .3em;
    padding: .3em .9em;
    color: #dfdfdf;
    cursor: pointer;
  }

  .controls button {
    background: transparent;
    font-family: Courier New;
    font-weight: bold;
    min-height: unset;
    margin: .3em;
    padding: .3em .9em;
    color: #dfdfdf;
    cursor: pointer;
    height: auto;
    min-width: unset;
  }

  .controls button.playing {
    color: #ffb300;
  }

  @media all and (max-width: 647px){

  }

  @media all and (max-width: 985px){
    .sub-container {

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

    }
  }

</style>
