import React from 'react'
import imbd from '../../../Assets/Images/imdb.png'
import classes from './Rating.css'
const Rating = (props) =>{
    return (
        <div className={classes.Rating}>
            <div className={classes.RatingAvg}>
                <img src={imbd} style={{height: props.height}}/>
                <h5>{props.ratingAvg}</h5>
            </div>
            <h4>{props.year}</h4>
        </div>
    )
}

export default Rating
