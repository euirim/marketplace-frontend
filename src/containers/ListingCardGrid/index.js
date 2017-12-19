import React from "react";

import { Container } from "semantic-ui-react";

import ListingService from "services/api/listing.js";
import ListingCard from "components/ListingCard";

export default class ListingCardGrid extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listings: []
        };
    }

    componentDidMount() {
        this.setState({listings: this.props.listings});
    }

    render() {
        var listings = this.state.listings.map((listing) => 
            <ListingCard 
                key={ listing.id } 
                id={ listing.id }
                name={ listing.name } 
                price={ listing.price } 
                category={ listing.category } />
        );
        return (
            <div>{ listings }</div>
        );
    }
}