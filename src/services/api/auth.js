/**
 * Social authentication helpers for Maroon Marketplace.
 */

import Cookies from "js-cookie";
import request from "shared/lib/request";
import URLService from "services/urls"

// handles response from Facebook SDK
function statusChangeCallback(response) {
    // process response from facebook
    if (response.status === "connected") {
        // Logged into your app and Facebook.
        // POST API call to rest-auth
        var msg = {
            url: URLService.genSiteURL("/rest-auth/facebook/"),
            method: "POST", 
            data: {
                access_token: response.authResponse.accessToken,
                code: response.authResponse.userID 
            }
        };    

        request(msg)
            .then(res => {
                // set cookie indicating logged in
                Cookies.remove("authName");
                Cookies.set("authName", undefined, {expires: 14});

                getLoginStatus()
                    .then(res => {
                        var cookie = {
                            "firstName": res.firstName,
                            "lastName": res.lastName
                        };
                        Cookies.set("authName", cookie, {expires: 14});
                        window.location.replace("/"); // home page
                    });
            })
            .catch(res => {
                console.log("POST request for auth failed.");
            });
    } 

    // window.location.replace("/login"); // something went wrong (refresh)

    return null;
}

// check whether user is logged in through FB API
// (check after login using button)
function checkLogin() { 
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function getLoginStatus() {
    var response = request({
        url: URLService.genSiteURL("/rest-auth/status"),
        method: "GET",
    })

    return response;
}

function logout() {
    var msg = {
        url: URLService.genSiteURL("/rest-auth/logout/"),
        method: "POST",
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
        },
    };

    request(msg)
        .then(res => {
            console.log(res);

            if (res.detail === "Successfully logged out.") {
                alert("Logged out!");
                Cookies.remove("authName");
            }
            else {
                alert("Logout failed");
            }
        });
    return;
}

// wrapper for FB SDK init
function fbSDKInitWrapper() {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : FB_APP_ID,
            cookie     : true,
            xfbml      : true,
            version    : 'v2.11'
        });
        
        FB.AppEvents.logPageView();   

        FB.Event.subscribe('auth.login', checkLogin);
    }
}

function handleClick() {
        FB.init({
            appId      : FB_APP_ID,
            cookie     : true,
            xfbml      : true,
            version    : 'v2.11'
        });

        FB.login(res => {
            if (res.authResponse) {
                checkLogin();
            }
        }, {scope: 'email,public_profile'});
}

// checks for authentication cookie. Should only be used
// for rendering use, not data flow.
// returns tuple, with first element being whether user
// is authenticated.
function isAuthenticated() {
    var cookie = Cookies.get("authName");

    if (cookie) {
        return true;
    }
    else {
        return false;
    }
}

function getUserName() {
    return Cookies.getJSON("authName");
}

const AuthService = {
    checkLogin, 
    getLoginStatus,
    logout,
    fbSDKInitWrapper,
    handleClick,
    isAuthenticated,
    getUserName
};

export default AuthService;