import React from "react";

import { 
    Card,
    Header,
    Button,
    Icon
} from "semantic-ui-react";

import AuthService from "services/api/auth.js";


export default class LoginPanel extends React.Component {
    render() {
        return (
            <Card fluid centered>
                <Card.Content textAlign="center">
                    <Header as="h1">
                        <Header.Content>
                            LOG IN
                            <Header.Subheader>
                                To buy & sell to Hyde Park and beyond.
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Card.Content>

                <Card.Content textAlign="center">
                    <Button onClick={ () => {AuthService.handleClick(this.props.referralPath);} } color="facebook" size="large">
                        <Icon name="facebook" />Continue with Facebook
                    </Button>
                </Card.Content>

                <Card.Content textAlign="center">
                    <Card.Meta>
                        By logging in, you agree to <em>The Chicago Maroon's</em> Marketplace terms and conditions.
                    </Card.Meta>
                </Card.Content>
            </Card>
        );
    }
};