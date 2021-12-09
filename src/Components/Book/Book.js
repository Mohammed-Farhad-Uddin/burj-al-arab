
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
import BookingInfo from '../BookingInfo/BookingInfo';

const Book = () => {
  const [loggedInUser,setLoggedInUser]=useContext(UserContext)
  const {bedType}=useParams();

  const [value, setValue] =useState([null,null]);

  const handleBooking=()=>{
    const newLoggedInUser={...loggedInUser,...value}
    fetch('http://localhost:5000/addBooking',{
      method:'POST',
      body:JSON.stringify(newLoggedInUser),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    // .then(res=>res.json())
    // .then(data=>{
    //   console.log(data)
    // })
  }

    return (
      
        <div style={{textAlign:"center"}}>  
          <h1>Hello, {loggedInUser.displayName}! Let's Book a {bedType} Room  </h1>
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
            <Button onClick={handleBooking} variant="contained">Book Now</Button>
        </LocalizationProvider>
                  <BookingInfo></BookingInfo>
      </div>
    );
};

export default Book;         