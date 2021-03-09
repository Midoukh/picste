import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import classes from './Languages.css'
import algeria from '../../../Assets/algeria.png'
import france from '../../../Assets/france.png'
import spain from '../../../Assets/spain.png'
import usa from '../../../Assets/united-states-of-america.png'

const Languages = () =>{
    const languagesListRef = useRef()
    const history = useHistory()
    const [languages, setLanguages] = useState([
        {code: 'ar-AR', name: 'Arabic', flag: algeria},
        {code: 'es-ES', name: 'Spanish', flag: spain},
        {code: 'en-US', name: 'English', flag: usa},
        {code: 'fr-FR', name: 'French', flag: france},

    ])
    
    const handleShowListOfLanguages = () => {
        const show = 'block'
    
        languagesListRef.current.style.display = show

    }
    const handleHideListOfLanguages = () => {
        const hide = 'none'
    
        languagesListRef.current.style.display = hide

    }
    const handleRenderMoviesByLanguages = (e) => {
        const languageQuery = e.target.getAttribute('name');
        const language = e.target.textContent

        history.push({
            pathname: '/language',
            search: '?' + encodeURIComponent(language) + '=' + encodeURIComponent(languageQuery)
        })

    }
    return (
 
        <li 
         onMouseOver={handleShowListOfLanguages}
         className={classes.Languages}>
            <>
            <li className={classes.label}>
                Languages <i style={{ marginLeft: '.5rem' }} className="fa fa-caret-down" aria-hidden="true"></i>
            </li>
            <ul className={classes.listLanguages} ref={languagesListRef} onMouseLeave={handleHideListOfLanguages}>
            {languages.map((lng, i) => {
                return <li 
                        key={lng.code+i*10} 
                        name={lng.code}
                        onClick={handleRenderMoviesByLanguages}
                        >{lng.name}<img src={lng.flag} alt="flag"/></li> 
      
            })}
            </ul>
            </>
        </li>
  
 
    )
}

export default Languages
