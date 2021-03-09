import React from 'react'
import classes from './Flair.css'
const Flair = (props) =>{
    return (
        <div className={classes.Flair}>
            {props.children}
        </div>
    )
}

export default Flair
