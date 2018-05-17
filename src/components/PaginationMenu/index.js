import React from "react";
import { Link } from "react-router-dom";

import { Pagination } from "semantic-ui-react";

export default class PaginationMenu extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        if (document.body.clientWidth > 1000) {
            return (
                <Pagination 
                    activePage={this.props.activePage}
                    totalPages={this.props.totalPages} 
                    onPageChange={this.props.onPageChange} />
            );
        }
        else {
            return (
                <Pagination
		    activePage={this.props.activePage}
		    totalPages={this.props.totalPages}
		    onPageChange={this.props.onPageChange}
                    ellipsisItem={null}
		    prevItem={null}
		    nextItem={null}
                    boundaryRange ="0"
		    siblingRange ="1" />
            );
        }
    }
};
