import React from 'react'
import play from '../../../Assets/Images/play-button.svg'
import classes from './Trailer.css'
const Trailer = (props) => {
    return (
        <div className={classes.Trailer}>
            <h3>WATCH THE TRAILER</h3>
            <div className={classes.Frame}>
                <img src={props.thumbnail} alt="thumbnail"/>
                <img src={play} alt="play icon" onClick={props.displayTrailer}/>
            </div>
            
        </div>
    )
}

export default Trailer
