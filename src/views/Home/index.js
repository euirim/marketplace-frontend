import React from "react";
import { Container, Header, Grid, Menu } from "semantic-ui-react";

import ListingCardGrid from "containers/ListingCardGrid";
import ListingService from "services/api/listing.js";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homes_listings: [],
        };
    }

    componentDidMount() {
        ListingService.get_most_recent(3)
            .then(res => {
                console.log(res);
                this.setState({homes_listings: res});
            });
    }

    render() {
        return (
            <Container style={{ paddingTop: '5em' }}>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Menu text>
                                <Menu.Item header>ALL</Menu.Item>
                                <Menu.Item name="For Sale">FOR SALE</Menu.Item>
                                <Menu.Item name="Jobs">JOBS</Menu.Item>
                                <Menu.Item name="Services">SERVICES</Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>

                    <ListingCardGrid listings={this.state.homes_listings}>
                    </ListingCardGrid>
                </Grid>
            </Container>
        );

    }
}