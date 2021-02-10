import React from 'react'
import classes from './Backdrop.css'
const Backdrop = (props) =>{
    const imageBoiler = 'https://image.tmdb.org/t/p/w500/'

    return (
        <div className={classes.Backdrop} onClick={props.displayTrailer}>
            
        </div>
    )
}

export default Backdrop
