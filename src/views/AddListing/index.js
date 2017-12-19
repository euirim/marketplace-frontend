import React from "react";

import { Container, Header, Grid } from "semantic-ui-react";

export default class AddListing extends React.Component {
    render() {
        return (
            <Container style={{ marginTop: '5em' }}>
                <Header as="h1">Add Listing</Header>
            </Container>
        );
    }
}