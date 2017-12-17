import React from "react";
import ReactDOM from "react-dom";
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from "semantic-ui-react"
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

import AuthService from "services/api/auth.js";

import ListingCard from "components/ListingCard";
import ScrollToTop from "components/ScrollToTop";

import { Home } from "views/Home";
import ListingDetail from "views/ListingDetail";

window.fbAsyncInit = function() {
    FB.init({
      appId      : "175852563003044",
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : "v2.11" // use graph api version 2.8
    });

    FB.Event.subscribe('auth.login', AuthService.checkLogin);
};

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
                        <Menu.Item as="a" href="/login" position="right">
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
    // redirect to homepage if not logged in
    AuthService.getLoginStatus().then(res => {
        if (res.is_logged_in === true) {
            window.location.replace("/");
        }
    });

    ReactDOM.render(
        (
            <div>
            <Router>
                <ScrollToTop>
                <Menu fixed="top" borderless>
                    <Menu.Item header>
                        <Header as="h2">Marketplace</Header>
                    </Menu.Item>
                </Menu>
                <p>Hello</p>
                <p>Hello</p>
                <div 
                    className="fb-login-button" 
                    data-max-rows="1" 
                    data-size="large" 
                    data-button-type="continue_with" 
                    data-show-faces="false" 
                    data-auto-logout-link="false" 
                    data-use-continue-as="false"
                    >
                </div>
                </ScrollToTop>
            </Router>
            </div>
        ), 
        document.getElementById("app-login")
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