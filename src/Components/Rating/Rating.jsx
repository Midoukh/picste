import React, {useEffect, useRef} from 'react'
import imbd from '../../Assets/Images/imdb.png'
import classes from './Rating.css'
const Rating = (props) =>{
    const innerStartRef = useRef()
    const handleRatingStar = (rating) => {
        //get percentage value from the rating
        const START_TOTAL = 5
        const START_PERCENTAGE = ((rating/2)/START_TOTAL)*100
        //round
        const startRounded = `${Math.round(START_PERCENTAGE/10)*10}%`
        //set width of inner start to percentage
        innerStartRef.current.style.width = startRounded
        console.log(innerStartRef.current)
    }
    useEffect(() => {
        handleRatingStar(props.ratingAvg)
    }, [])
    return (
        <div className={classes.Rating}>
            <img src={imbd} style={{height: props.height}}/>
            <div className={classes.StartOuter}>
                <div className={classes.StartInner} ref={innerStartRef}></div>
            </div>
            <h4>{props.year}</h4>
        </div>
    )
}

export default Rating
