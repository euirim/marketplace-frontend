import React from "react";
import { 
    Container, 
    Header, 
    Grid, 
    Menu, 
    Icon 
} from "semantic-ui-react";

import ListingList from "containers/ListingList";
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
                        <ListingList 
                            itemsPerRow={3} 
                            listings={this.state.homes_listings}>
                        </ListingList>
                    </Grid.Row>
                </Grid>
            </Container>
        );

    }
}