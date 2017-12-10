import React from 'react';

import { Card, Image } from 'semantic-ui-react';

export class ListingCard extends React.Component {
    render(){
        return (
            <Card color="red" centered>
                <Image src="https://www.alairhomes.com/wp-content/uploads/sites/28/2015/02/alair-homes-custom-home-builders-canada.jpg"></Image>
                <Card.Content>
                    <Card.Header>Large Victorian Mansion</Card.Header>
                    <Card.Meta><a>Real Estate</a></Card.Meta>
                </Card.Content>

                <Card.Content extra>
                    <Card.Content textAlign="right">
                        <p>$22</p>
                    </Card.Content>
                </Card.Content>
            </Card>
        );
    }
}