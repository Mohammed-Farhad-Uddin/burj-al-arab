import React from 'react';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup} from "firebase/auth";
import { UserContext } from '../../App';
import {useContext} from "react";
import { useHistory, useLocation } from 'react-router';


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
            const{displayName,email}=result.user;
            setLoggedInUser({
                name:displayName,
                email
            })
            history.replace(from)
            // ...
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
    return (
        <div>
           <button onClick={handleGoogleSignIn}>Google Sign Up</button>
        </div>
    );
};

export default Login;                       