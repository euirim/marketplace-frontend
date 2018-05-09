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
            listings: [],
            promotions: []
        };
    }

    componentDidMount() {
        this.setState({
            listings: this.props.listings,
            promotions: this.props.promotions
        });
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

         var promotions = this.state.promotions.map((p) => 
            <ListingCard 
                key={ p.listing.id } 
                id={ p.listing.id }
                name={ p.listing.name } 
                price={ p.listing.price } 
                category={ p.listing.category } 
                photo={ p.listing.photos[0] }
                timePosted={ p.listing.time_created }
                deleteButton={ this.props.deleteButton }
                hasInnerLinks={ this.props.hasInnerLinks } 
                promoted />
        );

        var listings = this.props.listings.map((listing) => 
            <ListingCard 
                key={ listing.id } 
                id={ listing.id }
                name={ listing.name } 
                price={ listing.price } 
                category={ listing.category } 
                photo={ listing.photos[0] }
                timePosted={ listing.time_created }
                deleteButton={ this.props.deleteButton }
                hasInnerLinks={ this.props.hasInnerLinks } />
        );

        listings = promotions.concat(listings);

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