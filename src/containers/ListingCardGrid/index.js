import React from "react";

import { Container } from "semantic-ui-react";

import ListingService from "services/api/listing.js";

export default class ListingCardGrid extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listings: []
        };
    }

    componentDidMount() {
        ListingService
            .get_most_recent(3)
            .then(res => {
                const listings = res.data;
                this.setState({ listings });
            });
    }

    render() {
        var listings = this.state.listings.map((listing) => 
            <p>{ listing.name }</p>
        );
        return (
            <div>{ listings }</div>
        );
    }
}