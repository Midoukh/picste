import React from 'react'
import classes from './Latest.css'
import axios from 'axios'
import Movie from '../Movie/movie'
class Latest extends React.Component{
    //fetch the latest movies
    state = {
        movies : [],
        pageNum: 1
    }
    handleFetchMovies = async(pageN) => {
        const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}&language=en-US&page=${pageN}`
        
        axios.get(popularURL)
        .then(response => {
            const newMovies = response.data.results
            this.setState({ movies: [...this.state.movies, ...newMovies]})
           
            console.log(this.state.movies)
            // use/access the results 
          })
          .catch(errors => {
            // react on errors.
            console.log(errors)
          })
      

        }
        componentDidMount(){
            this.handleFetchMovies(this.state.pageNum)
            window.addEventListener('scroll',  this.handleInfiniteScroll)
            
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

        render(){
        return(
            this.state.movies && <main className={classes.Latest}>
              {this.state.movies && this.state.movies.map(movie => (
                    <Movie key={movie.id}
                    name={movie.original_name || movie.original_title}
                    year={movie.release_date || movie.first_air_date}
                    rating={movie.vote_average}
                    poster={movie.poster_path}
                    />
                ))}
            </main>
        )
    }
}

export default Latest
