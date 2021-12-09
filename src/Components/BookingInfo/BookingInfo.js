import React from 'react';
import {useContext , useState,useEffect} from "react";
import { UserContext } from '../../App';


const BookingInfo = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    const [booking, setBooking] = useState([]);
    useEffect(()=>{
        //ei kane ?email={loggedInUser.email} diye querry patacce server er database e jate jei email login hobe tar info dekabe 
        fetch('http://localhost:5000/bookingInfo?email='+loggedInUser.email,{
            method:"GET",
            headers:{//upore link ta jkn server tekhe call hobe tkn server headers er bitore jinis gula ?email=.... ei sob info send kora hobe req e then oi gula req tekhe pawa jabe.tarpor link er maddome data fetch kore ana hoi.post method charao headers er info gula send kora jai.body te kore kono data patate post kora hoi.
                'Conten-Type':'Application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
           
        })
        .then((res)=>res.json())
        .then(data=>setBooking(data))
    },[])

    return (
        <div>
           <h3>You have booked {booking.length}</h3>
           {
               booking.map((bInfo)=><li>{bInfo.displayName} book room from:{(new Date(bInfo[0]).toDateString("dd/mm/yyyy"))} to:{bInfo[1]}</li>)
           }
        </div>
    );
};

export default BookingInfo;