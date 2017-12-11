import React from "react";
import { Container, Header, Grid } from "semantic-ui-react";

import ListingCardGrid from "containers/ListingCardGrid";

export const Home = () => (
    <Container style={{ marginTop: '5em' }}>
        <Grid stackable>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h2">Homes</Header>
                </Grid.Column>
            </Grid.Row>

            <ListingCardGrid></ListingCardGrid>

            <Grid.Row>
                <Grid.Column>
                    <Header as="h2">Appliances</Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Header as="h2">Services</Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
)