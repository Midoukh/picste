import React, {Component, useState, useEffect} from 'react'

import classes from './Presentation.css'
import Rating from './Rating/Rating'
import Trailer from './Trailer/Trailer'
import Modal from '../Modal/Modal'
class Presentation extends Component {
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            data: null,
            error: null,
            randomNum: 13,
            trailerPath: null
        }
    }
    //only want this page to rerender when reload
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.hideText === this.props.hideText
    }
    async componentDidMount() {
        //fetch a trailer for the home page movie
        const movieId = this.props.movies && this.props.movies[this.state.randomNum].id
        const trailerEndpoint = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}`
        
        const response = await fetch(trailerEndpoint)
        .then(data => data.json())
        .then(res => {
            console.log('trailer',res)
            res && this.setState({trailerPath: res.results[0].key})
        }).catch(err => {
            console.log(err)
        })
    
    }
    
    render(){
    
        const movies = this.props.movies
        const hideText = this.props.hideText
        const toggleHideTxt = this.props.toggleHideTxt
        const handleDescription = this.props.handleDescription
       
        //regex for shortening the movie overiew
        const regex = /^(.{199}[^\s]*).*/
        //fetching media for a specific 
        const imageBoiler = 'https://image.tmdb.org/t/p/w500/'
        const trailerBoiler = 'https://www.youtube.com/embed/'
        //a new movie with each new reload
        const r = this.state.randomNum
  
    //movie informations
    const homeMovie = movies &&{
        title: movies[r].original_title,
        averageVote: movies[r].vote_average,
        overview: handleDescription(movies[r].overview),
        longOverview: movies[r].overview,
        year: movies[r].release_date,
        poster: movies[r].poster_path,
        backPath: movies[r].backdrop_path
    }

    //this function is for minifying the description in case its to long to fit
      
    return (
        movies?
        <main>
        {this.props.showModal &&
        <Modal trailerURL={this.state.trailerPath? trailerBoiler + this.state.trailerPath: null} displayTrailer={this.props.displayTrailer}>

        </Modal>
        }
        <div className={classes.Presentation} style={{backgroundImage: homeMovie.poster && `url(${imageBoiler}${homeMovie.poster})`, marginTop: this.props.showModal && '0px'}}>
            <div className={classes.Details}>
                <div className={classes.DetailsTxt}>

                <h1>{homeMovie.title}</h1>
                <Rating ratingAvg={homeMovie.averageVote} year={homeMovie.year.slice(0, 4)} height="35px"/>
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
                displayTrailer={this.props.displayTrailer}
                
                />
            </div>
        </div> 
        </main>: 'loading...'
    )
 }

}

export default Presentation