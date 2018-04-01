import React from "react";

import { Container, Header, Grid } from "semantic-ui-react";
import { Helmet } from "react-helmet";

import FourOhFourPanel from "components/FourOhFourPanel";
import CentralPanel from "components/CentralPanel";
import AnalyticsService from "services/api/analytics.js";

export default class FourOhFour extends React.Component {
    componentDidMount() {
        // analytics
        AnalyticsService.recordPageVisit();
    }

    render() {
        return (
            <CentralPanel computer={6} tablet={10} mobile={16}>
                <Helmet>
                    <title>Not Found | Marketplace</title>
                </Helmet>

                <FourOhFourPanel />
            </CentralPanel>
        );
    }
};