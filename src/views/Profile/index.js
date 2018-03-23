import React from "react";
import { Link, Redirect } from "react-router-dom";

import { 
    Grid, 
    Container, 
    Button, 
    Header,
    Icon,
    Sticky,
    Responsive
} from "semantic-ui-react";
import AuthService from "services/api/auth.js";
import ListingService from "services/api/listing.js";

import UserCard from "components/UserCard";
import ListingCardGrid from "components/ListingCardGrid";

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
            <Container style={{ paddingTop: '5em' }}>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={6} mobile={16}>
                            {/* Sticky doesn't work on mobile. */}
                            <Responsive 
                                as={Sticky} 
                                minWidth={Responsive.onlyTablet.minWidth} 
                                offset={90}>
                                <UserCard 
                                    name={this.state.firstName + " " + this.state.lastName} />
                            </Responsive>

                            <Responsive {...Responsive.onlyMobile}>
                                <UserCard 
                                    name={this.state.firstName + " " + this.state.lastName} />
                            </Responsive> 
                        </Grid.Column>

                        <Grid.Column computer={11} tablet={10}>
                            <ListingCardGrid itemsPerRow={2} listings={this.state.listings} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}