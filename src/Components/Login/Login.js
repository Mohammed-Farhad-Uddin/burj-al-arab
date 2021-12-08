import React from 'react';
import './Login.css'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup} from "firebase/auth";
import { UserContext } from '../../App';
import {useContext} from "react";
import { useHistory, useLocation } from 'react-router';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const app = initializeApp(firebaseConfig);
    const[loggedInUser,setLoggedInUser]=useContext(UserContext)
    
    const history = useHistory()
    const location=useLocation()
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn=()=>{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            // const user = result.user;
            // console.log(user)

            const{displayName,email,phoneNumber}=result.user;
            setLoggedInUser({
                displayName,
                email,
                phoneNumber
            })
            history.replace(from)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    
    const handleInputBlur=(e)=>{
            // console.log(e.target.name,e.target.value)
           let isInputValid=true;

        /////// Email password name Validation////
        if(e.target.name==="email"){
            const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // const isEmailValid=regularExpression.test(String(e.target.value).toLowerCase());
            // console.log(isEmailValid)

            isInputValid=regularExpression.test(String(e.target.value).toLowerCase());
        }
        if(e.target.name==="password"){
            // const checkLength=e.target.value.length>5
            // const passwordHasNum=/\d{1}/.test(e.target.value);
            // const isPasswordValid=checkLength && passwordHasNum
            // const isPasswordValid=e.target.value.length>5 && /\d{1}/.test(e.target.value)
            // console.log(isPasswordValid)

            isInputValid=e.target.value.length>5 && /\d{1}/.test(e.target.value)
        }

        if(isInputValid){
            // console.log(loggedInUser)
            let newLoggedInUser={...loggedInUser}
            newLoggedInUser[e.target.name]=e.target.value;
            setLoggedInUser(newLoggedInUser)
            // console.log(loggedInUser)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // console.log("submit Clicked")
        if(loggedInUser.email && loggedInUser.password ){
            //jodi form e email and password valid dewa hoi tahole submit a jabe  

            const auth = getAuth();
            createUserWithEmailAndPassword(auth, loggedInUser.email, loggedInUser.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user)
                history.replace(from)

            })
            .catch((error) => {
                // const newLoggedInUser={...loggedInUser};
                // newLoggedInUser.errorMessage=error.message;
                // setLoggedInUser(newLoggedInUser)
                if(error){//jodi email and pass create kora takhe tahole error asbe.And error asha jodi true hoi tahole sign in niye jabe.ei ta nije tekhe buje korci
                    const auth = getAuth();
                    signInWithEmailAndPassword(auth, loggedInUser.email, loggedInUser.password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        history.replace(from)
                    })
                    .catch((error) => {
                        const newLoggedInUser={...loggedInUser};
                        newLoggedInUser.errorMessage=error.message;
                        setLoggedInUser(newLoggedInUser)
                    });
                }
            });
        }
        
    }
    return (
        <div>
            <div style={{textAlign:"center"}}>
                <h1 style={{color:"#0000FF"}}>SIGN UP</h1>
                <AccountCircleIcon variant="contained" fontSize="large" color="primary"></AccountCircleIcon>
            </div>
            <div style={{textAlign:"center"}}>
                <form onSubmit={handleSubmit}>
                    <input onBlur={handleInputBlur} name="displayName" type="text" placeholder="FullName" required/>
                    <br/>
                    <input onBlur={handleInputBlur} name="email" type="email" placeholder="Example@email.com" required/>
                    <br/>
                    <input onBlur={handleInputBlur} name="phoneNumber" type="number" placeholder="Phone Number" />
                    <br/>
                    <input onBlur={handleInputBlur} name="password" type="password" placeholder="Password" required/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <p style={{color:"red"}}>{loggedInUser.errorMessage}</p>
            </div>
            <Link to="/"><p style={{textAlign:"center",color:"black"}}>Already have an account?</p> </Link>
           
           <div className="row" style={{textAlign:"center",margin:"10px 0px"}}>
             <Button  color="primary" variant="contained" onClick={handleGoogleSignIn}>Google Sign Up</Button>
           </div>
        </div>
    );
};

export default Login;                       