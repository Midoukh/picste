import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const LoadingProgress = (props) =>{
    return (
        <Box position="relative" display="inline-flex">
          <CircularProgress variant="determinate" {...props} size={80}/>
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Typography variant="h5" component="div" color="#FFF">{`${Math.round(
              props.value,
            )}%`}</Typography>
          </Box>
        </Box>
      );
    
}

export default LoadingProgress
