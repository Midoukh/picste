import React, { useState, useEffect, useRef } from 'react'
import classes from './Genre.css'
import axios from 'axios'
import Dropdown from 'rc-dropdown'
const Genre = ({ setShowGenre, showGenre }) =>{
    const genresListRef = useRef()
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
    const handleShowListOfGenres = () => {
        const show = 'block'
    
        genresListRef.current.style.display = show

    }
    const handleHideListOfGenres = () => {
        const hide = 'none'
    
        genresListRef.current.style.display = hide

    }
    return (
 
        <li 
         onMouseOver={handleShowListOfGenres}
         className={classes.Genres}>
            <>
            <li className={classes.label}>
                Genres <i style={{ marginLeft: '.5rem' }} className="fa fa-caret-down" aria-hidden="true"></i>
            </li>
            <ul className={classes.listGenre} ref={genresListRef} onMouseLeave={handleHideListOfGenres}>
            {genres.map((genre, i) => {
                return <li key={genre.id+i*10}>{genre.name}</li> 
      
            })}
            </ul>
            </>
        </li>
  
 
    )
}

export default Genre
