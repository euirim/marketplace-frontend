import React from "react";

import { Container, Header, Grid, Card } from "semantic-ui-react";
import { Helmet } from "react-helmet";

import AddListingForm from "components/AddListingForm";
import CentralPanel from "components/CentralPanel";
import AnalyticsService from "services/api/analytics.js";

export default class AddListing extends React.Component {
    componentDidMount() {
        // analytics
        AnalyticsService.recordPageVisit();
    }

    render() {
        return (
            <CentralPanel
                computer={8}
                tablet={12}
                mobile={16}>

                <Helmet>
                    <title>Add Listing</title>
                </Helmet>


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