function recordPageVisit() {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : FB_APP_ID,
            cookie     : true,
            xfbml      : true,
            version    : 'v2.11'
        });
        
        FB.AppEvents.logPageView();   
    }
}