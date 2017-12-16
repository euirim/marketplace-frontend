import React from "react";
import ReactDOM from "react-dom";
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from "semantic-ui-react"
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

import ListingCard from "components/ListingCard";
import ScrollToTop from "components/ScrollToTop";

import { Home } from "views/Home";
import ListingDetail from "views/ListingDetail";

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
                        <Menu.Item as={ Link } to="/login" position="right">
                            Login
                        </Menu.Item>
                    </Menu>

                    <Route exact path="/" component={Home}/>
                    <Route path="/listings/:id" component={ListingDetail}/>
                </div>
                </ScrollToTop>
            </Router>
        ), 
        document.getElementById("app")
    );
}
else if (document.getElementById("app-login")) {
    ReactDOM.render(
        (
            <div>
                <Menu fixed="top" borderless>
                    <Menu.Item header>
                        <Header as="h2">Marketplace</Header>
                    </Menu.Item>
                    <Menu.Item position="right">
                        Login
                    </Menu.Item>
                </Menu>
            </div>
        ), 
        document.getElementById("app-login")
    );
}