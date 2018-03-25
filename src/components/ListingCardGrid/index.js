import React from "react";

import { 
    Container, 
    Card,
    Transition,
    Loader
} from "semantic-ui-react";

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
        if (this.props.loading) {
            return (
                <Loader active inline="centered" size="massive" />
            );
        } else if (!this.props.loading && (this.props.listings.length == 0)) {
            return (
                <p>No listings found.</p>
            );
        }

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