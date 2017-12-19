import React from "react";
import { Container, Header, Grid } from "semantic-ui-react";

import ListingCardGrid from "containers/ListingCardGrid";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            homes_listings: [],
        };
    }

    componentDidMount() {
        var homes_listings = ListingService.get_most_recent(3);

        this.setState({homes_listings: homes_listings});
    }

    render() {
        return (
            <Container style={{ marginTop: '5em' }}>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h2">Homes</Header>
                        </Grid.Column>
                    </Grid.Row>

                    <ListingCardGrid listings={this.state.homes_listings}>
                    </ListingCardGrid>

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
        );

    }
}