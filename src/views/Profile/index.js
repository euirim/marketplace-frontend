import React from "react";
import { Link, Redirect } from "react-router-dom";

import { 
    Grid, Container, Button, Header 
} from "semantic-ui-react";
import AuthService from "services/api/auth.js";


export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        var user = AuthService.getUserName();
        console.log(user);

        this.state = {
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
    render() {
        return (
            <Container style={{ marginTop: '5em' }}>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h1">{ this.state.firstName } { this.state.lastName }</Header>
                            <Header as="h2">Listings</Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}