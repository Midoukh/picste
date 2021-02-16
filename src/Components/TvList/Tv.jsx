import React from 'react'
import Movie from '../MoviesList/Movie/movie'
import axios from 'axios'
import Spinner from '../../UI/Spinner'
import classes from './Tv.css'
class Tv extends React.Component {
    state = {
        tvs: [],
        page: 1
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
                   />
               )) :<Spinner />}
            </main>
        )

    }
}

export default Tv
