import React from "react";

import ListingCardGrid from "components/ListingCardGrid";
import ListingFilterNav from "components/ListingFilterNav";

import CategoryService from "services/api/category.js";
import ListingService from "services/api/listing.js";

export default class ListingList extends React.Component {
    constructor(props) {
        super(props);

        this.handleCategoryUpdate = this.handleCategoryUpdate.bind(this);
    
        this.state = { 
            listings: [],
            categories: [],
            activeCategory: -1
        };
    }

    componentDidMount() {
        CategoryService.get_all()
            .then(res => {
                this.setState({categories: res});
            });

        ListingService.get_most_recent(3)
            .then(res => {
                this.setState({listings: res});
            });
    }

    handleCategoryUpdate(category_id) {
        this.setState({
            activeCategory: category_id
        });

        // filter listings based on category
        const params = {
            category: category_id
        }

        // -1 category_id is all
        if (category_id !== -1) {
            ListingService.filter(params)
                .then(res => {
                    console.log("OY!");
                    console.log(res);
                    this.setState({listings: res})
                });
        } else {
            ListingService.get_most_recent(3)
                .then(res => {
                    this.setState({listings: res});
                });
        }
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <ListingFilterNav 
                    handler={this.handleCategoryUpdate} 
                    categories={this.state.categories}
                    activeCategory={this.state.activeCategory} />
                <ListingCardGrid 
                    itemsPerRow={this.props.itemsPerRow} 
                    listings={ this.state.listings } />
            </div>
        )
    }
};