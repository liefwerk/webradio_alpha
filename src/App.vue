<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

body {
  background: #121212;
  overflow: hidden;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  position: absolute;
  right: 2em;
  top: 1em;
  font-family: Courier New;
  color: orange;

  a {
    color: #d03636;
  }

}

p {
  color: #dfdfdf;
}

@media all and (max-width: 985px){
  #nav {
    display: none;
  }
}

</style>
