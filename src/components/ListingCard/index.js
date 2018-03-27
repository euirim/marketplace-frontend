import React from 'react';

import {
    Link
} from "react-router-dom";

import { 
    Card, 
    Image,
    Segment,
    Label,
    Header,
    Icon
} from 'semantic-ui-react';
import ProgressiveImage from "react-progressive-image";

import URLService from "services/urls/index.js"

export default class ListingCard extends React.Component {
    render(){
        return (
            <Card as={ Link } to={ "/listings/" + this.props.id } centered fluid>
                <ProgressiveImage 
                    src={ URLService.genMediaURL(this.props.photo) }
                    placeholder={ URLService.genStaticURL("/images/card_img_ph.png") }>

                    {(src) => (
                        <Image 
                            label={
                                { 
                                    as: "a", 
                                    content: this.props.category.name, 
                                    attached: "top right", 
                                    color: this.props.category.color
                                }
                            } 
                            src={ src }>
                        </Image>
                    )}
                </ProgressiveImage>

                <Card.Content>
                    <Card.Header disabled>
                        <span className="listing-card-header">{ this.props.name }</span>
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Card.Header>
                        <Icon name="dollar" disabled fitted /> { this.props.price }
                    </Card.Header>
                </Card.Content>
            </Card>
        );
    }
}