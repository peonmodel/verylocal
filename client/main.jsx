import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Sidebar, Segment, Menu, Container, Icon, Card, Image, Button } from 'semantic-ui-react';
import { GlobalMessage } from './components/globalmessage.jsx';
import { LoginModal } from './components/login.jsx';
import { reactify } from 'meteor/verylocal:reactify';

class FoodTile extends Component {
	render() {
		const food = this.props.food;
		return (
			<Card>
				<Image src='' />
				<Card.Header>
					{food.name}
				</Card.Header>
				<Card.Meta>
					{food.type}
				</Card.Meta>
				<Card.Description>
					{food.description}
				</Card.Description>
				<Card.Content>
					<Button>B1</Button>
					<Button>B2</Button>
					<Button>More Details</Button>
				</Card.Content>
			</Card>
		);
	}
}

class FoodMenu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const fooditems = [
			{ _id: 'id1', name: 'food name1', type: 'food type', description: 'food description' },
			{ _id: 'id2', name: 'food name2', type: 'food type', description: 'food description' },
			{ _id: 'id3', name: 'food name3', type: 'food type', description: 'food description' },
			{ _id: 'id4', name: 'food name4', type: 'food type', description: 'food description' },
			{ _id: 'id5', name: 'food name5', type: 'food type', description: 'food description' },
			{ _id: 'id6', name: 'food name6', type: 'food type', description: 'food description' },
		];  // dummy array, should be from collection
		return (
			<Card.Group>
				{fooditems.map(food => {
					return (
						<FoodTile key={food._id} food={food} />
					);
				})}
			</Card.Group>
		);
	}
}


class NavigationBar extends Component {
	constructor(props) {
		super(props);
		this.state = { visible: false };
	}

	toggleVisibility() {
		this.setState({ visible: !this.state.visible });
	}

	// hover is not ideal since cant hover in touchscreen

	render() {
		const { visible } = this.state;
		const user = this.props.user;  // FIXME: this is not reactive, esp when already signed in at page load
		// FUTURE: Meteor.loggingIn() shows spinner icon instead of user
		return (
			<div style={{ height: window.innerHeight, width: window.innerWidth }}>
				<Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' direction='top' visible={true} inverted>
            <Menu.Item name='menu' onClick={this.toggleVisibility.bind(this)}>
              <Icon name='content' />
              Menu
            </Menu.Item>
						<Menu.Menu position='right'>
							<LoginModal trigger={
								<Menu.Item name='user'>
									<Icon name='user' disabled={!user} />
									{user ? user.username : 'Sign in'}
								</Menu.Item>
							}/>
							<Menu.Item name='setting'>
								<Icon name='setting' />
								Setting
							</Menu.Item>
						</Menu.Menu>
          </Sidebar>
          <Sidebar.Pusher>
            <Sidebar.Pushable as={Segment} attached style={{ minHeight: 500 }}>
							<Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
								<Menu.Item as={Link} name='home' to="/">
									<Icon name='home' />
									Home
								</Menu.Item>
								<Menu.Item as={Link} name='gamepad' to="/about">
									<Icon name='gamepad' />
									About
								</Menu.Item>
								<Menu.Item as={Link} name='camera' to="/food">
									<Icon name='lemon' />
									Food
								</Menu.Item>
							</Sidebar>
							<Sidebar.Pusher>
								<Container style={{padding: 5}}>
									{this.props.children}
								</Container>
							</Sidebar.Pusher>
						</Sidebar.Pushable>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
		);
	}
}

function reactiveMapper(props, onData) {
	onData(null, { user: Meteor.user() });
}

const SmartNavigationBar = reactify(reactiveMapper)(NavigationBar);

class Home extends Component {
	render() { return (<div>Home</div>); }
}

class About extends Component {
	render() { return (<div>About</div>); }
}

const renderRoutes = () => (
	<Router>
		<div>
		<SmartNavigationBar>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route path="/food" component={FoodMenu} />
		</SmartNavigationBar>
		<GlobalMessage.component />
		</div>
  </Router>
);

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('render-target'));
});
