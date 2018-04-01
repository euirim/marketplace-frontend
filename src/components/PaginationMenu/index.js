import React from "react";
import { Link } from "react-router-dom";

import { Pagination } from "semantic-ui-react";

export default class PaginationMenu extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Pagination 
                activePage={this.props.activePage}
                totalPages={this.props.totalPages} 
                onPageChange={this.props.onPageChange} />
        );
    }
};
