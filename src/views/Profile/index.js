import React from "react";
import { Link, Redirect } from "react-router-dom";

import { 
    Grid, 
    Container, 
    Button, 
    Header,
    Icon,
    Sticky,
    Responsive,
    Message
} from "semantic-ui-react";
import { Helmet } from "react-helmet";

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
        /* Message when listing is listed (upon redirect) */
        var addedListing;
        var addedListingMsg;

        if (this.props.location.state) {
            addedListing = this.props.location.state.addedListing;
        }

        if (addedListing) {
            addedListingMsg = (
                <Message success icon>
                    <Icon name="check circle outline" />
                    <Message.Content>
                        <Message.Header>Listing posted</Message.Header>
                        Check out your new listing below.
                    </Message.Content>
                </Message>
            );
        }


        return (
            <Container style={{ paddingTop: '5em' }}>
                <Helmet>
                    <title>{ this.state.firstName } { this.state.lastName }</title>
                </Helmet>

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
                            { addedListingMsg }
                            <ListingCardGrid 
                                itemsPerRow={2} 
                                listings={this.state.listings}
                                deleteButton
                                hasInnerLinks />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}