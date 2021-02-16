import React, { useState } from 'react'
import classes from './movie.css'
import Rating from '../../Rating/Rating'
const Movie = ({ name, year, rating, poster }) => {
    const[showDetails, setShowDetails] = useState(false)
    const posterURL = 'https://image.tmdb.org/t/p/w500/'
  
    const handleHoverMovie = (e) => {
        setShowDetails(prev => prev = true)
 
    }
    const handleLeaveMovie = (e) => {
        setShowDetails(prev => prev = false)
    }
    
    
    
    
    return (
        <main className={classes.Container}>
            <div className={classes.Movie} 
                style={{backgroundImage: `url(${posterURL}${poster})`}}
                onMouseEnter={handleHoverMovie}
                >
                
                </div >
                {showDetails && <div className={[classes.Details, classes.show].join(' ')} 
                onMouseLeave={handleLeaveMovie}>
                <h3>{name} (<strong>{year && year.slice(0, 4)}</strong>)</h3>
                <Rating ratingAvg={rating} height="10%"/>
            </div>}
        </main>
    )
}

export default Movie
