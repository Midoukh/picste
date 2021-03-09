import React, {Component, useState, useEffect} from 'react'
import axios from 'axios'
import classes from './Presentation.css'
import Rating from '../Rating/Rating'
import Trailer from './Trailer/Trailer'
import Modal from '../Modal/Modal'
import LoveButton from '../../UI/LoveButton/LoveButton'
import Gallery from '../Gallery/Gallery'
import Banner from '../Banner/Banner'

class Presentation extends Component {
    constructor(props){
        super(props)

        this.state = {
            homeMovie: {},
            movies: [],
            loading: true,
            data: null,
            error: null,
            randomNum: 1,
            trailerPath: null,
            showModal: false
        }
    }
    handleFetchHomeMovie = async () => {
        const randomMovie = Math.floor(Math.random() * 11)
        const latestMovieEndPoint = 'https://api.themoviedb.org/3/movie/popular?api_key='

        const res = axios.get(`${latestMovieEndPoint}${process.env.REACT_APP_PUBLIC_API_KEY}&language=en-US&page=1`)
        .then(data => {
          this.setState({ movies: data.data.results })

          this.setState({ homeMovie: data.data.results[randomMovie] })
          const movieId = data.data.results[randomMovie].id
          const trailerEndpoint = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}`
          //find the trailer key
          axios.get(trailerEndpoint)
            .then(res => {
                console.log(res)
                this.setState({trailerPath: res.data.results[0].key})
                console.log(res)
            }).catch(err => {
                console.log(err)
            })        
  
        })
        .catch(error => console.log(error))

      }
 
    //only want this page to rerender when reload
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.hideText === this.props.hideText
    }
    
    handleFavouriteMovie = (id) => {
        let newVal = !this.state.movie.favourite
        const previousMovies = JSON.parse(localStorage.getItem('favourites'))
        if (previousMovies){
            const updatedFavouriteMovies = [...previousMovies ,{id: id, favourite: newVal, createdAt: new Date(), type: 'movie'}]
 
            localStorage.setItem('favourites',
            JSON.stringify(updatedFavouriteMovies))
            console.log(updatedFavouriteMovies)
        }
        else{
            localStorage.setItem('favourites', JSON.stringify([{id: id, favourite: newVal, createdAt: new Date(), type: 'movie'}]))
        }
      
        this.setState({ movie: { favourite: newVal}})
    
    }
    handleCheckIfFavourite = (id) => {
        //return boolean
        const favouriteMovies = JSON.parse(localStorage.getItem('favourites'))
        let isFavourite = false
        if (favouriteMovies){

            favouriteMovies.forEach(item => {
                if (item.id === id){
                    isFavourite = item.favourite
                }
            })
        }
        return isFavourite

    }
    displayTrailer = () => {
        const newVal = !this.state.showModal

        this.setState({ showModal: newVal })
  
    }
    componentDidMount() {
        //fetch a trailer for the home page movie
        this.handleFetchHomeMovie()
        this.handleCheckIfFavourite()
    }
    
    render(){
        //a new movie with each new reload
        const movie = this.state.homeMovie
        const movies = this.state.movies
        const toggleHideTxt = this.props.toggleHideTxt
        const handleDescription = this.props.handleDescription
       
        
        //fetching media for a specific 
        const imageBoiler = 'https://image.tmdb.org/t/p/w500/'
        const trailerBoiler = 'https://www.youtube.com/embed/'
        
  
    //movie informations
    const homeMovie = movie && {
        title: movie.original_title,
        averageVote: movie.vote_average,
        overview: handleDescription(movie.overview),
        longOverview: movie.overview,
        year: String(movie.release_date).slice(0, 4),
        poster: movie.poster_path,
        backPath: movie.backdrop_path,
        id: movie.id
    }
    //this function is for minifying the description in case its to long to fit
    console.log(trailerBoiler + this.state.trailerPath)
    return (
        homeMovie?
        <main>
        {this.state.showModal &&
        <Modal 
        trailerURL={trailerBoiler + this.state.trailerPath} 
        displayTrailer={this.displayTrailer}>

        </Modal>
        }
        <div className={classes.Presentation} 
            style={{backgroundImage: homeMovie.poster && `url(${imageBoiler}${homeMovie.poster})`, marginTop: this.props.showModal && '0px'}}>
            <div className={classes.Details}>
                <div className={classes.DetailsTxt}>

                <div className={classes.Love}>
                    <h1>{homeMovie.title}</h1>
                    <LoveButton 
                    setLove={this.handleFavouriteMovie} 
                    love={this.handleCheckIfFavourite(homeMovie.id)} 
                    id={homeMovie.id}/>

                </div>
                {homeMovie.averageVote && <Rating ratingAvg={homeMovie.averageVote} year={homeMovie.year} height="35px"/>}
                <div onClick={(e) =>toggleHideTxt(e, homeMovie.longOverview, homeMovie.overview)}>
                    <p>
                        {homeMovie.overview}
                    </p>
                    {this.props.longDescription? 
                    <span id="read_more">Read more</span>: null}
                </div>
               
                </div>
                <Trailer 
                thumbnail={imageBoiler + homeMovie.poster} 
                displayTrailer={this.displayTrailer}
                />
            </div>
            <Gallery movies={movies.slice(0, 10)} label={"The Best Films"}/>
            <Gallery movies={movies.slice(10)} label={"Trending"} handleFavouriteMovie={this.handleFavouriteMovie}/>
            <Banner />

        </div> 
        </main>: 'loading...'
    )
 }

}

export default Presentation