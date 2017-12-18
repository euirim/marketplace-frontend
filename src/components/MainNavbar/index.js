import React from "react";

import {
    Link
} from "react-router-dom";

import { Menu, Header, Dropdown, Icon } from "semantic-ui-react";
import AuthService from "services/api/auth.js";

export default class MainNavbar extends React.Component {
    render() {
        var userStatusIndicator;
        if (AuthService.isAuthenticated()) {
            userStatusIndicator = (
                <Menu.Menu position="right">
                    <Menu.Item as={Link} to="/profile">
                        <Icon name="user"/> { this.props.profile.firstName }
                    </Menu.Item>
                    <Dropdown item icon="setting">
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/profile">My Listings</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/logout">Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            );
        } 
        else {
            userStatusIndicator = (
                <Menu.Menu position="right">
                    <Menu.Item as={Link} to="/login">
                        Login
                    </Menu.Item>
                </Menu.Menu>
            );
        }

        return (
            <Menu fixed="top" borderless>
                <Menu.Item header>
                    <Link to="/">
                        <Header as="h3">Marketplace</Header>
                    </Link>
                </Menu.Item>
                { userStatusIndicator }
            </Menu>
        );
    }
}