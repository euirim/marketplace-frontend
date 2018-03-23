import axios from "axios";

import React from "react";

import { Form, Text, Select, TextArea } from "react-form";
import { Button, Container, Header, Grid, List, Dropdown } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import Dropzone from "react-dropzone";
import Recaptcha from "react-google-invisible-recaptcha";

import ListingService from "services/api/listing.js";
import PhotoService from "services/api/photo.js";
import CategoryService from "services/api/category.js";

const categoryOptions = [
    {
        label: "For sale",
        value: 1
    },
    {
        label: "Services",
        value: 2
    },
];

const errorValidator = (values) => {
    return {
        price: values.price &&
            !(values.price >= 0) ? "Input must be a number greater than or equal to 0." : null
    };
};


export default class AddListingForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkFiles = this.checkFiles.bind(this);
        this.onSubmit = this.onSubmit.bind(this); // for recaptcha
        this.onResolved = this.onResolved.bind(this); // for recaptcha
        this.state = { 
            files: [], 
            file_ids: [], 
            fileErrorCode: 0,
            categoryOptions: []
        };
    }

    componentDidMount() {
        // Get options for categories
        CategoryService
            .get_all()
            .then(res => {
                for (let i=0; i < res.length; i++) {
                    this.state.categoryOptions.push(
                        {
                            label: res[i].name,
                            value: res[i].id
                        }
                    );

                    this.setState({ 
                        categoryOptions: this.state.categoryOptions 
                    });
                }
            });

    }

    checkFiles(files) {
        if ((files.length <= 7) && (files.length > 0)) {
            return 0;
        }
        else if (files.length == 0) {
            this.setState({ fileErrorCode: 1 });
            this.setState({ files: [] });
        }
        else {
            this.setState({ fileErrorCode: 2 });
            this.setState({ files: [] });
        }

        return 1;
    }

    onDrop(files) {
        if (this.checkFiles(files) == 0) {
            this.setState({ files: files });
        } 
    }

    handleSubmit(submittedVals) {
        // TODO: Loading bar

        this.setState({submittedVals});

        if (this.checkFiles(this.state.files) == 0) {
            // upload files 
            const uploaders = this.state.files.map(file => {
                return PhotoService
                    .put(file)
                    .then(res => {
                        this.state.file_ids.push(res.image);
                        this.setState(
                            { file_ids: this.state.file_ids }
                        );
                    });
            });

            // after all the uploads are complete
            axios.all(uploaders).then(() => {
                this.setState({ files: [] });

                var requestData = submittedVals; 
                requestData["file_ids"] = this.state.file_ids;

                console.log(requestData);

                ListingService
                    .put(requestData)
                    .then(res => {
                        this.setState({ fireRedirect: true });
                    });
            });
        }
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
        document.getElementById("addListingForm").dispatchEvent(new Event("submit")); 
    }

    render() {
        var DropzoneMsg; 

        if (this.state.fileErrorCode == 1) {
            DropzoneMsg = props => (
                <p>Please select at least one image.</p>
            );
        }
        else if (this.state.fileErrorCode == 2) {
            DropzoneMsg = props => (
                <p>Too many files (6 max). Please select your images again.</p>
            );
        }
        else {
            DropzoneMsg = props => (
                <p>Drop images here, or click to upload.</p>
            );
        }

        const FormContent = props => (
            <form 
                id="addListingForm"
                className="ui form" 
                encType="multipart/form-data" 
                onSubmit={props.formApi.submitForm}
            >
                <div className="field required">
                    <label>Your name</label>
                    <Text field="name" id="name" className="ui input" placeholder="Name" required />
                </div>
                
                <div className="field required">
                    <label>Describe your listing</label>
                    <TextArea field="about" id="about" required />
                </div>

                <div className="field required">
                    <label>Listing categories</label>
                    <Select 
                        field="category" 
                        id="category" 
                        options={this.state.categoryOptions} 
                        className="ui selection dropdown" required /> 
                </div>

                <div className="field required">
                    <label>Price</label>

                    <div className="ui labeled input">
                        <label className="ui label">$</label>
                        <Text field="price" id="price" required />
                    </div>
                    <p>{ props.formApi.errors.price }</p>
                </div>

                {/* Upload files */}
                <div className="field required">
                    <label>Photos</label>
                    <Dropzone 
                        onDrop={this.onDrop.bind(this)} 
                        accept="image/*" 
                        className="fluid" required
                    >
                        <DropzoneMsg />

                        <List as='ol'>
                            {
                                this.state.files.map(f => 
                                    <List.Item as="li" key={f.name}>
                                        {f.name} - {f.size} bytes
                                    </List.Item>
                                )
                            }
                        </List>
                    </Dropzone>
                </div>

                <div className="ui button positive" onClick={this.onSubmit}>POST</div>

                <Recaptcha
                    ref={ el => this.recaptcha = el }
                    sitekey="6Lc2PkYUAAAAAMPuGU655s-wI-0xjn60GyjDOwc3"
                    onResolved={ this.onResolved }
                />
            </form>
        );

        if (this.state.fireRedirect) {
            return (
                <Redirect to="/profile" />
            );
        }
        else {
            return (
                <Form 
                    validateError={errorValidator}
                    onSubmit={this.handleSubmit}
                    component={FormContent} />
            );
        }
    }
}