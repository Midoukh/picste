import React from 'react'
import banner from '../../Assets/Images/banner.jpg'
import classes from './Banner.css'
const Banner = () => {
    return(
        <section className={classes.Banner}>
            <div className={classes.Layer}>
                <button>Sign Up</button>
            </div>
            <img src={banner} alt="banner"/>
            
        </section>
    )

}

export default Banner