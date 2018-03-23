import React from "react";

import { Form, Text, Select, TextArea } from "react-form";
import { Button, Container, Header, Grid, Message } from "semantic-ui-react";
import Recaptcha from "react-google-invisible-recaptcha";

import { Redirect } from "react-router-dom";

import InquiryService from "services/api/inquiry.js";

let captcha;

export default class InquiryForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this); // for recaptcha
        this.onResolved = this.onResolved.bind(this); // for recaptcha
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

    onSubmit() {
        // manually trigger reCAPTCHA execution
        this.recaptcha.execute();
    };

    onResolved() {
        this.setState({ recaptchaToken: this.recaptcha.getResponse() });
        console.log(this.state.recaptchaToken);
        // below line essential to trigger onSubmit on the form.
        // simple submit does not work.
        document.getElementById("inquiryForm").dispatchEvent(new Event("submit")); 
    }

    render() {
        const FormContent = props => (
            <form 
                id="inquiryForm" 
                className="ui form" 
                onSubmit={props.formApi.submitForm}
            >
                <div className="field required">
                    <TextArea field="msg" id="msg" placeholder="Your message to the lister..." />
                </div>

                <div className="ui button positive" onClick={this.onSubmit}>SEND</div>

                <Recaptcha
                    ref={ el => this.recaptcha = el }
                    sitekey="6Lc2PkYUAAAAAMPuGU655s-wI-0xjn60GyjDOwc3"
                    onResolved={ this.onResolved }
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
                <div>
                <Form 
                    onSubmit={this.handleSubmit}
                    component={FormContent} />

                </div>
            );
        }
    }
}