import React from "react";

import { Container, Header, Grid, Modal, Button } from "semantic-ui-react";
import ShowMoreText from 'react-show-more-text';
import ImageGallery from 'react-image-gallery';

import ListingService from "services/api/listing.js";
import InquiryForm from "components/InquiryForm";

import "react-image-gallery/styles/css/image-gallery.css";

export default class ListingDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listing: null
        };
    }

    componentDidMount() {
        ListingService
            .get(this.props.match.params.id)
            .then(res => {
                this.setState({ listing: res });
            });
    }

    render() {
        var content;

        if (this.state.listing) {
            const images = [
                {
                    original: "https://www.ford.com/cmslibs/content/dam/brand_ford/en_us/brand/legacy/nameplate/cars/18_mst_segment_landing_32.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg",
                    thumbnail: "https://www.ford.com/cmslibs/content/dam/brand_ford/en_us/brand/legacy/nameplate/cars/18_mst_segment_landing_32.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg"
                }
            ];
            const ContactModal = () => (
                <Modal size="tiny" trigger={<Button color="red">Contact</Button>}>
                    <Modal.Header>Contact the lister</Modal.Header>
                    
                    <Modal.Content>
                        <Modal.Description>
                            <InquiryForm listingID={this.props.match.params.id} />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            );

            content = (
                <Container style={{ paddingTop: '5em' }}>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={9}>
                                <ImageGallery items={images} />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <p>{ this.state.listing.category.name }</p>

                                <Header as="h1">{ this.state.listing.name }</Header>
                                <Header as="h3">${ this.state.listing.price }</Header>

                                <p>
                                    <ShowMoreText
                                        lines={5}
                                    >
                                        { this.state.listing.about }
                                    </ShowMoreText>
                                </p>

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