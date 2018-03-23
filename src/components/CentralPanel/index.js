import React from "react";

import { 
    Container,
    Grid
} from "semantic-ui-react";

export default class CentralPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Container style={{ paddingTop: '5em' }}>
                <Grid stackable>
                    <Grid.Row centered>
                        <Grid.Column 
                            computer={this.props.computer} 
                            tablet={this.props.tablet} 
                            mobile={this.props.mobile}>
                            { this.props.children }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
};