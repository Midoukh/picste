import React, {useRef, useState} from 'react'
import classes from './Gallery.css'
import right from '../../Assets/Images/right-arrow.svg'
import left from '../../Assets/Images/left-arrow.svg'
import Movie from '../MoviesList/Movie/movie'

const Gallery = ({ movies }) => {
    const galleryRef = useRef()
    const leftArrowRef = useRef()
    const[move, setMove] = useState(10)
   
    //what a gallery need to have
    //items, left and right arrow to move the gallery
    //the ability to drag and scroll
    const handleMoveGallery = (e) => {
        let moveRight = move//-20%
        let moveLeft = moveRight +10//-10%
        


        console.log(e.target.className)
        if (e.target.id === 'right'){
            moveRight += 10
            setMove(prev => prev = moveRight)
           
            galleryRef.current.style.transform = `translateX(-${move}%)`
            console.log('move to left')
            leftArrowRef.current.style.display = 'block'
        }
        if (e.target.id === 'left'){
            
            setMove(prev => prev = moveLeft)
            

            galleryRef.current.style.transform = `translateX(-${move}%)`
            console.log('move to right')
        }

    }
    return (
        <main className={classes.Gallery}>
            <h3>The Best Films</h3>
            <div className={classes.Items} ref={galleryRef}>
                {movies.slice(0, 10).map(mov => (
                    <Movie 
                    key={mov.id}
                    name={mov.original_name || mov.original_title}
                    year={mov.release_date || mov.first_air_date}
                    rating={mov.vote_average}
                    poster={mov.poster_path}
                    />
                ))}
            </div>
            <img 
            src={right} 
            alt="right arrow" 
            className={classes.right}
            onClick={handleMoveGallery}
            id="right"
            />
            <img 
            src={left} 
            alt="right left" 
            className={classes.left}
            onClick={handleMoveGallery}
            ref={leftArrowRef}
            id="left"

            />


        </main>
    )
    



}

export default Gallery