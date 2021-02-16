import React, { useState } from 'react'
import Genre from '../../../Movies/Genre/Genre'
import classes from './NavigationItem.css'
import { Link, useHistory } from 'react-router-dom'
const NavigationItem = (props) => {
    const [showGenre, setShowGenre] = useState(false)
    const history = useHistory()
  

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
    

  
    return (
        <>
            {items.map((item, i) => (
                <ul className={classes.NavigationItem} key={item.name+i} onClick={item.func}>
                    <li>{item.name}</li>
                    {showGenre && item.name === 'Genre'? <Genre setShowGenre={setShowGenre}/>: null}                       
                </ul>
            ))}
            
        </>
    )

    }


export default NavigationItem
