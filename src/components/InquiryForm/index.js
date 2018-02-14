import React from "react";

import { Form, Text, Select, TextArea } from 'react-form';
import { Container, Header, Grid, Message } from "semantic-ui-react";

import { Redirect } from "react-router-dom";

import InquiryService from "services/api/inquiry.js";

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
                this.props.parentHandler();
            });
    }

    render() {
        const FormContent = props => (
            <form className="ui form" onSubmit={props.formApi.submitForm}>
                <div className="field required">
                    <TextArea field="msg" id="msg" />
                </div>

                <button 
                    className="ui button g-recaptcha" 
                    type="submit"
                    data-sitekey="6Lc2PkYUAAAAAMPuGU655s-wI-0xjn60GyjDOwc3"
                >
                    Submit
                </button>
            </form>
        );

        if (this.state.successfulSubmit) {
            return (
                <Message
                    icon="check"
                    header="Inquiry sent."
                    content="Please check your email for a response from the lister."
                />
            );
        }
        else {
            return (
                <Form 
                    onSubmit={this.handleSubmit}
                    component={FormContent} />
            );
        }
    }
}