// Loader.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      position="fixed" 
      top={0} 
      left={0} 
      width="100%" 
      height="100%" 
      bgcolor="rgba(0, 0, 0, 0.5);" 
      zIndex={2000}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
