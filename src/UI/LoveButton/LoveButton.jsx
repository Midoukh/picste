import React, {useState, useRef} from 'react'
import classes from './LoveButton.css'
import emptyHeart from '../../Assets/Images/empty-heart.svg'
import filledHeart from '../../Assets/Images/filled-heart.svg'

const LoveButton = ({ setLove, love, id }) => {
    const[added, setAdded] = useState(false)
   
    let isLoved = emptyHeart
    let addedMessage = <span>Added to Favourites!</span>
        
    if (love === true){
        isLoved = filledHeart 
    }
    else if (love === false){
        isLoved = emptyHeart 
    }
   
    return (
    <div className={classes.Heart}>
        {added? <span className={classes.added}>Added to Favourites!</span>: null}
       {love === true || love === false?<img
       onClick={() =>{
            setLove(id)
            setAdded(prev => prev = !prev)
       }} 
       src={isLoved} 
       alt="love" 
       height="30px" 
       title="Add to favourite!"/>:null}
    </div>
    )
}

export default LoveButton
