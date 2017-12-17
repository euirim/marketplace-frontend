import React from "react";

import {
    Link
} from "react-router-dom";

import { Menu, Header, Dropdown } from "semantic-ui-react";
import AuthService from "services/api/auth.js";

export default class MainNavbar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isAuthenticated: this.props.isAuthenticated
        };
    }

    render() {
        var userStatusIndicator;
        if (this.state.isAuthenticated) {
            userStatusIndicator = (
                <Dropdown item icon="setting">
                    <Dropdown.Menu>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            );
        } 
        else {
            userStatusIndicator = (
                <Menu.Item as={Link} to="/login">
                    Login
                </Menu.Item>
            );
        }

        return (
            <Menu fixed="top" borderless>
                <Menu.Item header>
                    <Link to="/">
                        <Header as="h3">Marketplace</Header>
                    </Link>
                </Menu.Item>
                <Menu.Menu position="right">
                { userStatusIndicator }
                </Menu.Menu>
            </Menu>
        );
    }
}