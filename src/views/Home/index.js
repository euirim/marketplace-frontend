import React from "react";
import { Link } from "react-router-dom";
import { 
    Container, 
    Grid
} from "semantic-ui-react";
import {Helmet} from "react-helmet";

import ListingList from "containers/ListingList";
import Masthead from "components/Masthead";
import ListingService from "services/api/listing.js";
import AnalyticsService from "services/api/analytics.js";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this._handleSearch = this._handleSearch.bind(this);
        this._handleCategoryUpdate = this._handleCategoryUpdate.bind(this);

        this.state = {
            category: null,
            query: null
        };
    }

    componentDidMount() {
        // analytics
        AnalyticsService.recordPageVisit();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.id === this.props.id) {
            // To work around the fact that React-Router can't
            // reload state upon same url reload. Force remount
            
            var key = 1;    
            
            if (nextProps.location.state && nextProps.location.state.key) {
                this.setState({category: null}); // fix category refresh bug
                key = nextProps.location.state.key;
            } 

            this.setState({
                key: key
            });
        }
    }

    /* 
    Handle search of a term.
    Doesn't handle getting the term from the actual input though.
    Assumes term is not null.
    */
    _handleSearch(term) {
        console.log(term);
        this.setState({ query: term });
    }

    _handleCategoryUpdate(category_id) {
        let category = category_id;

        if (category_id === 0) {
            category = null;
        } 

        this.setState({ category: category });
    }

    render() {
        return (
            <div key={this.state.key}>
                <Helmet>
                    <title>Marketplace | The Chicago Maroon</title>
                </Helmet>

                <Masthead 
                    onSearch={this._handleSearch}
                    onCategoryUpdate={this._handleCategoryUpdate} />
                    
                <Container >
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <ListingList 
                                    category={this.state.category}
                                    query={this.state.query}
                                    itemsPerRow={3}>
                                </ListingList>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );

    }
}