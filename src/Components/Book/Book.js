
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import {useContext,useState} from "react";

import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import Button from '@mui/material/Button';

const Book = () => {
  const [loggedInUser,setLoggedInUser]=useContext(UserContext)
  const {bedType}=useParams();

  const [value, setValue] =useState([null, null]);


    return (
      
        <div style={{textAlign:"center"}}>  
          <h1>Hello, {loggedInUser.name}! Let's Book a {bedType} Room  </h1>
          <p>Want a <Link to="/home" style={{color:"black"}}>different room?</Link> </p>       
        
    
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}> 
              <DesktopDateRangePicker
                startText="Check In"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </Stack>
            <Button variant="contained">Book Now</Button>
        </LocalizationProvider>
     

      </div>
    );
};

export default Book;         