import React from "react";

import { Container, Header, Grid } from "semantic-ui-react";

import FourOhFourPanel from "components/FourOhFourPanel";
import CentralPanel from "components/CentralPanel";

export default class FourOhFour extends React.Component {
    render() {
        return (
            <CentralPanel computer={6} tablet={10} mobile={16}>
                <FourOhFourPanel />
            </CentralPanel>
        );
    }
};