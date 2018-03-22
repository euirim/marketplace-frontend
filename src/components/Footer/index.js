import React from "react";

import { 
    Header,
    Button,
    Icon,
    Container,
    Grid,
    List
} from "semantic-ui-react";


export default class Footer extends React.Component {
    render() {
        return (
            <Container id="footer">
                <Grid.Row>
                    <Grid.Column width={16} textAlign="center">
                        <List horizontal link>
                            <List.Item as="a">About Marketplace</List.Item>
                            <List.Item as="a">Advertise</List.Item>
                            <List.Item as="a">Policies</List.Item>
                            <List.Item as="a">Contact</List.Item>
                            <List.Item as="a" href="https://www.chicagomaroon.com">The Maroon</List.Item>
                            <List.Item>&#169; 2018 The Chicago Maroon</List.Item>
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Container>
        );
    }
};