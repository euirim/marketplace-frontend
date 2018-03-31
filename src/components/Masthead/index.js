import React from "react";
import { Link } from "react-router-dom";
import { 
    Container, 
    Header, 
    Grid, 
    Menu, 
    Icon,
    Input,
    Form,
    Dropdown,
    Button
} from "semantic-ui-react";

import URLService from "services/urls";
import CategoryService from "services/api/category.js";

const categoryOptions = [
    {
        text: "For sale",
        value: 1
    },
    {
        text: "Services",
        value: 2
    },
];

export default class Masthead extends React.Component {
    constructor(props) {
        super(props);

        this._handleSearchKeyPress = this._handleSearchKeyPress.bind(this);

        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        CategoryService.get_all()
            .then(res => {

                var categories = [{
                    text: "All",
                    value: 0
                }];

                // format response to options for dropdown
                for (let i=0; i < res.length; i++) {
                    categories.push({
                        text: res[i].name,
                        value: res[i].id
                    });
                }

                this.setState({
                    categories: categories
                });
            });
    }

    _handleSearchKeyPress(e) {
        // Don't want to be wasteful by searching null
        if (e.key === "Enter") {
            this.props.onSearch(e.target.value);
        }
    }    

    render() {
        const bgImageURL = URLService.genStaticURL("/images/shattered.png");

        return (
            <Container fluid className="masthead" style={{ backgroundImage:`url(${bgImageURL})`}}>
                <Container>
                    <Grid stackable>
                        <Grid.Row centered>
                            <Grid.Column width={16}>
                                <Header as="h1">
                                    <span className="masthead-header">
                                        Buy and sell to Hyde Park and beyond.
                                    </span>
                                </Header>
                            </Grid.Column>

                            <Grid.Column width={16}>
                                <Form className="masthead-form">
                                    <Form.Group>
                                        <Form.Field style={{width: "100%"}}>
                                            <Input 
                                                size="big" 
                                                icon 
                                                placeholder="Search">

                                                <input onKeyPress={this._handleSearchKeyPress} />
                                                <Icon name="search" />
                                            </Input>
                                        </Form.Field>

                                        <Form.Field>
                                            <Dropdown 
                                                placeholder="Category" 
                                                size="big" 
                                                options={this.state.categories} 
                                                onChange={(e, d) => {
                                                    this.props.onCategoryUpdate(d.value);
                                                }} 
                                                selection />
                                        </Form.Field>

                                        <Form.Field>
                                            <Button 
                                                size="big" 
                                                as={Link} 
                                                to="/listings/add" 
                                                content="POST" 
                                                positive />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Container>
        );
    }
};