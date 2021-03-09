import React, { useState } from 'react'
import classes from './movie.css'
import Rating from '../../Rating/Rating'
import LoveButton from '../../../UI/LoveButton/LoveButton'
import { useHistory } from 'react-router-dom'
const Movie = ({ name, year, rating, poster, handleFavouriteMovie, id, love, type }) => {
    const[showDetails, setShowDetails] = useState(false)
    const history = useHistory()
    const posterURL = 'https://image.tmdb.org/t/p/w500/'
  
    const handleHoverMovie = (e) => {
        setShowDetails(prev => prev = true)
 
    }
    const handleLeaveMovie = (e) => {
        setShowDetails(prev => prev = false)
    }
    const handleGoToWatchPage = () => {
        const query = []

        const content = {
            itemName: name,
            itemId: id,
            itemType: type
        }

        for (let i in content){
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(content[i]))
        }

        history.push({
            pathname: '/watchpage',
            search: `?${query.join('&')}`
        })

    }
    
    return (
        <main className={classes.Container} onClick={handleGoToWatchPage}>
            <div className={classes.Movie} 
                style={{backgroundImage: `url(${posterURL}${poster})`}}
                onMouseEnter={handleHoverMovie}
                >
                
                </div >
                {showDetails && <div className={[classes.Details, classes.show].join(' ')} 
                onMouseLeave={handleLeaveMovie}>
                <h3>{name} (<strong>{year && year.slice(0, 4)}</strong>)</h3>
                <LoveButton 
                setLove={handleFavouriteMovie} 
                love={love} 
                id={id}
                />
                <Rating ratingAvg={rating} height="10%"/>
            </div>}
        </main>
    )
}

export default Movie
