import React from "react";
import ReactDOM from "react-dom";
import { 
    Button, 
    Container, 
    Divider, 
    Grid, 
    Header, 
    Image, 
    Menu, 
    Segment 
} from "semantic-ui-react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import PrivateRoute from "shared/lib/PrivateRoute";
import AuthService from "services/api/auth.js";

import ListingCard from "components/ListingCard";
import ScrollToTop from "components/ScrollToTop";
import MainNavbar from "components/MainNavbar";
import Footer from "components/Footer";

import Home from "views/Home";
import ListingDetail from "views/ListingDetail";
import Login from "views/Login";
import Logout from "views/Logout";
import Profile from "views/Profile";
import AddListing from "views/AddListing";
import FourOhFour from "views/FourOhFour";


ReactDOM.render(
    (
        <Router>
            <ScrollToTop>
            <div>
                <MainNavbar 
                    isAuthenticated={AuthService.isAuthenticated()}
                    profile={AuthService.getUserName()}>
                </MainNavbar>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/logout" component={Logout}/>
                    <PrivateRoute exact path="/listings/add" component={AddListing}/>
                    <PrivateRoute path="/listings/:id" component={ListingDetail}/>
                    <PrivateRoute exact path="/profile" component={Profile}/>

                    <Route component={FourOhFour}/>
                </Switch>

                <Footer />
            </div>
            </ScrollToTop>
        </Router>
    ), 
    document.getElementById("app")
);