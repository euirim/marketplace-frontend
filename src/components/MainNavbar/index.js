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
import LogoutConfirmModal from "components/LogoutConfirmModal";

export default class MainNavbar extends React.Component {
    render() {
        var userStatusIndicator;
        if (AuthService.isAuthenticated()) {
            userStatusIndicator = (
                <Menu.Menu position="right" id="mainNavbar">
                    <Menu.Item as={Link} to="/profile">
                        <Icon name="user"/> { this.props.profile.firstName }
                    </Menu.Item>
                    <Dropdown item icon="setting">
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/profile">MY LISTINGS</Dropdown.Item>
                            <LogoutConfirmModal>
                                <Dropdown.Item>LOG OUT</Dropdown.Item>
                            </LogoutConfirmModal>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            );
        } 
        else {
            userStatusIndicator = (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button as={Link} to="/login" basic>LOG IN</Button>
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