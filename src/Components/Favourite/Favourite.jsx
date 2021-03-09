import React, { useEffect, useState } from 'react'
import classes from './Favourite.css'
import love from '../../Assets/Images/heart (2).svg'
import moment from 'moment'
import axios from 'axios'
import Movie from '../MoviesList/Movie/movie'
import trash from '../../Assets/Images/rubbish-bin.svg'
import Spinner from '../../UI/Spinner'

class Favourite extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            list: [],
            removed: false
        }
    }

    handleGetStoredMovies = () => {
        const movies = JSON.parse(localStorage.getItem('favourites'))
        console.log(movies)
        if (movies){
            const uniqueMovies = movies.filter(mov => mov.favourite !== false)
            const renderableMovies = Array.from(new Set(uniqueMovies.map(a => a.id)))
            .map(id => {
            return uniqueMovies.find(a => a.id === id)
            })

            const moviesList = renderableMovies.filter(mov => mov.type === 'movie')
            const tvsList = renderableMovies.filter(tv => tv.type === 'tv')

            this.fetchFevouriteMoviesAndTvs([...moviesList, ...tvsList])
            // this.fetchFevouriteTvs(tvsList)

        }
    }
    fetchFevouriteMoviesAndTvs = (list) => {
        //check if there is any movies in the local storage before looping and fetching

        list && list.forEach(item => {
            console.log(item)
            if (item.type === 'movie'){
                const endPoint = `https://api.themoviedb.org/3/movie/${item.id}}?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}&language=en-US`
                const res = axios.get(endPoint)
                .then(data => {
                        if (item.id ===data.data.id){
                            data.data.createdAt = item.createdAt
                            
                        }
                        this.setState({ list: [...this.state.list, data.data] })

                    })
                    .catch(err => console.log(err))

                }
            else if (item.type === 'tv') {
                const endPoint = `https://api.themoviedb.org/3/tv/${item.id}}?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}&language=en-US`
                const res = axios.get(endPoint)
                .then(data => {
                    console.log(data)
                if (item.id ===data.data.id){
                    data.data.createdAt = item.createdAt
                    }
                    this.setState({ list: [...this.state.list, data.data] })

                })
                .catch(err => console.log(err))
                }
                
            })
    }

    // handleDuplicate = (listOfDuplicates) => {
    //     console.log(listOfDuplicates.length)
        
    //     if (listOfDuplicates.length !== 0){
    //         const unique = Array.from(new Set(listOfDuplicates.map(a => a.id)))
    //         .map(id => {
    //         return listOfDuplicates.find(a => a.id === id)
    //         })

    //         this.setState({ uniqueList: unique })
    //         console.log(unique)
    //     }
    // }
    //handle from list
    handleRemoveFromList = (id) => { 
        const list = JSON.parse(localStorage.getItem('favourites'))
        const updatedList = list.filter(item => item.id !== id)
        const removed = !this.state.removed
        localStorage.setItem('favourites', JSON.stringify(updatedList))
        console.log(updatedList)
        this.setState({ removed: removed })

    } 
   
    componentWillMount(){
        this.handleGetStoredMovies()
        
    }
    render(){
    return (
        <main className={classes.Favourite}>
            <header>
                <h1>Your Favourite List</h1>
                <img src={love} alt="love"/>
            </header>
            {this.state.list.length === 0 ? <Spinner /> :
            <section className={classes.List}>
                {this.state.list.map((item, i) => (
                    <div>
                    <Movie 
                    key={item.id + i}
                    name={item.original_name || item.original_title}
                    year={item.release_date || item.first_air_date}
                    rating={item.vote_average}
                    poster={item.poster_path}
                    id={item.id}
                    love="remove"
                    
                    />
                    <div className={classes.Details}>
                        <h4>Added <strong>{moment(item.createdAt).from()}</strong></h4>
                        <img 
                        src={trash}
                        alt="remove"
                        onClick={() => this.handleRemoveFromList(item.id)}
                        />

                    </div>
                    </div>
                ))}
            </section>
            }
        </main>
    )
  }
}

export default Favourite
