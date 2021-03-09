import React from 'react'
import classes from './Button.css'
const Button = (props) => {
    return (
        <button 
        className={classes.Button}
        style={{textShadow: props.shadow, boxShadow: props.shadow}}
        onClick={props.displayTrailer}
        >
            {props.children}
        </button>
    )
}

export default Button