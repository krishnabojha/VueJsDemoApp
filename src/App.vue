<template>
  <div id="app">
    <b-container id="ctn">
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #ctn{
    width: 75%;
  }
  </style>
