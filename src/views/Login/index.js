import React from "react";
import { Redirect } from "react-router-dom";

import { Button, Header, Icon, Container, Grid } from "semantic-ui-react";

import AuthService from "services/api/auth.js";

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
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;
        
        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            );
        }

        return (
            <Container style={{ paddingTop: '5em' }}>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h2">Login</Header>
                            <Button onClick={ AuthService.handleClick } color="facebook">
                                <Icon name="facebook" /> Login with Facebook
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}
