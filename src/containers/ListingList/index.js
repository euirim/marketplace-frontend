import React from "react";

import { Grid } from "semantic-ui-react";
import queryString from "query-string";

import ListingCardGrid from "components/ListingCardGrid";
import ListingFilterNav from "components/ListingFilterNav";
import PaginationMenu from "components/PaginationMenu";

import CategoryService from "services/api/category.js";
import ListingService from "services/api/listing.js";

export default class ListingList extends React.Component {
    constructor(props) {
        super(props);

        this.handleCategoryUpdate = this.handleCategoryUpdate.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    
        this.state = { 
            listings: [],
            categories: [],
            totalPages: null,
            params: {
                page_size: 3,
                category: null,
                page: 1
            }
        };
    }

    componentDidMount() {
        CategoryService.get_all()
            .then(res => {
                console.log(res);
                this.setState({categories: res});
            });

        ListingService.filter(this.state.params)
            .then(res => {
                this.setState({
                    listings: res.results,
                    totalPages: res.total_pages
                });
            });
    }

    handleCategoryUpdate(category_id) {
        var newParams = this.state.params;

        newParams.page = 1;

        newParams.category = category_id;

        this.setState({
            params: newParams
        });

        ListingService.filter(this.state.params)
            .then(res => {
                this.setState({
                    listings: res.results,
                    totalPages: res.total_pages
                });
            });
    }

    handlePageChange(e, d) {
        var newParams = this.state.params;
        newParams.page = d.activePage;

        ListingService.filter(this.state.params)
            .then(res => {
                this.setState({listings: res.results});
            });

        this.setState({
            params: newParams            
        });
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <ListingFilterNav 
                    handler={this.handleCategoryUpdate} 
                    categories={this.state.categories}
                    activeCategory={this.state.params.category} />

                <ListingCardGrid 
                    itemsPerRow={this.props.itemsPerRow} 
                    listings={ this.state.listings } />

                <br />
                
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <PaginationMenu 
                                activePage={this.state.params.page} 
                                totalPages={this.state.totalPages}
                                onPageChange={this.handlePageChange} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
};