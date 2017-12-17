import React from "react";
import { Redirect } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            redirectToReferrer: false
        };
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;
        
        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            );
        }
        
        return (
            <div>
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
            </div>
        )
    }
}
