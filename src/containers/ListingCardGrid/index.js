import React from "react";

import { Container } from "semantic-ui-react";

import ListingCard from "components/ListingCard";

export default class ListingCardGrid extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listings: []
        };
    }

    componentDidMount() {
        console.log(this.props.listings);
        this.setState({listings: this.props.listings});
    }

    componentWillReceiveProps(nextProps) {
        // updates if current state is empty
        // for props promises
        if (this.state.listings.length == 0) {
            this.setState({listings: nextProps.listings});
        }
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