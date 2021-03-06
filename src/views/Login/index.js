import React from "react";
import { Redirect } from "react-router-dom";

import { 
    Button, 
    Header, 
    Icon, 
    Container, 
    Grid,
    Card
} from "semantic-ui-react";
import { Helmet } from "react-helmet";

import AuthService from "services/api/auth.js";
import AnalyticsService from "services/api/analytics.js";
import LoginPanel from "components/LoginPanel";
import CentralPanel from "components/CentralPanel";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            redirectToReferrer: false
        };
    }

    componentDidMount() {
        // Load the FB SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // analytics
        AnalyticsService.recordPageVisit();
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            );
        }

        // referralPath is the dest of redirect after successful login
        return (
            <CentralPanel computer={6} tablet={10} mobile={16}>
                <Helmet>
                    <title>Login</title>
                </Helmet>

                <LoginPanel referralPath={ from.pathname } />
            </CentralPanel>
        );
    }
}
