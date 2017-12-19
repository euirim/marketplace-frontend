import React from "react";

import { Form, Text, Select, TextArea } from 'react-form';
import { Container, Header, Grid } from "semantic-ui-react";


export default class AddListingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const FormContent = props => (
            <form onSubmit={props.formApi.submitForm}>
                <label htmlFor="name">Name</label>
                <Text field="name" id="name" />
                
                <label htmlFor="about">About</label>
                <TextArea field="about" id="about" />

                <label htmlFor="category">Category</label>
                <Select field="category" id="category" options={["Hello"]} />

                <label htmlFor="price">Price</label>
                <Text field="price" id="price" />

                <button type="submit">Submit</button>
            </form>
        );

        return (
            <Form 
                onSubmit={submittedValues => this.setState( { submittedValues } )}
                component={FormContent} />
        );
    }
}