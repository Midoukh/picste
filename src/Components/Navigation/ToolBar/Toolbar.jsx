import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import SearchBar from '../SearchBar/SearchBar'
import Button from '../Signin/Button'

const Toolbar = (props)  => {
    return (
        <div className={classes.Toolbar}>
            <Logo height="45px"/>
            <NavigationItems />
            <SearchBar />
            <Button content="Sign in"/>
        </div>
    )
}

export default Toolbar
