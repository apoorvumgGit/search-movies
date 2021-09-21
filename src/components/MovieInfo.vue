<template>
    <div class="movie-info" ref="movieDetailed" v-show="$isMobile()?true:!loading">
    <b-container >
    <b-row>
        <b-col sm="12"  md="8" order="2" order-sm="2"><div>
            <h1 class="title-text">{{movieInfo.Title}}</h1>
            <p class="text-muted country-year-etc"><small>{{movieInfo.Country?movieInfo.Country+" | ":''}}{{movieInfo.Year+' | '}}{{movieInfo.Genre}}</small></p>
            <div class="font-weight-light"><b-icon  icon="star-fill" aria-hidden="true" variant="warning" disabled></b-icon><b>&nbsp;&nbsp;{{movieInfo.imdbRating}}</b> imdb</div>
            <p class="plot">{{movieInfo.Plot}}</p>
        
            <p class="bottom-info"><b class="color-black">Language:  </b>{{movieInfo.Language}}</p>
            <p class="bottom-info"><b class="color-black">Director:  </b>{{movieInfo.Director}}</p>
            <p class="bottom-info"><b class="color-black">Actors:  </b>{{movieInfo.Actors}}</p>
            <p class="bottom-info"><b class="color-black">Duration:  </b>{{movieInfo.Runtime}}</p>
            </div>
            </b-col>
        <b-col sm="12"  md="4" order="1" order-sm="2">
            <div>
                <img class="movie-poster" v-bind:style="{ 'background-image': 'url(' + movieInfo.Poster + ')' }">
            </div>
        </b-col>
    </b-row>
    </b-container>

    </div>
</template>
<script>
// import {eventBus} from "../main";
export default {
    name:'MovieInfo',
    data(){
        return{
            loading:true,
            movieInfo:{
                id:this.$route.params.movieId?this.$route.params.movieId:''
            }
        }
    },
    methods:{
        showMovieInfo(){
            this.loading=true;
            var url = 'https://www.omdbapi.com/?apikey=7feb5d10&type=movie&plot=full&i='+ this.movieInfo.id;
              this.$http.get(url).then((response) => {
                if(response.data.Response==="True"){
                    this.loading=false
                    this.movieInfo = response.data;
                }
               
                })
        }
    },
    mounted(){
    if(this.$isMobile()){
      var element = this.$refs.movieDetailed;
      element.scrollIntoView()
    }
    },
    created(){
        if(this.movieInfo.id){
            this.showMovieInfo()
        }
    //     eventBus.$on('sistersaid', (movie) => {
    //         this.movieInfo.id = movie.imdbID;
    //         this.showMovieInfo()
    //  });
    }
    
}
</script>
<style lang="scss" scopes>
    .movie-info{
        padding: 3% 1%;
        .container{
        @media screen and (max-width:767px){
        padding: 0;
        }
        }
        .country-year-etc{

            margin-bottom: 0.5rem;
        }
        .plot{
                margin: 0.5em 0 0.75em;
    line-height: 140%;
    padding: 0;
    font-size: 17px;
        }
        .bottom-info{
            margin-bottom: 0;
            font-size: 85%;
            .color-black{
                color: black;
            }
        }
        .movie-poster{
            height: auto;
            padding-top: 100%;
            width: 100%;
            background: #f3f0f0;
            background-size: cover;
            background-position-y: center;
            background-position-x: center;
            border-radius: 5px;
            object-fit: scale-down;
            @media screen and (max-width:767px){
            margin-top: 5vw;
            margin-bottom: 7vw;
            }
        }
    }
</style>