<template>
  <div class="container">
    <div id="btns-parent" class="show-me">
      <button v-for="id in idList" :key="id.id" @click="handlePlaylist(id.playlist_id, id.playlist_name)">{{id.playlist_name}}</button>
    </div>
    <div class="video-container">
    <div id="layer"></div>
      <youtube :player-vars="playerVars" ref="youtube" @playing="playing"></youtube>
    </div>
    <div id="controls">
      <span id="btns-closing">
        <arrow-left-icon v-if="showed" size="2x" class="custom-class" @click="handleOverlay"></arrow-left-icon>
        <arrow-right-icon v-else size="2x" class="custom-class" @click="handleOverlay"></arrow-right-icon>
      </span>
      <button id="pause-btn" @click="prevVideo"><skip-back-icon size="1.5x" class="custom-class"></skip-back-icon></button>
      <button v-if="isPlaying" id="pause-btn" @click="pauseVideo"><pause-icon size="1.5x" class="custom-class"></pause-icon></button>
      <button v-else id="play-btn" @click="playVideo"><play-icon size="1.5x" class="custom-class"></play-icon></button>
      <button id="pause-btn" @click="nextVideo"><skip-forward-icon size="1.5x" class="custom-class"></skip-forward-icon></button>
    </div>
    <div id="titre-footer"><h2>{{this.currentName}}</h2></div>
  </div>
</template>

<script>
import axios from 'axios'
import { PlayIcon, SkipForwardIcon, SkipBackIcon, PauseIcon, ArrowRightIcon, ArrowLeftIcon } from 'vue-feather-icons'

export default {
  name: 'Youtube-Player',
  data () {
    return {
      idList: '',
      currentId: '',
      currentName: '',
      songTitle: '',
      isPlaying: false,
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
      this.isPlaying = !this.isPlaying
      this.player.pauseVideo()
      document.querySelector('#play-btn').classList.remove('playing')
    },
    prevVideo () {
      this.isPlaying = !this.isPlaying
      this.player.previousVideo()
    },
    nextVideo () {
      this.isPlaying = !this.isPlaying
      this.player.nextVideo()
    },
    playing () {
      this.isPlaying = !this.isPlaying
    },
    handlePlaylist (id, name) {
      this.currentId = id
      this.currentName = name
      console.log(this.currentName)
      this.player.loadPlaylist({ listType: 'playlist', list: this.currentId, modestbranding: 1, rel: 0 })
      if (this.isPlaying === true) { this.isPlaying = false }
    },
    handleOverlay () {
      document.getElementById('btns-parent').classList.toggle('show-me')
      this.showed = !this.showed
    }
  },
  components: {
    PlayIcon,
    SkipForwardIcon,
    SkipBackIcon,
    PauseIcon,
    ArrowRightIcon,
    ArrowLeftIcon
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
    width: 9rem;
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

  #layer {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9;
    top: 0;
    background: rgba(55, 58, 81, 0.22);
  }

  #btns-parent {
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    left: -100%;
    top: 0;
    height: 72vh;
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

  #btns-closing {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 1em;
    top: -50px;
    color: #d03636;
    cursor: pointer;
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
    display: flex;
    z-index: 300;
    background: #d03636;
    padding: .5em;
    text-align: center;
    flex-flow: row wrap;
    justify-content: center;
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

    #btns-parent {
      height: 78vh;
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
      height: 85vh;
    }
  }

  @media all and (min-width: 986px) and (max-width: 1280px){
  }

</style>
