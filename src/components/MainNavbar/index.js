import React from "react";

import {
    Link
} from "react-router-dom";

import { 
    Menu, 
    Header, 
    Dropdown, 
    Icon,
    Button
} from "semantic-ui-react";
import AuthService from "services/api/auth.js";
import URLService from "services/urls/index.js";

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
                            <Dropdown.Item as={Link} to="/profile">MY LISTINGS</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/logout">LOG OUT</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            );
        } 
        else {
            userStatusIndicator = (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button as={Link} to="/login" basic>LOGIN</Button>
                    </Menu.Item>
                </Menu.Menu>
            );
        }

        return (
            <Menu fixed="top" size="small" borderless>
                <Menu.Item as={Link} to="/">
                    <img src={URLService.genStaticURL("/images/logo.svg")} />
                </Menu.Item>
                { userStatusIndicator }
            </Menu>
        );
    }
}