import React from "react";

import { Grid } from "semantic-ui-react";
import queryString from "query-string";

import ListingCardGrid from "components/ListingCardGrid";
import ListingFilterNav from "components/ListingFilterNav";
import PaginationMenu from "components/PaginationMenu";

import CategoryService from "services/api/category.js";
import ListingService from "services/api/listing.js";
import PromotionService from "services/api/promotion.js";

const init_state = () => {
    return ({
        listings: [],
        promotions: [],
        loadListings: false,
        totalPages: null,
        params: {
            page_size: 18,
            num_promotions: 0,
            category: null,
            page: 1,
            search: null
        }
    });
};

export default class ListingList extends React.Component {
    constructor(props) {
        super(props);

        this._handlePageChange = this._handlePageChange.bind(this);
        this._updateListings = this._updateListings.bind(this);
        this._refresh = this._refresh.bind(this);
    
        this.state = init_state();
    }

    componentDidMount() {
        var params = this.state.params;
        params.category = this.props.category;
        params.query = this.props.query;

        this.setState({
            params: params            
        });

        this._updateListings();
    }

    componentWillReceiveProps(nextProps) {
        var updated = false;
        var newParams = this.state.params;

        if (this.props.category != nextProps.category) {
            updated = true;
            newParams.category = nextProps.category;
       }
        
        if (this.props.query != nextProps.query) {
            updated = true;
            newParams.search = nextProps.query;
        }

        if (updated) {
            newParams.page = 1;

            this.setState({
                params: newParams 
            });

            this._updateListings();
        }
    }

    _updateListings() {
        // Enable loader
        this.setState({loadingListings: true});

        // load promotions then listings based on number of
        // promotions
        PromotionService.get_most_recent()
            .then(res => {
                var params = this.state.params;

                if (res.results.length != 0) {
                    params.page_size = init_state().params.page_size - 1;
                    params.num_promotions = 1;
                } else {
                    params.page_size = init_state().params.page_size;
                }

                this.setState({
                    promotions: res.results,
                    params: params
                });
            })
            .then(res => {
                ListingService.filter(this.state.params)
                    .then(res => {
                        this.setState({
                            listings: res.results,
                            totalPages: res.total_pages
                        });

                        this.setState({loadingListings: false});
                    });
            });
    }

    _handlePageChange(e, d) {
        var newParams = this.state.params;
        newParams.page = d.activePage;

        this.setState({
            params: newParams            
        });

        this._updateListings();
    }

   /* 
    Used to refresh component upon click of some
    object (such as logo). Created because react-router
    no longer supports refreshing.
    */
    _refresh() {
        this.setState(init_state);

        // reload default listings
        this.componentDidMount();
    }

    render() {
        return (
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <div style={{ width: "100%" }}>
                            <ListingCardGrid 
                                promotions={this.state.promotions}
                                loading={this.state.loadingListings}
                                itemsPerRow={this.props.itemsPerRow} 
                                listings={ this.state.listings } />

                            <br />
                            
                            <Grid centered>
                                <Grid.Row>
                                    <Grid.Column textAlign="center">
                                        <PaginationMenu 
                                            activePage={this.state.params.page} 
                                            totalPages={this.state.totalPages}
                                            onPageChange={this._handlePageChange} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
};