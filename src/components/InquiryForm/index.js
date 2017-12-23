import React from "react";

import { Form, Text, Select, TextArea } from 'react-form';
import { Container, Header, Grid } from "semantic-ui-react";

import { Redirect } from "react-router-dom";

import InquiryService from "services/api/inquiries.js";

export default class InquiryForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {};
    }

    handleSubmit(submittedVals) {
        submittedVals["listing"] = this.props.listingID;
        this.setState({submittedVals});

        InquiryService
            .put(submittedVals)
            .then(res => {
                this.setState({ successfulSubmit: true });
            });
    }

    render() {
        const FormContent = props => (
            <form onSubmit={props.formApi.submitForm}>
                <div className="ui input">
                    <TextArea field="msg" id="msg" />
                </div>

                <button type="submit">Submit</button>
            </form>
        );

        return (
            <Form 
                onSubmit={this.handleSubmit}
                component={FormContent} />
        );
    }
}