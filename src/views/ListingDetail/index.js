import React from "react";
import { Redirect } from "react-router-dom";

import { 
    Container, 
    Header, 
    Grid, 
    Modal, 
    Button,
    Icon,
    Message,
    Loader
} from "semantic-ui-react";
import ImageGallery from 'react-image-gallery';
import { Helmet } from "react-helmet";

import ListingService from "services/api/listing.js";
import URLService from "services/urls";
import ListingDetailCard from "components/ListingDetailCard";
import InquiryForm from "components/InquiryForm";

import "react-image-gallery/styles/css/image-gallery.css";

export default class ListingDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleContact = this.handleContact.bind(this);

        this.state = {
            listing: null,
            contacted: false,
            notFound: false
        };
    }

    componentDidMount() {
        ListingService
            .get(this.props.match.params.id)
            .then(res => {
                this.setState({ listing: res });
            })
            .catch(e => {
                this.setState({ notFound: true });
            });
    }

    handleContact() {
        this.setState({ contacted: true });
    }

    render() {
        // If listing not found, redirect home
        if (this.state.notFound) {
            return <Redirect to="/404" />
        }        

        var content;
        if (this.state.listing) {
            var images = [];
            
            for (var i=0; i < this.state.listing.photos.length; i++) {
                images.push({
                    original: URLService.genMediaURL(this.state.listing.photos[i]),
                    thumbnail: URLService.genMediaURL(this.state.listing.photos[i])
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
                    <Helmet>
                        <title>{ this.state.listing.name }</title>
                    </Helmet>

                    <Grid stackable>
                        <InquiryMessage/>

                        <Grid.Row>
                            <Grid.Column width={9}>
                                <ImageGallery 
                                    showPlayButton={false}
                                    slideDuration={600}
                                    items={images} />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <ListingDetailCard listing={this.state.listing} modal={ContactModal} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            );
        }
        else {
            content = (
                <Container style={{ paddingTop: '5em' }}>
                    <Helmet>
                        <title>Loading...</title>
                    </Helmet>

                    <Loader active inline="centered" size="massive" />
                </Container>
            );
        }

        return content;
    }
}