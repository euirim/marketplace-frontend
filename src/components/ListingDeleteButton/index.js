import React from "react";
import { 
    Button, 
    Loader
} from "semantic-ui-react";

import ListingService from "services/api/listing.js";

export default class ListingDeleteButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            loading: false,
            disabled: false
        };
    }

    handleClick() {
        this.setState({loading: true});

        ListingService.del(this.props.listingID)
            .then(res => {
                this.props.clickHandler();
                this.setState({
                    loading: false,
                    disabled: true
                });
            });
    }

    render() {
        const buttonMsg = this.state.disabled ? "Deleted" : "Delete";
        return (
            <Button 
                basic 
                icon="delete"
                color="red" 
                onClick={this.handleClick}
                {...this.state}>
                
                { buttonMsg }
            </Button>
        );
    }
};