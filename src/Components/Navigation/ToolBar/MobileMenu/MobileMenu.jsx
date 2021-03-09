import React from 'react'
import classes from './MobileMenu.css'
import Favourite from '../../../../Assets/Images/white-heart.svg'
import SearchBar from './SearchBar/SearchBar'
import Signin from './Signin/Button'
import { useHistory } from 'react-router-dom'
const MobileMenu = ({ showMobMenu }) => {
    const history = useHistory()
    return (
        showMobMenu && <div className={showMobMenu? [classes.MobileMenu, classes.show].join(' '): classes.MobileMenu}>
            <img 
            className={classes.Favourite} 
            src={Favourite} 
            alt="Favourite button"
            onClick={history.push('/favourite')}
            />
            <SearchBar />
            <Signin content="Sign in"/>
            
        </div>
    )
}

export default MobileMenu
