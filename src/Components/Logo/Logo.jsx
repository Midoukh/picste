import React from 'react'
import logo from '../../Assets/Images/logo.png'
import classes from './Logo.css'
import { useHistory } from 'react-router-dom'
const  Logo = (props) => {
    const history = useHistory()

    return (
        <div className={classes.Logo} onClick={() => history.push('/')}>
            <img src={logo} alt="logo" style={{height: props.height}}/>
            <h3>Picste</h3>
        </div>
    )
}

export default Logo
