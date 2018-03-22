import React from "react";

import { 
    Card,
    Header,
    Button,
    Icon
} from "semantic-ui-react";


export default class FourOhFourPanel extends React.Component {
    render() {
        return (
            <Card fluid centered>
                <Card.Content textAlign="center">
                    <Header as="h1">
                        <Header.Content>
                            NOT FOUND
                            <Header.Subheader>
                                Sorry, we can't find that page.
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Card.Content>

                <Card.Content textAlign="center">
                    <Button primary size="large">
                        <Icon name="home" />Return Home
                    </Button>
                </Card.Content>
            </Card>
        );
    }
};