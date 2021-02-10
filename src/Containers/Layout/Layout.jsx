import React, {Component, useState, useEffect} from 'react'

import Toolbar from '../../Components/Navigation/ToolBar/Toolbar'
import Presentaion from '../../Components/Presentation/Presentation'
import classes from './Layout.css'
const Layout = (props) => {
   
    const [homeMovie, setHomeMove] = useState({})
    const [longDescription, setLongDescription] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const handleFetchHomeMovie = async () => {
        const latestMovieEndPoint = 'https://api.themoviedb.org/3/movie/popular?api_key='

        const res = await fetch(`${latestMovieEndPoint}${process.env.REACT_APP_PUBLIC_API_KEY}&language=en-US&page=1`)
        .then(data => data.json())
        .then(data => setHomeMove(data))
        homeMovie? console.log(homeMovie): console.log('wait')

      }
   
    useEffect(() => {
        handleFetchHomeMovie()
      }, [])

    const handleDescription = (str) => {
        let shortenedStr;
        if (str){
            if (str.length > 200){
                setLongDescription(previous => previous = true)
                for (let i = 0; i < str.length; i++){
                    shortenedStr += str[i]
                    if (shortenedStr.length >= 200 && str[i] ===' '){
                        break
                    }
                }
                return shortenedStr.replace('undefined', '') + '...' 
             }
             else{
                 return str
             }
        }
    }
    const toggleHideTxt = (e, longStr, shortStr) => {
      const container = e.target.parentElement
      const elements = container.children
      console.log(shortStr)

      const overview = container.firstChild

      console.log(longStr)
      
      if (e.target.id === 'read_more' && e.target.textContent === 'Read more'){
        overview.textContent = longStr
        e.target.textContent = 'Read less'
      }
      else if (e.target.id === 'read_more' && e.target.textContent === 'Read less'){
        overview.textContent = shortStr
        e.target.textContent = 'Read more'
      }
      
    }
    //this function is for displaying the trailer of the movie
    const displayTrailer = () => {
      setShowModal(previous => previous = !previous)

    }
    return (
        <div className={classes.Layout}>
            <Toolbar />
            <Presentaion 
            movies={homeMovie.results} 
            toggleHideTxt={toggleHideTxt} 
            hideText={props.hideText}
            handleDescription={handleDescription}
            longDescription={longDescription}
            showModal={showModal}
            displayTrailer={displayTrailer}
            />
        </div>
    )
}

export default Layout
