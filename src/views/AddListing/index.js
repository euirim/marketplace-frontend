import React from "react";

import { Container, Header, Grid } from "semantic-ui-react";

import AddListingForm from "components/AddListingForm";


export default class AddListing extends React.Component {
    render() {
        return (
            <Container style={{ paddingTop: '5em' }}>
                <Header as="h1">Add Listing</Header>
                <AddListingForm />
            </Container>
        );
    }
}