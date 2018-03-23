import React from "react";
import {
    Link
} from "react-router-dom";

import { 
    Button,
    Modal,
    Header,
    Icon,
    List
} from "semantic-ui-react";

export default class LogoutConfirmModal extends React.Component{
    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.state = { open: false };
    }
    show() {
        this.setState({ open: true });
    }

    close() {
        this.setState({ open: false });
    }

    render() {
        return (
            <Modal trigger={this.props.children} size="mini" closeIcon>
                <Header icon="moon" content="LOG OUT" />
                <Modal.Content>
                    <p>Are you sure you want to log out?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button as={Link} to="/logout" color="red"><Icon name="checkmark" />YES</Button>
                </Modal.Actions>
            </Modal>
        );
    }
};