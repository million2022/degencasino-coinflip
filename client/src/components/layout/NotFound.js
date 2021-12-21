import React from 'react';
import { Stack } from "@mui/material"

const NotFound = () => {
  return (
    <Stack
      className="container"
      justifyContent="center"
      alignItems="center"
    >
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='large' style={{color: 'white'}}>Sorry, this page does not exist</p>
    </Stack>
  );
};

export default NotFound;
