/**
 * Social authentication helpers for Maroon Marketplace.
 */

import Cookies from "js-cookie";
import request from "shared/lib/request";

// handles response from Facebook SDK
function statusChangeCallback(response) {
    // process response from facebook
    if (response.status === "connected") {
        // Logged into your app and Facebook.
        // POST API call to rest-auth
        var msg = {
            url: "/rest-auth/facebook/",
            method: "POST", 
            data: {
                access_token: response.authResponse.accessToken,
                code: response.authResponse.userID 
            }
        };    

        request(msg)
            .then(res => {
                // set cookie indicating logged in
                Cookies.remove("is_authenticated");
                Cookies.set("is_authenticated:", true, {expires: 14});

                window.location.replace("/"); // home page
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
        url: "/rest-auth/status",
        method: "GET",
    })

    return response;
}

function logout() {
    var msg = {
        url: "/rest-auth/logout/",
        method: "POST"
    };

    request(msg)
        .then(res => {
            if (res.data.detail === "Successfully logged out.") {
                alert("Logged out!");
            }
            else {
                alert("Logout failed");
            }
        });

    Cookies.remove("is_authenticated");
    return;
}

// wrapper for FB SDK init
function fbSDKInitWrapper() {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '175852563003044',
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
            appId      : '175852563003044',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.11'
        });

        FB.login(res => {
            if (res.authResponse) {
                checkLogin();
            }
        });
}

// checks for authentication cookie. Should only be used
// for rendering use, not data flow.
function isAuthenticated() {
    var cookie = Cookies.get("is_authenticated");

    if (cookie) {
        return cookie;
    }
    else {
        return false;
    }
}

const AuthService = {
    checkLogin, 
    getLoginStatus,
    logout,
    fbSDKInitWrapper,
    handleClick,
    isAuthenticated
};

export default AuthService;