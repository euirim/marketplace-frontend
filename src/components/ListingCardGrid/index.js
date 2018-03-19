import React from "react";

import { Container, Card } from "semantic-ui-react";

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

    render() {
        var listings = this.props.listings.map((listing) => 
            <ListingCard 
                key={ listing.id } 
                id={ listing.id }
                name={ listing.name } 
                price={ listing.price } 
                category={ listing.category } 
                photo={ listing.photos[0] } />
        );
        return (
            <Card.Group itemsPerRow={3} doubling stackable centered>
                { listings }
            </Card.Group>
        );
    }
}