import React from 'react';
import { 
    Card, 
    Label,
    Header,
    Icon
} from 'semantic-ui-react';

import ShowMoreText from 'react-show-more-text';

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
                    <Card.Header>
                        <Icon disabled name="dollar"/>
                        { this.props.listing.price }
                    </Card.Header>
                    
                    { this.props.modal }
                </Card.Content>

                <Card.Content>
                    <Card.Description>
                        <ShowMoreText lines={5}> 
                            <p>{ this.props.listing.about }</p>
                        </ShowMoreText>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
};