import React, { useState, useRef } from 'react'
import Genre from '../../../Movies/Genre/Genre'
import Languages from '../../../Movies/Languages/Languages'
import classes from './NavigationItem.css'
import { Link, useHistory } from 'react-router-dom'

const NavigationItem = ({ show }) => {
    const [showGenre, setShowGenre] = useState(false)
    const history = useHistory()
    const menuRef = useRef()
    
    const handleShowGenreLists = () =>{
        setShowGenre(prev => prev = !prev)
        console.log('show genre')
    }
    const handleHideGenreLists = () => {
        setShowGenre(prev => prev = !prev)

    }
    const handleShowLatestMovies = () => {
        history.push('/latest')
    }
    const handleShowTVShows = () => {
        history.push('/tv')
    }
    
    const items = [
       
        {name: 'Populaire', func: handleShowLatestMovies},
        {name: 'TV', func: handleShowTVShows}
    ]

    //hide in toolbar when width is 629px or less
    //show in sidebar when with is 629px or less

  
    return (
        <ul className={classes.NavigationItem}>
            <Genre />
            {items.map((item, i) => (
                <li key={item.name+i} onClick={item.func}>{item.name}</li>  
            ))}
            <Languages />
        </ul>
    )

    }


export default NavigationItem
