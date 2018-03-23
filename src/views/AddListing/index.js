import React from "react";

import { Container, Header, Grid, Card } from "semantic-ui-react";

import AddListingForm from "components/AddListingForm";
import CentralPanel from "components/CentralPanel";

export default class AddListing extends React.Component {
    render() {
        return (
            <CentralPanel
                computer={8}
                tablet={12}
                mobile={16}>
                <Card fluid>
                    <Card.Content textAlign="center">
                        <Header as="h1">
                            <Header.Content>
                                POST LISTING
                            </Header.Content>
                            <Header.Subheader>
                                Let everyone know what you're selling or offering.
                            </Header.Subheader>
                        </Header>
                    </Card.Content>
                    <Card.Content>
                        <AddListingForm />
                    </Card.Content>
                </Card>
            </CentralPanel>
        );
    }
}