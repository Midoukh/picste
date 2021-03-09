import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = (props) => {
    return (
       
        <ul 
        className={classes.NavigationItems}
        >
            <NavigationItem show={props.show}/>
        </ul>
       
    )
}

export default NavigationItems
