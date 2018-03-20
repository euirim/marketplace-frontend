import React from 'react';

import {
    Link
} from "react-router-dom";

import { 
    Card, 
    Image,
    Segment,
    Label,
    Header
} from 'semantic-ui-react';

import URLService from "services/urls/index.js"

export default class ListingCard extends React.Component {
    render(){
        return (
            <Card as={ Link } to={ "/listings/" + this.props.id } centered fluid>
                <Image 
                    label={
                        { 
                            as: "a", 
                            content: this.props.category.name, 
                            attached: "top right", 
                            color: this.props.category.color
                        }
                    } 
                    src={ URLService.genMediaURL(this.props.photo) }>
                </Image>

                <Card.Content extra>
                    <Card.Content className="right floated">
                        <div className="listing-card-price-label">
                            <Header textAlign="right" sub>Price</Header>
                            <strong>$ { this.props.price }</strong>
                        </div>
                    </Card.Content>
                    <Card.Header disabled>
                        <span className="listing-card-header">{ this.props.name }</span>
                    </Card.Header>
                </Card.Content>
            </Card>
        );
    }
}