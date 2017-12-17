/**
 * Social authentication helpers for Maroon Marketplace.
 */

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
    return;
}

// wrapper for FB SDK init
function fbSDKInitWrapper() {
    FB.init({
        appId      : '175852563003044',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.11'
    });
    
    FB.AppEvents.logPageView();   
}

const AuthService = {
    checkLogin, 
    getLoginStatus,
    logout,
    fbSDKInitWrapper
};

export default AuthService;