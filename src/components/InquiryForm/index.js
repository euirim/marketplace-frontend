import React from "react";

import { Form, Text, Select, TextArea } from 'react-form';
import { Button, Container, Header, Grid, Message } from "semantic-ui-react";
import Recaptcha from "react-recaptcha";

import { Redirect } from "react-router-dom";

import InquiryService from "services/api/inquiry.js";

let captcha;

export default class InquiryForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRecaptcha = this.handleRecaptcha.bind(this);
        this.state = {};
    }

    handleSubmit(submittedVals) {
        submittedVals["g-recaptcha-response"] = this.state.recaptchaToken;

        submittedVals["listing"] = this.props.listingID;
        this.setState({submittedVals});

        console.log(submittedVals);

        InquiryService
            .put(submittedVals)
            .then(res => {
                this.setState({ successfulSubmit: true });
                this.props.parentHandler();
            });
    }

    handleRecaptcha(response) {
        alert("HELLO");
        this.setState({ recaptchaToken: response });
        document.getElementById("inquiryForm").submit();
    }

    render() {
        // manually trigger reCAPTCHA execution
        const executeCaptcha = function () {
            captcha.execute();
            console.log("wow");
            this.setState({ recaptchaToken: captcha.getResponse() });
        };

        const FormContent = props => (
            <form id="inquiryForm" className="ui form" onSubmit={props.formApi.submitForm}>
                <div className="field required">
                    <TextArea field="msg" id="msg" />
                </div>

                <Button onClick={executeCaptcha}>Submit</Button>

                <Recaptcha
                    rel={ el => captcha = el }
                    size="invisible"
                    sitekey="6Lc2PkYUAAAAAMPuGU655s-wI-0xjn60GyjDOwc3"
                />
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