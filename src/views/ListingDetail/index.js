import React from "react";

import { 
    Container, 
    Header, 
    Grid, 
    Modal, 
    Button,
    Icon,
    Message
} from "semantic-ui-react";
import ShowMoreText from 'react-show-more-text';
import ImageGallery from 'react-image-gallery';

import ListingService from "services/api/listing.js";
import InquiryForm from "components/InquiryForm";

import "react-image-gallery/styles/css/image-gallery.css";

export default class ListingDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleContact = this.handleContact.bind(this);

        this.state = {
            listing: null,
            contacted: false
        };
    }

    componentDidMount() {
        ListingService
            .get(this.props.match.params.id)
            .then(res => {
                this.setState({ listing: res });
            });
    }

    handleContact() {
        this.setState({ contacted: true });
    }

    render() {
        var content;

        if (this.state.listing) {
            var images = [];
            
            for (var i=0; i < this.state.listing.photos.length; i++) {
                images.push({
                    original: this.state.listing.photos[i],
                    thumbnail: this.state.listing.photos[i]
                });
            }

            const ContactModal = () => {
                if (this.state.contacted) {
                    return (
                        <Button icon labelPosition="left" disabled>
                            <Icon name='check' />
                            Contacted
                        </Button>
                    );
                }

                return (
                    <Modal size="tiny" trigger={<Button color="red">Contact</Button>}>
                        <Modal.Header>Contact the lister</Modal.Header>
                        
                        <Modal.Content>
                            <Modal.Description>
                                <InquiryForm 
                                    listingID={this.props.match.params.id} 
                                    parentHandler={this.handleContact} />
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

            content = (
                <Container style={{ paddingTop: '5em' }}>
                    <Grid stackable>
                        <InquiryMessage/>

                        <Grid.Row>
                            <Grid.Column width={9}>
                                <ImageGallery items={images} />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <p>{ this.state.listing.category.name }</p>

                                <Header as="h1">{ this.state.listing.name }</Header>
                                <Header as="h3">${ this.state.listing.price }</Header>

                                <ShowMoreText
                                    lines={5}
                                >
                                    <p>{ this.state.listing.about }</p>
                                </ShowMoreText>

                                <ContactModal/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }
        else {
            content = (
                 <Container style={{ paddingTop: '5em' }}>
                    <Header as="h2">Loading...</Header>
                </Container>
            );
        }

        return content;
    }
}