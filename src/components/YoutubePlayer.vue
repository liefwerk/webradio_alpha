<template>
  <div class="container">
    <h2>{{this.currentName}}</h2>
    <div class="parent-flex">
      <div class="wrap-element">
        <iframe class="wrapped-iframe" width="560" height="315" :src="`https://www.youtube-nocookie.com/embed/videoseries?list=`+ this.currentId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div id="btns-parent">
        <button v-for="id in idList" :key="id.id" @click="changePlaylist(id.playlist_id, id.playlist_name)">{{id.playlist_name}}</button>
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

  .parent-flex {
    display: flex;
    flex-flow: row nowrap;
  }

  .container {
    margin: 0 auto;
    max-width: 80vw;
  }

  /* Responsive Iframe */

  .wrap-element {
    position: relative;
    overflow: hidden;
    order: 1;
    flex-basis: 75%;
  }

  .wrapped-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  #btns-parent {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    padding: 1.5em;
    order: 0;
    flex-basis: 50%;
  }

  h2 {
    color: blue;
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

  @media all and (max-width: 893px){
    .parent-flex {
      flex-flow: column nowrap;
    }
    .container {
      max-width: 100%;
    }
    .wrap-element {
      padding: 15%;
    }
    button {
      font-size: .8em;
      padding: .2em .4em;
    }
    #btns-parent {
      justify-content: center;
    }
  }

</style>
