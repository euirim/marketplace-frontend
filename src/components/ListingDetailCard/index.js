import React from "react";
import { 
    Card, 
    Label,
    Header,
    Icon,
    Button,
    List
} from "semantic-ui-react";

import ShowMoreText from "react-show-more-text";

import ContactButton from "components/ContactButton";

export default class ListingDetailCard extends React.Component {
    /*
        Class assumes a listing is inputted as a prop.
    */
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <Card fluid>
                <Card.Content>
                    <Label color={ this.props.listing.category.color }>
                        { this.props.listing.category.name }
                    </Label>
                </Card.Content>

                <Card.Content>
                    <Card.Header>
                        <Header as="h1" >
                            <span className="listing-card-header">{ this.props.listing.name }</span>
                        </Header>
                    </Card.Header>
                </Card.Content>

                <Card.Content>
                    <ContactButton listing={ this.props.listing } />
                </Card.Content>

                <Card.Content>
                    <Card.Description>
                        <ShowMoreText 
                            lines={5}> 

                            {this.props.listing.about.split("\n").map(i => {
                                return <p>{i} </p>;
                            })}
                        </ShowMoreText>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
};