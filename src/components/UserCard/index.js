import React from "react";
import { Link } from "react-router-dom";

import { 
    Card,
    Header,
    Button,
    Icon
} from "semantic-ui-react";

export default class UserCard extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return(
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Header as="h1">{ this.props.name }</Header>
                    </Card.Header>
                </Card.Content>

                <Card.Content>
                    <Button 
                        as={Link} 
                        to="/listings/add" 
                        icon="plus"
                        content="ADD LISTING"
                        labelPosition="left"
                        positive/>
                </Card.Content>
            </Card>            
        );
    }
};