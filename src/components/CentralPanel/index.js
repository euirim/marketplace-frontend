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
                        <Grid.Column computer={6} tablet={10} mobile={16}>
                            { this.props.children }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
};