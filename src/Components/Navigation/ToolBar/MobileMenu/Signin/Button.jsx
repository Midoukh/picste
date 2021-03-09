import React from 'react'
import classes from './Button.css'
const Button = (props) => {
    return (
        <div className={classes.Signin}> 
            <button>{props.content}</button>
        </div>
    )
}

export default Button
