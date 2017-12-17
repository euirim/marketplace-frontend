import React from "react";
import ReactDOM from "react-dom";
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from "semantic-ui-react"
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

import PrivateRoute from "shared/lib/PrivateRoute";
import AuthService from "services/api/auth.js";

import ListingCard from "components/ListingCard";
import ScrollToTop from "components/ScrollToTop";

import { Home } from "views/Home";
import ListingDetail from "views/ListingDetail";
import Login from "views/Login";

AuthService.fbSDKInitWrapper();

if (document.getElementById("app")) {
    ReactDOM.render(
        (
            <Router>
                <ScrollToTop>
                <div>
                    <Menu fixed="top" borderless>
                        <Menu.Item header>
                            <Link to="/">
                                <Header as="h2">Marketplace</Header>
                            </Link>
                        </Menu.Item>
                        <Menu.Item as={Link} to="/login" position="right">
                            Login
                        </Menu.Item>
                    </Menu>

                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/listings/:id" component={ListingDetail}/>
                </div>
                </ScrollToTop>
            </Router>
        ), 
        document.getElementById("app")
    );
}

// Load the FB SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));