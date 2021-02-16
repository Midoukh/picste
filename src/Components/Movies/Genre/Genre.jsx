import React, { useState, useEffect } from 'react'
import classes from './Genre.css'
import axios from 'axios'
const Genre = ({ setShowGenre, showGenre }) =>{
    const [genres, setGenres] = useState([])
    const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_PUBLIC_API_KEY}&language=en-US`
    const handleFetchGenres = async() => {
        const response = await axios(genresURL)
        .then(res => {
            setGenres(prev => prev = res.data.genres)
        })
        .catch(err => console.log(err))
       
    }
    
    useEffect(() => {
        handleFetchGenres()
    }, [])
    return (
        <ul className={classes.Genres} >
            {genres.map((genre, i) => {
                return <li key={genre.id+i*10}>{genre.name}</li>
            })}
        </ul>
    )
}

export default Genre
