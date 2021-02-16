import React from 'react'
import Movie from '../MoviesList/Movie/movie'
import axios from 'axios'
import classes from './Anime.css'
class Anime extends React.Component {
    state = {
        animes: []
    }
    handleFetchAnimes = () => {
        const animeEndPoint = 'https://kitsu.io/api/edge/trending/anime'
        axios.get(animeEndPoint)
        .then(res => {
            const data = res.data.data
            console.log(data)
            this.setState({ animes: [...this.state.animes, ...data] })
        })
        .catch(error => console.log(error))
        
    }
    componentDidMount(){
        this.handleFetchAnimes()
    }
    render(){
        const animes = this.state.animes
        return (
            <div className={classes.Anime}>
               { animes && animes.map((anime, i) => (
                   
                   <Movie key={i + anime.attributes.startDate}
                   name={anime.attributes.abbreviatedTitles[0]}
                   year={anime.attributes.startDate}
                   rating={anime.attributes}
                   poster={anime.attributes.posterImage.original}
                   
                  />
               ))}
            </div>
    )
  }
}

export default Anime
