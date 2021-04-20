<template>
  <span id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/sign-up">Sign Up</router-link>
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
      color: white;
    }
  }

}
</style>
