import React from "react";

import { 
    Header, 
    Grid, 
    Menu, 
    Icon 
} from "semantic-ui-react";

export default class ListingFilterNav extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        var categories = [];

        for (let i = 0; i < this.props.categories.length; i++) {
            let category = this.props.categories[i];

            categories.push(
                <Menu.Item 
                    as="a"
                    key={ category.id } 
                    active={ category.id === this.props.activeCategory }
                    onClick={ () => this.props.handler(category.id) }>
                    { category.name.toUpperCase() }
                </Menu.Item>
            );
        }

        return (
            <Menu text>
                <Menu.Item
                    active={ this.props.activeCategory === -1}
                    onClick={() => this.props.handler(-1)}>
                    ALL
                </Menu.Item>
                { categories }
                <Menu.Menu position="right">
                    <Menu.Item name="Filter">SORT</Menu.Item> 
                    <Menu.Item name="Search"><Icon name="search" /></Menu.Item> 
                </Menu.Menu>
            </Menu>
        );
    }
};