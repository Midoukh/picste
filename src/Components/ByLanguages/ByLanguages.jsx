import React from 'react'
import Movie from '../MoviesList/Movie/movie'
import axios from 'axios'
import classes from './ByLanguages.css'
import { withRouter } from 'react-router-dom'
import Spinner from '../../UI/Spinner'

class ByLanguages extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            languageQuery: ''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const rerender = prevProps.location.search !== this.props.location.search
        if(rerender){
            this.setState({ list: [] })
            this.handleFetchMovies()
        }
        return rerender
    }
  
    handleFetchMovies = (pageN) => {
        const query = new URLSearchParams(this.props.location.search)
        this.setState({ languageQuery: this.props.location.search })
        let language = ''
        for (let c of query.entries()){
            language = c[1]
        }
        const moviesByCountries = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}&language=${language}&page=${pageN}`
       
        axios.get(moviesByCountries)
        .then(res => {
            console.log(res)
            const newMovies = res.data.results
            this.setState({ list: [...this.state.list, ...newMovies]})
            // const data = res.data.data
            // console.log(data)
            // this.setState({ animes: [...this.state.animes, ...data] })
        })
        .catch(error => console.log(error))
        
    }
      //infinite scroll
      handleInfiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
            let newPage = this.state.pageNum
            newPage++

            this.setState({ pageNum: newPage })

            this.handleFetchMovies(newPage)
            console.log('the bottom')
        }
        
    }
    componentDidMount(){
        this.handleFetchMovies()
        window.addEventListener('scroll',  this.handleInfiniteScroll)

    }
    render(){
     

        const movies = this.state.list && this.state.list
        return (
            movies?
            <div className={classes.Anime}>
               { movies.map((movie, i) => (
                   
                   <Movie key={movie.id}
                    name={movie.original_name || movie.original_title}
                    year={movie.release_date || movie.first_air_date}
                    rating={movie.vote_average}
                    poster={movie.poster_path}
                    id={movie.id}
                    type='movie'
                    />
               ))}
            </div>: <Spinner />
    )
  }
}

export default withRouter(ByLanguages)
