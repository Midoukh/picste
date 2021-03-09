import React from 'react'
import Movie from '../MoviesList/Movie/movie'
import axios from 'axios'
import Spinner from '../../UI/Spinner'
import classes from './Tv.css'
class Tv extends React.Component {
    state = {
        tvs: [],
        page: 1,
        favourite: false
    }
 
    //handle fetch tvs
    //problems with state beign overrided and duplicated

   handleFetchTvs = async (pageN) => {
        
        const TVsURL = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}&language=en-US&page=${pageN}`

        axios.get(TVsURL)
        .then(response => {
            const tvList = response.data.results
            this.setState({ tvs: [...this.state.tvs, ...tvList] })
            console.log(tvList)
        })
        .catch(err => console.log(err))
    }
    componentDidMount() {
        this.handleFetchTvs(this.state.page)
        window.addEventListener('scroll',  this.handleInfiniteScroll)
    }
    

    //infinit scroll
    handleInfiniteScroll = () => {

        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
            let newPage = this.state.page
            newPage++

            this.setState({ page: newPage })

            this.handleFetchTvs(newPage)
            
        }
        
    }
    handleFavouriteTv = (id) => {
        let newVal = !this.state.favourite
        const previousMovies = JSON.parse(localStorage.getItem('favourites'))
        if (previousMovies){
            const updatedFavouriteMovies = [...previousMovies ,{id: id, favourite: newVal, createdAt: new Date(), type: 'tv'}]
 
            localStorage.setItem('favourites',
            JSON.stringify(updatedFavouriteMovies))
            console.log(updatedFavouriteMovies)
        }
        else{
            localStorage.setItem('favourites', JSON.stringify([{id: id, favourite: newVal, createdAt: new Date(), type: 'tv'}]))
        }
      
        this.setState({ favourite: newVal })
    
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
    render(){
        const tvs =  this.state.tvs
        return (
            // <Movie />
            <main className={classes.Tv}>
    
               { tvs? tvs.map(tv => (
                   <Movie key={tv.id}
                        name={tv.original_name || tv.original_title}
                        year={tv.release_date || tv.first_air_date}
                        rating={tv.vote_average}
                        poster={tv.poster_path}
                        handleFavouriteMovie={this.handleFavouriteTv}
                        id={tv.id}
                        love={this.handleCheckIfFavourite(tv.id)}
                        type='tv'
                   />
               )) :<Spinner />}
            </main>
        )

    }
}

export default Tv
