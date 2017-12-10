import React from "react";
import ReactDOM from "react-dom";
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from "semantic-ui-react"

import { ListingCard } from "./components/ListingCard";

ReactDOM.render(
    (
        <div>
            <Menu fixed="top" borderless>
                <Menu.Item as="a" header>
                    <Header as="h2">Marketplace</Header>
                </Menu.Item>
                <Menu.Item as="a" position="right">Login</Menu.Item>
            </Menu>

            <Container style={{ marginTop: '5em' }}>
                <Grid columns={12} stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h1">Welcome.</Header>
                        </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row>
                        <ListingCard></ListingCard>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    ), 
    document.getElementById('app')
);