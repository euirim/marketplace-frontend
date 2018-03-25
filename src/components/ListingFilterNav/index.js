import React from "react";

import { 
    Header, 
    Grid, 
    Menu, 
    Icon,
    Dropdown,
    Responsive,
    Input,
    Transition
} from "semantic-ui-react";

export default class ListingFilterNav extends React.Component {
    constructor(props) {
        super(props);
        
        this._handleSearchClick = this._handleSearchClick.bind(this);
        this._handleSearchKeyPress = this._handleSearchKeyPress.bind(this);

        this.state = {
            expandSearch: false
        };
    }

    componentDidMount() {
    }

    _handleSearchClick() {
        this.setState({
            expandSearch: true
        });
    }

    _handleSearchKeyPress(e) {
        // Don't want to be wasteful by searching null
        if (e.key === "Enter") {
            this.props.onSearch(e.target.value);
        }
    }    

    render() {
        var categories = [];
        var mobile_categories = [];

        // expanded search bar
        const search_expanded = (
            <Transition 
                visible={this.state.expandSearch} 
                animation="fade left" 
                duration={500}>

                <Input icon placeholder="Search...">
                    <input onKeyPress={this._handleSearchKeyPress} />
                    <Icon name="search" />
                </Input>
            </Transition>
        );

        // search icon
        const search_icon = (
            <Icon 
                link
                name="search"
                onClick={this._handleSearchClick} />
        );

        // search component
        const search = this.state.expandSearch ? null : search_icon;

        for (let i = 0; i < this.props.categories.length; i++) {
            let category = this.props.categories[i];

            categories.push(
                <Responsive 
                    minWidth={Responsive.onlyTablet.minWidth}
                    as={Menu.Item}
                    key={ category.id } 
                    active={ category.id === this.props.activeCategory }
                    onClick={ () => this.props.handler(category.id) }>
                    { category.name.toUpperCase() }
                </Responsive>
            );
            mobile_categories.push(
                <Dropdown.Item
                    key={ category.id } 
                    active={ category.id === this.props.activeCategory }
                    onClick={ () => this.props.handler(category.id) }>
                    { category.name.toUpperCase() }
                </Dropdown.Item>
            );
        }

        return (
            <Menu text className="listing-filter-nav">
                <Responsive 
                    as={Menu.Item}
                    minWidth={Responsive.onlyTablet.minWidth}
                    active={ this.props.activeCategory === null}
                    onClick={() => this.props.handler(null)}>

                    ALL
                </Responsive>

                { categories }

                <Responsive {...Responsive.onlyMobile}>
                    <Menu.Item>
                        <Dropdown text="CATEGORIES">

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    active={ this.props.activeCategory === null }
                                    onClick={ () => this.props.handler(null) }>
                                    ALL
                                </Dropdown.Item>

                                {mobile_categories}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Responsive>

                <Menu.Menu position="right">
                    <Menu.Item name="Filter"><Icon disabled name="sort content descending" /></Menu.Item> 
                    <Menu.Item name="Search">
                        { search }
                        { search_expanded }
                    </Menu.Item> 
                </Menu.Menu>
            </Menu>
        );
    }
};