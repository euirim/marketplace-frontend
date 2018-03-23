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
        var card;
        if (this.props.itemsPerRow > 2) {
            card = (
                <Card.Group itemsPerRow={this.props.itemsPerRow} doubling stackable centered>
                    { listings }
                </Card.Group>
            );
        } else {
            // doubling introduces card width problems when itemsPerRow is 2
            card = (
                <Card.Group itemsPerRow={this.props.itemsPerRow} stackable centered>
                    { listings }
                </Card.Group>
            );
        }

        return card;
    }
}