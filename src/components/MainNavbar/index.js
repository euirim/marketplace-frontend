import React from "react";

import {
    Link
} from "react-router-dom";

import { Menu, Header, Dropdown } from "semantic-ui-react";
import AuthService from "services/api/auth.js";

export default class MainNavbar extends React.Component {
    render() {
        console.log(AuthService.isAuthenticated());
        var userStatusIndicator;
        if (AuthService.isAuthenticated()) {
            userStatusIndicator = (
                <Dropdown item text="Settings">
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
                        <Header as="h2">Marketplace</Header>
                    </Link>
                </Menu.Item>
                <Menu.Menu position="right">
                { userStatusIndicator }
                </Menu.Menu>
            </Menu>
        );
    }
}