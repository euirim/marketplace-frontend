import React from "react";
import TimeAgo from "timeago-react";

import {
    Link
} from "react-router-dom";

import { 
    Card, 
    Image,
    Segment,
    Label,
    Header,
    Icon,
    Button,
    Dimmer
} from 'semantic-ui-react';
import ProgressiveImage from "react-progressive-image";

import URLService from "services/urls/index.js";
import ListingDeleteButton from "components/ListingDeleteButton";

export default class ListingCard extends React.Component {
    constructor(props) {
        super(props);
        
        this._deleteHandler = this._deleteHandler.bind(this);

        this.state = {
            deleted: false
        };
    }

    _deleteHandler() {
        this.setState({deleted: true});
    }

    render(){
        var deleteButton;

        if (this.props.deleteButton) {
            deleteButton = (
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button basic color="green" disabled>Claim</Button>
                        <ListingDeleteButton 
                            listingID={this.props.id}
                            clickHandler={this._deleteHandler} />
                    </div>
                </Card.Content>
            );
        }

        var outerParams = {};
        var innerParams = {};

        if (this.props.hasInnerLinks) { // whether card itself is a link
            innerParams = {
                as: Link,
                to: "/listings/" + this.props.id
            };
        } else {
            outerParams = {
                as: Link,
                to: "/listings/" + this.props.id
            };
        }

        return (
            <Card centered fluid {...outerParams}>
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
                            src={ src }
                            {...innerParams}>
                        </Image>
                    )}
                </ProgressiveImage>

                <Card.Content {...innerParams}>
                    <Card.Header disabled>
                        <span className="listing-card-header">{ this.props.name }</span>
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Card.Meta style={{"float": "right"}}>
                        <Icon name="clock" />
                        <TimeAgo 
                            datetime={ this.props.timePosted } />
                    </Card.Meta>

                    <Card.Header>
                        <Icon name="dollar" disabled fitted /> { this.props.price }
                    </Card.Header>
                </Card.Content>

                { deleteButton }
            </Card>
        );
    }
}