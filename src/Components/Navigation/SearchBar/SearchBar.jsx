import React, {useState} from 'react'
import search from '../../../Assets/Images/search.svg'
import classes from './SearchBar.css'
const SearchBar = () => {
    const [showBar, setShowBar] = useState(false)
    
    const handleShowBar = () => {
        const newVal = !showBar

        setShowBar(prev => prev = newVal)
    }

    return (
        <form className={classes.SearchBar}>
            {showBar && <input placeholder="Search"/>}
            <img 
            src={search} 
            alt="search bar logo"
            onClick={handleShowBar}
            />
        </form>
    )
}

export default SearchBar
