import React from "react";

import { 
    Button,
    Modal,
    Icon,
    Grid,
    Message
} from "semantic-ui-react";

import InquiryForm from "components/InquiryForm";


export default class ContactButton extends React.Component{
    constructor(props) {
        super(props);

        this.onContact = this.onContact.bind(this);

        this.state = {
            contacted: false
        };
    }

    componentDidMount() {
    }

    onContact() {
        this.setState({ contacted: true });
        // this.props.onContact();
    }

    render() {
        const priceLabel = {
            basic: true, 
            color: "black", 
            pointing: "left", 
            content: "$ " + this.props.listing.price
        };

        const ContactModal = () => {
            if (this.state.contacted) {
                return (
                    <Button icon labelPosition="left" disabled>
                        <Icon name='check' />
                        CONTACTED
                    </Button>
                );
            }

            return (
                <Modal 
                    size="tiny" 
                    trigger={
                        <Button 
                            color="blue" 
                            content="CONTACT" 
                            label={priceLabel} 
                            icon="mail" />
                    }>
                    <Modal.Header>Contact the lister</Modal.Header>
                    
                    <Modal.Content>
                        <Modal.Description>
                            <InquiryForm 
                                listingID={this.props.listing.id}
                                parentHandler={this.onContact} />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            );
        };

        const InquiryMessage = () => {
            if (this.state.contacted) {
                return (
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Message
                                icon="check circle outline"
                                header="Inquiry sent."
                                content="Please wait for the poster of this listing to respond."
                                positive
                            />
                        </Grid.Column>
                    </Grid.Row>
                );
            } else {
                return null;
            }
        }

        return (
            <ContactModal />
        );
    }

};