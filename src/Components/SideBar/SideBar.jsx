import React, {useState} from 'react'
import classes from './SideBar.css'
import SideMenu from './SideMenu/SideMenu'
import BackDrop from '../Backdrop/Backdrop'
import NavigationItemMob from './NavigationItemMob/NavigationItemMob'
const SideBar = () => {
    const [showbar, setShowbar] = useState(false)
    const integratedClasses = [classes.SideBar]
    const handleOpenShowSideBar = () => {
        console.log('side bar')
        const newVal = true

        setShowbar(prev => prev = newVal)
    }
    const handleCloseShowSideBar = () => {
        console.log('side bar')
        const newVal = false

        setShowbar(prev => prev = newVal)
    }

    return (
        <>
        <aside 
        className={showbar?[classes.SideBar, classes.show].join(' '): classes.SideBar}
        onMouseLeave={handleCloseShowSideBar}
        >
            <NavigationItemMob />
        </aside>
        <SideMenu 
        handleOpenShowSideBar={handleOpenShowSideBar}
        showbar={showbar}
        />
        {showbar && <BackDrop />}
        </>
    )
}

export default SideBar
