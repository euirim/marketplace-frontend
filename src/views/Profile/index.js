import React from "react";
import { Link, Redirect } from "react-router-dom";

import { 
    Grid, Container, Button, Header 
} from "semantic-ui-react";
import AuthService from "services/api/auth.js";
import ListingService from "services/api/listing.js";

import ListingCardGrid from "containers/ListingCardGrid";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        var user = AuthService.getUserName();
        console.log(user);

        this.state = {
            firstName: user.firstName,
            lastName: user.lastName,
            listings: []
        };
    }

    componentDidMount() {
        ListingService
            .get_my_listings(3)
            .then(res => {
                this.setState({listings: res});
            });
    }

    render() {
        return (
            <Container style={{ marginTop: '5em' }}>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h1">{ this.state.firstName } { this.state.lastName }</Header>
                            <Header as="h2">Listings</Header>
                            
                            <ListingCardGrid listings={this.state.listings}>
                            </ListingCardGrid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}