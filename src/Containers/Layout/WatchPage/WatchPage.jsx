import React from 'react'
import classes from './WatchPage.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Spinner from '../../../UI/Spinner'
import Flair from '../../../UI/Flair/Flair'
import Button from '../../../UI/Button/Button'
import Modal from '../../../Components/Modal/Modal'
import LoadingProgress from '../../../UI/LoadingProgress/LoadingProgress'
class Watchpage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            itemContent: {},
            itemId: null,
            itemType: '',
            posterEndPoint: 'https://image.tmdb.org/t/p/w500/',
            trailerEmbed: 'https://www.youtube.com/embed/',
            trailerKey: null,
            showModal: false
        }
    }
    //extracting the id and the type from the search query
    handleGettingIdAndType = () => {
        const query = new URLSearchParams(this.props.location.search)
        let itemId = '', itemType = ''
        for (let param of query.entries()){
            if (param[0] === 'itemId'){
                this.setState({ itemId: +param[1] })
                itemId = +param[1]
            }
            if (param[0] === 'itemType'){
                this.setState({ itemType: param[1] })
                itemType = param[1]
            }
        }
        this.handleFetchItems(itemType, itemId)

    }
    //fetching
    handleFetchItems = (type, id) => {
         

            console.log(this.state)
            if (type === 'movie'){
                const endPoint = `https://api.themoviedb.org/3/movie/${id}}?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}&language=en-US`
                const res = axios.get(endPoint)
                .then(data => {
                    
                    this.setState({ itemContent: data.data })
                        const trailerEndpoint = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}`
                        axios.get(trailerEndpoint)
                        .then(res => {
                            console.log(res)
                            this.setState({ trailerKey: res.data.results[0].key })
                        })
                            
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
    
                }
            else if (type === 'tv') {
                console.log('fetching tv')
    
                const endPoint = `https://api.themoviedb.org/3/tv/${id}}?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}&language=en-US`
                const res = axios.get(endPoint)
                .then(data => {
                    console.log(data)
                    this.setState({ itemContent: data.data })
                    const trailerEndpoint = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}`
                        axios.get(trailerEndpoint)
                        .then(res => {
                            console.log(res)
                            this.setState({ trailerKey: res.data.results[0].key })
                        })
                            
                        .catch(err => console.log(err))
    
                })
                .catch(err => console.log(err))
                }
    }
    componentDidMount = () =>{
        this.handleGettingIdAndType()
    }
    displayTrailer = () => {
        const newVal = !this.state.showModal

        this.setState({ showModal: newVal })
  
      }

    render(){
        const item = this.state.itemContent
        const poster = this.state.posterEndPoint + item.poster_path
        const year = item.first_air_date || item.release_date
        const numberOfEpisodes =  item.number_of_episodes && item.number_of_episodes + ' Episodes'
        const movieGenre = item.genres && item.genres[0].name
        const flairGenres = item.genres && item.genres
        const spokenLanguage = item.spoken_languages
        const overView = item.overview && item.overview
        const trailer = this.state.trailerKey && this.state.trailerEmbed + this.state.trailerKey
        const voteAverage = item.vote_average && item.vote_average * 10
        console.log(item)
        console.log(trailer)

        return (
            item !== {}?
            <main className={classes.Watchpage}>
                {this.state.showModal? <Modal displayTrailer={this.displayTrailer} trailerURL={trailer}/>: null}
                <section className={classes.Head}>
                    <h1>{item.name || item.title}</h1>
                    <div className={classes.HeadDetails}>
                        <h3>
                            <span className={classes.year}>{String(year).substr(0, 4)} </span>
                            •
                            <span className={classes.episode}> {this.state.itemType === 'tv'? numberOfEpisodes: movieGenre} </span>
                            •
                            <span className={classes.language}> {item.spoken_languages && item.spoken_languages[0].english_name}</span>
                        </h3>
                        <LoadingProgress value={voteAverage}/>
                    </div>
                </section>
                <section className={classes.Body}>
                    <h4>Overview</h4>
                    <p>{overView}</p>
                    <section className={classes.GenresFlairs}>
                        {flairGenres && flairGenres.map(genre => (
                            <Flair key={genre.id}>{genre.name}</Flair>
                        ))}
                    </section>
                    <section className={classes.Actions}>
                        <Button 
                        shadow="2px 2px 50px rgba(255, 255, 255, 0.513)"
                        displayTrailer={this.displayTrailer}
                        >Watch Trailer</Button>
                    </section>
                </section>
                
                <section className={classes.Poster}>
                    <div className={classes.Layer}></div>
                    <img src={poster} alt="poster"/>
                </section>
            </main>: <Spinner />
        )


    }
}

export default withRouter(Watchpage)