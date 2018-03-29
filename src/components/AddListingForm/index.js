import axios from "axios";

import React from "react";

import { Form, Text, Select, TextArea } from "react-form";
import { 
    Button, 
    Container, 
    Header, 
    Grid, 
    List, 
    Dropdown,
    Dimmer,
    Loader,
    Message
} from "semantic-ui-react";
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

const requiredValidate = value => {
    return !value ? "This is a required field." : null;
}



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
            categoryOptions: [],
            uploading: false,
            globalError: null
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
        let size = 0;

        for (let i=0; i < files.length; i++) {
            size += files[i].size;
        }

        // TODO: consolidated error message will all errors
        // too large files
        if (size > 10000000) {
            this.setState({ fileErrorCode: 3 });
            this.setState({ files: [] });
            return 1;
        }

        if ((files.length <= 10) && (files.length > 0)) {
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
            this.setState({ fileErrorCode: 0 });
            this.setState({ files: files });
        } 
    }

    handleSubmit(submittedVals) {
        // TODO: Loading bar

        this.setState({ uploading: true });
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
                    }).catch(e => {
                        this.setState({ 
                            uploading: false,
                            globalError: "Make sure you fill out all the fields."
                        });
                    });
            });
        } else {
            this.setState({uploading: false});
        }
    }

    onSubmit() {
        // manually trigger reCAPTCHA execution
        this.recaptcha.execute();
    };

    onResolved() {
        this.setState({ recaptchaToken: this.recaptcha.getResponse() });
        // below line essential to trigger onSubmit on the form.
        // simple submit does not work.
        document.getElementById("addListingForm").dispatchEvent(new Event("submit")); 
    }

    render() {
        var DropzoneMsg; 

        if (this.state.fileErrorCode == 1) {
            DropzoneMsg = props => (
                <Message negative>
                    <Message.Header>Select an image</Message.Header>
                    <p>All listings require at least one associated photo.</p>
                </Message>
           );
        }
        else if (this.state.fileErrorCode == 2) {
            DropzoneMsg = props => (
                <Message negative>
                    <Message.Header>Too many images</Message.Header>
                    <p>At this time, a listing can have at most 10 images.</p>
                </Message>
            );
        }
        else if (this.state.fileErrorCode == 3) {
            DropzoneMsg = props => (
                <Message
                    negative
                    header="Images too large"
                    content="At this time, the photos of a listing must collectively be under 10 MB in size."
                />
            );
        }
        else {
            DropzoneMsg = props => (
                <p>You can select multiple images (max 10) after clicking the button below.</p>
            );
        }

        let dropzoneRef;

        const FormContent = props => (
            <form 
                id="addListingForm"
                className="ui form" 
                encType="multipart/form-data" 
                onSubmit={props.formApi.submitForm}
            >
                <div className="field required">
                    <label>Listing Title</label>
                    <Text 
                        field="name" 
                        id="name" 
                        className="ui input" 
                        placeholder="1908 Ford Model T" 
                        validate={requiredValidate}
                        required />
                </div>
                
                <div className="field required">
                    <label>Describe Your Listing</label>
                    <TextArea 
                        field="about" 
                        id="about" 
                        validate={requiredValidate}
                        required />
                </div>

                <div className="field required">
                    <label>Listing Categories</label>
                    <Select 
                        field="category" 
                        id="category" 
                        options={this.state.categoryOptions} 
                        className="ui selection dropdown" 
                        validate={requiredValidate}
                        required /> 
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
                        ref={(node) => { dropzoneRef = node; }}
                        onDrop={this.onDrop.bind(this)} 
                        accept="image/*" 
                        className="fluid" required >
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

                    <Button 
                        icon="image"
                        content="Select Image(s)"
                        color="grey"
                        onClick={() => { dropzoneRef.open() }}
                        />
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
                <Redirect 
                    to={{
                        pathname: "/profile", 
                        state: {addedListing: true}
                    }} />
            );
        }
        else {
            /* uploading */
            var uploadingIndicator;
            if (this.state.uploading) {
                return (
                    <Dimmer active>
                        <Loader indeterminate>Posting</Loader>
                    </Dimmer>
                );
            }

            let globalErrorMsg;

            if (this.state.globalError) {
                globalErrorMsg = (
                    <Message 
                        negative
                        header="Something went wrong."
                        content={this.state.globalError} />
                );
            }

            return (
                <div>
                    {globalErrorMsg}

                    <Form 
                        validateError={errorValidator}
                        onSubmit={this.handleSubmit}
                        component={FormContent} />
                </div>
            );
        }
    }
}