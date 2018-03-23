import React from "react";
import { Link, Redirect } from "react-router-dom";

import { Container, Button, Header } from "semantic-ui-react";

import AuthService from "services/api/auth.js";

export default class Logout extends React.Component {
    render() {
        if (AuthService.isAuthenticated) {
            AuthService.logout();

            return null;
        } 
        else {
            return (
                <Redirect to="/"></Redirect>
            );
        }
    }
}