<template>
<div>
<div class="search-input-wrapper">
    <span class="reset" v-show="searchMode"><a v-on:click="initialQuery">reset</a></span>
    <div class="input-search-wrapper" >
        <input type="text" placeholder="Search Movies" v-model="searchInput" v-on:keyup.enter="submitSearch" >
    <div class="search-icon-wrapper" v-on:click="submitSearch" v-bind:class="[searchInput.trim().length>0?'expand':'']">
        <b-icon  icon="search" aria-hidden="true"  font-scale="1" disabled></b-icon>
    </div>
    </div>
    <div class="under-text"></div>
</div>
<div class="movie-list-wrapper">
    <div class="loading" v-if="showLoader||error.length>0">
        <b-spinner variant="primary" v-show="showLoader"></b-spinner>
        <div v-show="error.length>0">{{error}}</div>
    </div>
    
<b-list-group v-else>
    <!-- v-on:click="sendData(item)" -->
  <b-list-group-item  v-for="item in list" :key="item.imdbID" class="list" v-bind:class="{'selected':$route.params.movieId==item.imdbID}">
      <router-link :to="item.imdbID" style="text-decoration: none;color: inherit;">
      <div class="list-wrapper">
          <img v-bind:style="{ 'background-image': 'url(' + item.Poster + ')' }">
          <div class="list-info">
              <h6 class="title"><strong>{{item.Title}}</strong></h6>
              <small class="movie-year text-muted">{{item.Year}}</small>
          </div>
      </div>
      </router-link>
      <!-- {{item.Title}}
      <small class="movie-year">{{item.Year}}</small> -->
      </b-list-group-item>
</b-list-group>
</div>
<div class="pagination" v-show="pageCount>0&&error.length==0">
    <b-list-group horizontal class="pagination-list">
  <b-list-group-item class="caret"><b-icon v-on:click="prevPage" icon="caret-left" aria-hidden="true" disabled></b-icon> </b-list-group-item>
  <b-list-group-item class="page-info"><div>Page {{pageCount}}</div><div>{{totalResults}} results</div></b-list-group-item>
  <b-list-group-item class="caret"><b-icon v-on:click="nextPage" icon="caret-right" aria-hidden="true"></b-icon> </b-list-group-item>
</b-list-group>
</div>
</div>
</template>
<script>
import {eventBus} from "../main";
export default {
    name:'MovieList',
    data(){
        return{
            list:[],
            searchInput:'',
            error:'',
            showLoader:false,
            pageCount:0,
            totalResults:0,
            searchMode:false,
            searchText :'Batman'
        }
    },
    created(){
        this.initialQuery();
    },
    methods:{
        submitSearch(){
            if(!this.searchInput.trim()){
                return true;

            }else{
                this.error='';
                this.searchMode=true;
                this.searchText = this.searchInput;
                this. showLoader=true;
                var Url= 'https://www.omdbapi.com/?apikey=7feb5d10&type=movie&s='+this.searchText;
                this.$http.get(Url).then((response) => {
                if(response.data.Response==="True"){
                    console.log(response.data.Search)
                     
                     this.pageCount=1;
                    this.totalResults = response.data.totalResults;
                    this.list = response.data.Search;
                    this.showLoader =false;
                }else{
                     this.error=response.data.Error;
                     this.showLoader =false;
                }
               
                })
            }
        },
        initialQuery(){
            this.searchMode=false;
            this.searchText ='Batman';
            this.searchInput='',
            this.error='';
            this.showLoader = true;
            var Url= 'https://www.omdbapi.com/?apikey=7feb5d10&type=movie&s='+this.searchText;
            this.$http.get(Url).then((response) => {
            if(response.data.Response==="True"){
                this.pageCount=1;
                console.log(response.data.Search)
                this.totalResults = response.data.totalResults;
                this.list = response.data.Search;
                this.showLoader=false;
            }else{
                this.error=response.data.Error;
                this.showLoader =false;
            }
         

    })
        },
        prevPage(){
            if(this.pageCount==1||this.shoLoader){
                return true;
            }else{
                 this. showLoader=true;
                var Url= 'https://www.omdbapi.com/?apikey=7feb5d10&type=movie&s='+this.searchText+'&page='+(this.pageCount-1);
                      this.$http.get(Url).then((response) => {
                if(response.data.Response==="True"){
                    console.log(response.data.Search)
                    this.error='';
                    this.pageCount = this.pageCount-1;
                    this.totalResults = response.data.totalResults;
                    this.list = response.data.Search;
                    this.showLoader =false;
                }else{
                     this.error=response.data.Error;
                     this.showLoader =false;
                }
               
                })
            }
        },
        nextPage(){
            if(this.pageCount==0||this.shoLoader||this.list.length>10||(((this.pageCount-1)*10)+this.list.length)==this.totalResults){
                return true;
            }else{
                this. showLoader=true;
                var Url= 'https://www.omdbapi.com/?apikey=7feb5d10&type=movie&s='+this.searchText+'&page='+(this.pageCount+1);
                      this.$http.get(Url).then((response) => {
                if(response.data.Response==="True"){
                    console.log(response.data.Search)
                    this.error='';
                    this.pageCount = this.pageCount+1;
                    this.totalResults = response.data.totalResults;
                    this.list = response.data.Search;
                    this.showLoader =false;
                }else{
                     this.error=response.data.Error;
                     this.showLoader =false;
                }
               
                })
            }
        },
        sendData(item){
             eventBus.$emit('sistersaid', item)
        }
    }
}
</script>
<style lang="scss" scoped>
.search-input-wrapper{
    padding:5% 4% ;
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1;
    background: #fff;
    .input-search-wrapper{
        position: relative;
        .search-icon-wrapper{
        position: absolute;
        top: 0px;
        bottom: 0;
        right: -10px;
        width: 10%;
        border-radius: 5px;
        transition: all 0.2s ease-in-out;
        border: none;
        outline: none;
        opacity: 0;
        cursor: pointer;
        &.expand{
            right: 0;
            opacity: 1;
        }
        svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 60%;
        widows: 100%;
        }
        }
    }
    .under-text{
    position: absolute;
    bottom: -18px;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 20px !important;
    background-image: -webkit-linear-gradient(top, #fff 0%, white, white, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1));
    padding-top: 35px;
    border-bottom-left-radius: 30px 15px;
    border-bottom-right-radius: 30px 15px;
    }
    input{
    width: 100%;
    padding: 2% 3%;
    border-radius: 10px;
    outline: none;
    border: .15vw solid;
    font-size: 1.2vw;
     @media screen and (max-width:767px){
     font-size: 4vw;
        }
    }   
    .reset{
        position: absolute;
        text-decoration: underline;
        top: -1px;
        right: 4%;
        right: 4%;
        font-size: 85%;
        cursor: pointer;
    }
}
 
.movie-list-wrapper{
    margin: 6.5VW 0 0;
    padding-top: 4%;
    height: calc(100vh - 25vh);
    overflow: auto;
    scrollbar-width: none;
      @media screen and (max-width:767px){
     margin-top: 20vw;
        }
    &::-webkit-scrollbar {
    width: 0px;
    }
    .reset{
    position: absolute;
    text-decoration: underline;
    top: 0;
    right: 4%;
    }
    .loading{
    text-align: center;
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width:767px){
        top: 40%;
    }
     span{
        width: 5vw;
        height: 5vw;
           @media screen and (max-width:767px){
            width: 20vw;
            height: 20vw;
        }
        }
    }
    .list{
    padding: 2% 4%;
    border: none;
    font-size: 1.2vw;
    margin-bottom: .5vw;
    border-width: .15vw  !important;
    border-radius: unset  !important;
    transition: box-shadow 0.2s ease-in-out;
    cursor: pointer;
     @media screen and (max-width:767px){
          margin-bottom: 1.5vw;
        }
    &:hover{
        box-shadow: 0px 0px 6px #b9c2fe;
    }
    &.selected{
        background: #f1f2fc;
    }
    .movie-year{
    bottom: 3px;
    right: 5px; 
    @media screen and (max-width:767px){
   font-size: 4vw;
        }
    }

    }
}
.pagination-list{
    width: 100%;
    .page-info{
    width: 80%;
    text-align: center;
    font-size: 1.1vw;
      @media screen and (max-width:767px){
         font-size: 4vw;
         width: 70%;
        }
    
    }
    .caret{
    width: 10%;
    cursor: pointer;
    &:nth-child(1) {
    border-left: 0 !important;
    }
    &:last-child {
    border-right: 0 !important;
    }
    @media screen and (max-width:767px){
     width: 15%;
        }
        svg{
        width: 2.5vw;
        height: 2.5vw;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        @media screen and (max-width:767px){
         width: 8vw;
        height: 8vw;
        }
        }
    }
}

.list-wrapper{
    img{
    height: auto;
    padding-top: 5vw;
    width: 5vw;
    background-size: cover  !important;
    background-position-y: center  !important;
    background-position-x: center  !important;
    border-radius: 5px;
    -o-object-fit: scale-down;
    object-fit: scale-down;
    float: left;
    margin-right: 1vw;
    background: #f3f0f0;
    @media screen and (max-width:767px){
    padding-top: 20vw;
    width: 20vw;
    margin-right: 3vw;
        }
    }
    .list-info{ 
        .title{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        }
    }
}
</style>