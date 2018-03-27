import React from "react";
import { 
    Container, 
    Header, 
    Grid, 
    Menu, 
    Icon 
} from "semantic-ui-react";
import {Helmet} from "react-helmet";

import ListingList from "containers/ListingList";
import ListingService from "services/api/listing.js";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.id === this.props.id) {
            // To work around the fact that React-Router can't
            // reload state upon same url reload. Force remount
            
            var key = 1;    
            
            if (nextProps.location.state && nextProps.location.state.key) {
                key = nextProps.location.state.key;
            } 

            this.setState({
                key: key
            });
        }
    }

    render() {
        return (
            <Container style={{ paddingTop: '5em' }} key={this.state.key}>
                <Helmet>
                    <title>Marketplace | The Chicago Maroon</title>
                </Helmet>

                <Grid stackable>
                    <Grid.Row>
                        <ListingList itemsPerRow={3}>
                        </ListingList>
                    </Grid.Row>
                </Grid>
            </Container>
        );

    }
}