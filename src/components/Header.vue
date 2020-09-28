<template>
  <div id="header">
    <h1>Webradio Alpha - v0.37</h1>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="css" scoped>
  h1 {
    padding: 0 1em;
    color: #dfdfdf;
    text-align: left;
    font-size: 1.6em;
    font-family: Courier New;
  }

  @media all and (max-width: 985px){
    #header {
      font-size: .7em;
    }
  }
</style>
