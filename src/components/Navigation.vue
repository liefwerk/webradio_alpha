<template>
  <span id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <template v-if="this.$store.state.isAuthenticated">
      <router-link to="/account">My Account</router-link>
    </template>
    <template v-else>
      <router-link to="/connect">Connect</router-link>
    </template>
  </span>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
#nav {
  font-family: 'Courier New', monospace;
  margin: 0 1rem;
  float: right;
  display: flex;
  flex-flow: column nowrap;
  text-align: right;
  font-size: 1.2rem;

  a {
    color: var(--primary);
    text-decoration: none;

    &:hover {
      color: var(--white);
    }
  }

}
</style>
