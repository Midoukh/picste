import React from 'react'
import search from '../../../Assets/Images/search.svg'
import classes from './SearchBar.css'
const SearchBar = () => {
    return (
        <form className={classes.SearchBar}>
            <input placeholder="Search"/>
            <img src={search} alt="search bar logo"/>
        </form>
    )
}

export default SearchBar
