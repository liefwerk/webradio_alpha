<template>
  <div class="container">
    <div id="btns-parent" class="show-me">
      <button v-for="id in idList" :key="id.id" @click="loadPlaylist(id.playlist_id, id.playlist_name)">{{id.playlist_name}}</button>
    </div>
    <div class="video-container">
      <img src="@/assets/img/microonde.png" id="video-mask" />
      <youtube :player-vars="playerVars" ref="youtube" @playing="playing"></youtube>
    </div>
    <div id="controls">
      <button id="pause-btn" @click="prevVideo">prev song</button>
      <button id="pause-btn" @click="pauseVideo">pause</button>
      <button id="play-btn" @click="playVideo">play</button>
      <button id="pause-btn" @click="nextVideo">next song</button>
      <button v-if="showed" @click="handleOverlay">fermer les playlists</button>
      <button v-else @click="handleOverlay">afficher les playlists</button>
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
      showed: true,
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
    },
    handleOverlay () {
      console.log('clické')
      document.getElementById('btns-parent').classList.toggle('show-me')
      this.showed = !this.showed
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

  @import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=VT323&display=swap');

  .container {
    overflow: hidden;
  }

  /* Responsive Iframe */

  .video-container {
    position: absolute;
    padding-bottom: 6rem;
    height: 0;
    width: 10rem;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: visible;
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
    width: 180%;
    height: auto;
    position: relative;
    z-index: 99;
    top: -3.5rem;
    right: 3rem;
  }

  #btns-parent {
    display: flex;
    flex-flow: row wrap;
    position: absolute;
    left: -100%;
    top: 0;
    height: 85vh;
    width: 15em;
    z-index: 199;
    margin: 1em;
    transition: all .5s ease-in-out;
    overflow-y: auto;
    background: #333;
    opacity: .8;
    padding-bottom: .5em;
  }

  #btns-parent.show-me {
    left: 0;
  }

  #titre-footer {
    padding: 0;
    margin: .3em 1em;
    position: absolute;
    top: 2.5em;
    right: .5em;
    font-family: 'VT323', monospace;
    font-size: 1.4em;
  }

  /* Controls */

  #controls {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: block;
    z-index: 300;
    background: #d03636;
    padding: .5em;
    text-align: center;
  }

  h2 {
    color: #ffb300;
    margin: 0;
    font-size: 1em;
  }

  #btns-parent button {
    background: transparent;
    font-family: 'VT323', monospace;
    font-size: 1.3em;
    font-weight: normal;
    border: none;
    margin: .2em;
    padding: .3em .5em;
    color: white;
    cursor: pointer;
    text-align: left;
    display: block;
  }

  #controls button {
    background: transparent;
    font-family: 'Major Mono Display', monospace;
    min-height: unset;
    margin: .3em;
    padding: .3em .9em;
    color: #dfdfdf;
    cursor: pointer;
    height: auto;
    font-size: 1em;
    min-width: unset;
    border: none;
    display: inline-block,
  }

  #controls button.playing {
    color: #ffb300;
  }

  @media all and (min-width: 647px){
    .video-container {
      padding-bottom: 10rem;
      width: 15rem;
    }

    /* The mask */

    #video-mask {
      top: -4.8rem;
      right: 3.5rem;
    }
  }

  @media all and (min-width: 985px){
    .video-container {
      padding-bottom: 12rem;
      width: 20rem;
    }

    /* The mask */

    #video-mask {
      top: -6.9rem;
      right: 3.9rem;
    }

    #btns-parent {
      width: 20em;
    }
  }

  @media all and (min-width: 986px) and (max-width: 1280px){
  }

</style>
