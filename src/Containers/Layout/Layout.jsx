import React, {Component, useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Latest from '../../Components/MoviesList/Latest/Latest'
import Tv from '../../Components/TvList/Tv'
import Toolbar from '../../Components/Navigation/ToolBar/Toolbar'
import Presentaion from '../../Components/Presentation/Presentation'
import ByLanguages from '../../Components/ByLanguages/ByLanguages'
import SideBar from '../../Components/SideBar/SideBar'
import classes from './Layout.css'
import MobileMenu from '../../Components/Navigation/ToolBar/MobileMenu/MobileMenu'
import Favourite from '../../Components/Favourite/Favourite'
import Watchpage from './WatchPage/WatchPage'

const Layout = (props) => {
   
    const [longDescription, setLongDescription] = useState(false)
    const [love, setLove] = useState(false)
    const [showMobMenu, setShowMenu] = useState(false)
   
   
    

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

      const overview = container.firstChild

      
      if (e.target.id === 'read_more' && e.target.textContent === 'Read more'){
        overview.textContent = longStr
        e.target.textContent = 'Read less'
      }
      else if (e.target.id === 'read_more' && e.target.textContent === 'Read less'){
        overview.textContent = shortStr
        e.target.textContent = 'Read more'
      }
      
    }
    //mobile menu
    const handleShowMobileMenu = () => {
      const newVal = !showMobMenu

      setShowMenu(prev => prev = newVal)
    }
    return (
        <div className={classes.Layout}>
            <Toolbar 
            handleShowMobileMenu={handleShowMobileMenu}
            showMobMenu={showMobMenu}
            />
            <MobileMenu showMobMenu={showMobMenu}/>
            <SideBar />
            <Switch>
              <Route exact path="/">

                  <Presentaion 
                  toggleHideTxt={toggleHideTxt} 
                  hideText={props.hideText}
                  handleDescription={handleDescription}
                  longDescription={longDescription}
                  love={love}
                  setLove={setLove}
                  />
              </Route>
           
              <Route exact path="/latest">
                <Latest />

              </Route>
              <Route exact path="/tv">
                <Tv />
              </Route>
              <Route path="/language">
                <ByLanguages />
              </Route>
              <Route exact path="/favourite">
                <Favourite />
              </Route>
              <Router path="/watchpage">
                <Watchpage/>
              </Router>
            </Switch>
        </div>
    )
}

export default Layout
