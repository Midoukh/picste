import React, {useRef, useState} from 'react'
import classes from './Gallery.css'
import right from '../../Assets/Images/right-arrow.svg'
import left from '../../Assets/Images/left-arrow.svg'
import Movie from '../MoviesList/Movie/movie'

const Gallery = ({ movies, label, handleFavouriteMovie }) => {
    const galleryRef = useRef()
    const leftArrowRef = useRef()
    const[move, setMove] = useState(50)
   
    //what a gallery need to have
    //items, left and right arrow to move the gallery
    //the ability to drag and scroll
    const handleMoveGallery = (e) => {
        
        if (galleryRef.current.scrollLeft !== 0){
            leftArrowRef.current.style.display = 'block'
        }
        else if (galleryRef.current.scrollLeft === 0){
            leftArrowRef.current.style.display = 'none'
        }
        
        if (e.target.id === 'right'){
            galleryRef.current.scrollLeft += move
            // galleryRef.current.style.transform = `translateX(-${move}%)`
        }
        if (e.target.id === 'left'){
            
            // galleryRef.current.style.transform = `translateX(${move}%)`
            galleryRef.current.scrollLeft -= move
        
        }
        console.log(galleryRef.current.scrollLeft)
    }
    return (
        <main className={classes.Gallery}>
            <h3>{label}</h3>
            <div className={classes.Items} ref={galleryRef}>
                <div className={classes.InsideGal}>
                {movies.map(mov => (
                    <Movie 
                    key={mov.id}
                    name={mov.original_name || mov.original_title}
                    year={mov.release_date || mov.first_air_date}
                    rating={mov.vote_average}
                    poster={mov.poster_path}
                    handleFavouriteMovie={handleFavouriteMovie}
                    id={mov.id}
                    />
                ))}

                </div>
             
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