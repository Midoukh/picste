import React from 'react'
import play from '../../../Assets/Images/play-button.svg'
import classes from './Trailer.css'
class Trailer extends React.Component {
    shouldComponentUpdate(previousProps, previosState){
        return previousProps.thumbnail !== this.props.thumbnail
    }
    render(){

    return (
        <div className={classes.Trailer}>
            <h3>WATCH THE TRAILER</h3>
            <div className={classes.Frame}>
                <img src={this.props.thumbnail} alt="thumbnail"/>
                <img src={play} alt="play icon" onClick={this.props.displayTrailer}/>
            </div>
            
        </div>
    )
  }
}

export default Trailer
