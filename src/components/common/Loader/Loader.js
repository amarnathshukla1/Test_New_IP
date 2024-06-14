import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
   <>
    <Box 
     display="flex" justifyContent="center" alignItems="center" 
     position="absolute" top={0} left={0} width="100%" height="100%" 
    //  bgcolor="rgba(255, 255, 255, 0.1)" zIndex={1000}>
    //  bgcolor="rgba(99, 35, 64, 0.5)" 
        bgcolor="rgb(211, 211, 211)"
        zIndex={1000}
    >
      <CircularProgress />
    </Box>
   </>
  )
}

export default Loader