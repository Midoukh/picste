import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import SearchBar from '../SearchBar/SearchBar'
import Button from '../Signin/Button'
import Favourite from '../../../Assets/Images/white-heart.svg'
import mobile from '../../../Assets/Images/menu (1).svg'
const Toolbar = ({ handleShowMobileMenu, showMobMenu })  => {
    const history = useHistory()
   
    return (
        <div className={classes.Toolbar}>
            <Logo height="45px"/>
            <NavigationItems show={false}/>
            <SearchBar />
            <img 
            className={classes.Favourite}
            src={Favourite}
            onClick={() => history.push('/favourite')}
            />         
            <img 
            className={classes.Mobile} 
            src={mobile} alt="Mobile menu"
            onClick={handleShowMobileMenu}
            />
            <Button content="Sign in"/>
        </div>
    )
}

export default Toolbar
