<template>
  <div class="container">
    <div class="sub-container">
      <div id="btns-parent">
        <button v-for="id in idList" :key="id.id" @click="changePlaylist(id.playlist_id, id.playlist_name)">{{id.playlist_name}}</button>
      </div>
      <div class="wrap-element">
        <iframe class="wrapped-iframe" width="500" height="500" :src="`https://www.youtube-nocookie.com/embed/videoseries?list=`+ this.currentId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
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

  .sub-container {
    margin: 0 auto;
    display: grid;
    grid-template-columns: [row1-start] 25% [line2] auto [end];
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    overflow: hidden;
  }

  /* Responsive Iframe */

  .wrap-element {
    padding: .3em 2em;
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

  h2 {
    color: blue;
    margin: 0;
  }

  button {
    background: red;
    font-family: Courier New;
    font-weight: bold;
    height: 2.5em;
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
