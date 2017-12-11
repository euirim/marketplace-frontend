import React from 'react';

import {
    Link
} from "react-router-dom";

import { Card, Image } from 'semantic-ui-react';

export default class ListingCard extends React.Component {
    render(){
        return (
            <Card as={ Link } to={ "/listings/" + this.props.id } color="red" centered>
                <Image src="https://www.alairhomes.com/wp-content/uploads/sites/28/2015/02/alair-homes-custom-home-builders-canada.jpg"></Image>
                <Card.Content>
                    <Card.Header>{ this.props.name }</Card.Header>
                    <Card.Meta>{ this.props.category.name }</Card.Meta>
                </Card.Content>

                <Card.Content extra>
                    <Card.Content textAlign="right">
                        <p>$ { this.props.price }</p>
                    </Card.Content>
                </Card.Content>
            </Card>
        );
    }
}