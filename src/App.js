import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Book from './Components/Book/Book';
import {createContext , useState} from "react";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const UserContext=createContext()

function App() {
  const [loggedInUser,setLoggedInUser]=useState({})

  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <p>Name:{loggedInUser.name}</p>
      <Router>
        <Header></Header>
          <Switch>
            <Route exact path='/'>
              <Home></Home>   
            </Route>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <PrivateRoute path='/book/:bedType'>
              <Book></Book>
            </PrivateRoute>
            <Route path='/login'>
              <Login></Login>
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
