function recordPageVisit() {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '175852563003044',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.11'
        });
        
        FB.AppEvents.logPageView();   
    }
}