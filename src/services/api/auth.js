/**
 * Social authentication helpers for Maroon Marketplace.
 */

import request from "shared/lib/request";

// handles response from Facebook SDK
function statusChangeCallback(response) {
    // process response from facebook
    if (response.status === 'connected') {
        // Logged into your app and Facebook.

        // POST API call to rest-auth
        var from_rest_auth = request({
            url: "/rest-auth/facebook",
            method: "POST", 
            data: {
                access_token: response.authResponse.accessToken,
                code: response.authResponse.userID 
            }
        });    
    } else {
        // The person is not logged into your app or we are unable to tell.
    }

    // if call is successful, set cookie

    return null;
}

// check whether user is logged in through FB API
// (initial check)
function checkLogin() { 
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// check whether user is logged in (global state)
// for interface changes (does NOT control data flow)
function isLoggedIn() {
    return false;
}

function logout() {
    
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
    isLoggedIn,
    logout,
    fbSDKInitWrapper
};

export default AuthService;