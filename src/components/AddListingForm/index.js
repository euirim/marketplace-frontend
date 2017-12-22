import React from "react";

import { Form, Text, Select, TextArea } from 'react-form';
import { Container, Header, Grid } from "semantic-ui-react";

import ListingService from "services/api/listing.js";

const categoryOptions = [
    {
        label: "For sale",
        value: 1
    },
];

export default class AddListingForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {};
    }

    handleSubmit(submittedVals) {
        this.setState({submittedVals});

        console.log(submittedVals);

        ListingService
            .put(submittedVals)
            .then(res => {
                console.log(res);
            });
    }

    render() {
        const FormContent = props => (
            <form onSubmit={props.formApi.submitForm}>
                <div className="ui input">
                    <Text field="name" id="name" className="ui input" placeholder="Name" />
                </div>
                
                <div className="ui input">
                    <TextArea field="about" id="about" />
                </div>

                <div className="ui input">
                    <Select field="category" id="category" options={categoryOptions} />
                </div>

                <div className="ui input">
                    <Text field="price" id="price" />
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