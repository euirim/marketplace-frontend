import React from "react";

import { Redirect } from "react-router-dom";

export default class Empty extends React.Component{
    constructor(props) {
        super(props);

        props.history.push({
            pathname: props.location.state.redirectTo,
            state: {key: Date.now()}
        });

        this.state = {};
    }

    render() {
        return (
            null
        );
    }
};