import React from "react";
import { Container, Header, Grid } from "semantic-ui-react";

export const Home = () => (
    <Container style={{ marginTop: '5em' }}>
        <Grid columns={12} stackable>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h1">Welcome!</Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
)