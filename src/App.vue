<template>
  <div id="app" style="overflow-x:hidden;">
          <div class="row main-grid">
           <div class="col-sm-12 col-md-4 right-col" v-bind:class="{'offset-md-4': !$route.params.movieId}"><MovieList /></div>
           <div class="col-sm-12 col-md-8" v-bind:class="{'offset-md-4': $route.params.movieId}">
             <router-view :key="$route.fullPath"></router-view>
           </div>
          </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
 import MovieList from './components/MovieList.vue'
  // import MovieInfo from './components/MovieInfo.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld
    MovieList,
    // MovieInfo
  }
}
</script>

<style lang="scss" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.main-grid{
  margin: 0 !important;
  .right-col{
    position: fixed;
    padding-left: 0  !important;
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding-right: 0 !important;
     @media screen and (max-width:767px){
     position: unset;
        }
  }
}
</style>
