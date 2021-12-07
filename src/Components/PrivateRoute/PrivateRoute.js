// import { Route } from '@mui/icons-material';
import React, { useContext } from 'react';
import { Route,Redirect } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    return (                    
            <Route
            {...rest}
            render={({ location }) =>
            loggedInUser.email? (
                children
            ) : (
                <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
                />
            )
          }
        />
    );
};

export default PrivateRoute;                    