import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.css'
import exit from '../../Assets/Images/cancel.svg'
import loading from '../../Assets/Images/loading.svg'
class Modal extends React.Component{

    render(){
        let loadingTrailer = (
           <img className={classes.Spinner} src={loading}/>
        )
        return(
            <div className={classes.Modal}>
            <img src={exit} alt="exit modal" onClick={this.props.displayTrailer}/>
            <iframe src={this.props.trailerURL} frameborder="0"></iframe>
            <Backdrop displayTrailer={this.props.displayTrailer}/>
            </div>
        )
    }

}

export default Modal