import React from "react";

import { Grid } from "semantic-ui-react";
import queryString from "query-string";

import ListingCardGrid from "components/ListingCardGrid";
import ListingFilterNav from "components/ListingFilterNav";
import PaginationMenu from "components/PaginationMenu";

import CategoryService from "services/api/category.js";
import ListingService from "services/api/listing.js";

const init_state = () => {
    return ({
        listings: [],
        categories: [],
        loadListings: false,
        loadCategories: false,
        totalPages: null,
        params: {
            page_size: 12,
            category: null,
            page: 1,
            search: null
        }
    });
};

export default class ListingList extends React.Component {
    constructor(props) {
        super(props);

        this._handleCategoryUpdate = this._handleCategoryUpdate.bind(this);
        this._handlePageChange = this._handlePageChange.bind(this);
        this._handleSearch = this._handleSearch.bind(this);
        this._updateListings = this._updateListings.bind(this);
        this._refresh = this._refresh.bind(this);
    
        this.state = init_state();
    }

    componentDidMount() {
        CategoryService.get_all()
            .then(res => {
                this.setState({categories: res});
            });

        this._updateListings();
    }

    /*
    componentWillReceiveProps(nextProps) {
        if ((nextProps.id === this.props.id)) {
            console.log("HELLO");
            this.setState(Object.assign({}, init_state));
            this._refresh();
        }
    }
    */

    _updateListings() {
        // Enable loader
        this.setState({loadingListings: true});
        ListingService.filter(this.state.params)
            .then(res => {
                this.setState({
                    listings: res.results,
                    totalPages: res.total_pages
                });

                this.setState({loadingListings: false});
            });
    }

    _handleCategoryUpdate(category_id) {
        var newParams = this.state.params;

        newParams.page = 1;

        newParams.category = category_id;

        this.setState({
            params: newParams
        });

        this._updateListings();
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
    Handle search of a term in ListingFilterNav.
    Doesn't handle getting the term from the actual input though.
    Assumes term is not null.
    */
    _handleSearch(term) {
        var newParams = this.state.params;
        newParams.search = term;     
        newParams.page = 1;

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
            <div style={{ width: "100%" }}>
                <ListingFilterNav 
                    handler={this._handleCategoryUpdate} 
                    onSearch={this._handleSearch}
                    categories={this.state.categories}
                    activeCategory={this.state.params.category} />

                <ListingCardGrid 
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
        );
    }
};