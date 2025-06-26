import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {connect} from 'react-redux';

const AuthRoute = ({component: Component, loggedIn, ...rest}) => {
    return (
        <Route
            {...rest}
            element={
                !loggedIn ? (
                    <Component />
                ) : (
                    <Navigate to="/dashboard" replace />
                )
            }
        />
    );
};

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(AuthRoute);