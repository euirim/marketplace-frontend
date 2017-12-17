import React from "react";
import ReactDOM from "react-dom";
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from "semantic-ui-react";
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
import Logout from "views/Logout";


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
                <Route exact path="/logout" component={Logout}/>
                <PrivateRoute path="/listings/:id" component={ListingDetail}/>
            </div>
            </ScrollToTop>
        </Router>
    ), 
    document.getElementById("app")
);