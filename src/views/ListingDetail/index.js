import React from "react";

import ListingService from "services/api/listing.js";

import { Container, Header, Grid } from "semantic-ui-react";


export default class ListingDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listing: null
        };
    }

    componentDidMount() {
        ListingService
            .get(this.props.match.params.id)
            .then(res => {
                this.setState({ listing: res });
            });
    }

    render() {
        var content;

        if (this.state.listing) {
            content = (
                <Container style={{ marginTop: '5em' }}>
                    <Header as="h1">{ this.state.listing.name }</Header>
                    <p>{ this.state.listing.about }</p>
                </Container>
            );
        }
        else {
            content = (
                 <Container style={{ marginTop: '5em' }}>
                    <Header as="h2">Loading...</Header>
                </Container>
            );
        }

        return content;
    }
}