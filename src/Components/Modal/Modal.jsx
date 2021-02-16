import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.css'
import exit from '../../Assets/Images/cancel.svg'
import loading from '../../Assets/Images/loading.svg'
class Modal extends React.Component{
    shouldComponentUpdate(previousProps, previosState){
        return previousProps.trailerURL !== this.props.trailerURL
    }
    render(){
        console.log(this.props.trailerURL)
        let trailer =  (
            <div className={classes.Sorry}>
                <p>Sorry Trailer is not available :(</p>
            </div>
                      )

        if (this.props.trailerURL){
            trailer = <iframe src={this.props.trailerURL} frameBorder="0"></iframe>
        }

        let loadingTrailer = (
           <img className={classes.Spinner} src={loading}/>
        )
        return(
            <div className={classes.Modal}>
            <img src={exit} alt="exit modal" onClick={this.props.displayTrailer}/>
            {trailer}
            <Backdrop displayTrailer={this.props.displayTrailer}/>
            </div>
        )
    }

}

export default Modal