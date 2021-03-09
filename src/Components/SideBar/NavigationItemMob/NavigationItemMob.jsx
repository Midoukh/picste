import React, { useState, useRef } from 'react'
import Genre from '../../Movies/Genre/Genre'
import classes from './NavigationItemMob.css'
import { Link, useHistory } from 'react-router-dom'

const NavigationItemMob = ({ show }) => {
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
        {name: 'Genre', func: handleShowGenreLists},
        {name: 'Populaire', func: handleShowLatestMovies},
        {name: 'TV', func: handleShowTVShows},
        {name: 'Anime',func: true}
    ]

    //hide in toolbar when width is 629px or less
    //show in sidebar when with is 629px or less

  
    return (
        <ul className={classes.Menu}>
            {items.map((item, i) => (
                <ul className={classes.NavigationItem}
                key={item.name+i}
                onClick={item.func}
                >
                    <li>{item.name}</li>
                    {showGenre && item.name === 'Genre'? <Genre setShowGenre={setShowGenre}/>: null}                       
                </ul>
            ))}
            
            
        </ul>
    )

    }


export default NavigationItemMob
