import React from "react";
import ReactDOM from "react-dom";
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from "semantic-ui-react"
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

import { ListingCard } from "./components/ListingCard";

import { Home } from "./views/Home";

ReactDOM.render(
    (
        <Router>
            <div>
                <Menu fixed="top" borderless>
                    <Menu.Item as="a" header>
                        <Header as="h2">Marketplace</Header>
                    </Menu.Item>
                    <Menu.Item as="a" position="right">Login</Menu.Item>
                </Menu>

                <Route exact path="/" component={Home}/>
            </div>
        </Router>
    ), 
    document.getElementById('app')
);