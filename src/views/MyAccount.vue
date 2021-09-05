<template>
  <div class="container wrapper">
    <div class="my-playlists">
      <MyPlaylists />
    </div>
    <div class="my-account">
      <h1>My Account</h1>
      <p>{{this.$store.state.userEmail}}</p>
      <h2>Recover my password</h2>
      <a class="link">Send a link to recover your password</a>
    </div>
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

<style lang="scss" scoped>
  .container {
    max-width: 1250px;
    margin: 2rem 4rem 0;
    &.wrapper {
      display: flex;
      flex-flow: row nowrap;
      .my-account {
        width: 30%;
        h1, h2 {
          margin-left: 0;
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
      }
      .my-playlists {
        width: 70%;
      }
    }
  }
  @media all and (max-width: 985px){
    .container {}
  }
</style>
