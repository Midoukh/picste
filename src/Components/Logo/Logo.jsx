import React from 'react'
import logo from '../../Assets/Images/logo.png'
import classes from './Logo.css'
const  Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={logo} alt="logo" style={{height: props.height}}/>
            <h3>Picste</h3>
        </div>
    )
}

export default Logo
