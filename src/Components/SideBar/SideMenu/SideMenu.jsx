import React from 'react'
import classes from './SideMenu.css'
const SideMenu = ({ handleOpenShowSideBar, showbar }) => {
    return (
        <div 
        className={showbar? [classes.SideMenu, classes.fadeout].join(' '): classes.SideMenu}
        onMouseOver={handleOpenShowSideBar}
        >
            <div></div>
            <div></div>            
        </div>
    )
}

export default SideMenu
