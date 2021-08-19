<template>
  <div class="container my-account">
    <h1>My Account</h1>
    <p>{{this.$store.state.userEmail}}</p>
    <MyPlaylists />
  </div>
</template>

<script>
import MyPlaylists from '@/components/users/MyPlaylists'

export default {
  name: 'MyAccount',
  components: {
    MyPlaylists
  }
}
</script>

<style lang="scss">
  .container {
    margin: 5em;
  }
  .my-account {
    h1, h2 {
      margin-left: 0;
    }
  }
</style>
