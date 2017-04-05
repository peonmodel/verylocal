import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Sidebar, Segment, Menu, Container, Icon, Card, Image, Button, Modal, Header, Grid } from 'semantic-ui-react';
import { GlobalMessage } from './components/globalmessage.jsx';

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
			<Card.Group style={{ minHeight: 500 }}>
				{fooditems.map(food => {
					return (
						<FoodTile key={food._id} food={food} />
					);
				})}
			</Card.Group>
		);
	}
}

class LoginModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'back', // 'login', 'register', 'logout'
			modalOpen: !!props.user,
		};
	}

	handleSelect(event, element) {
		// if already logged in, the back button close modal
		if (Meteor.user()) { return this.toggleModal(); }
		// if already in the back screen and press back again, close modal
		if (this.state.selected === 'back' && element.name === 'back') { return this.toggleModal(); }
		this.setState({ selected: element.name });
	}

	toggleModal() {
		GlobalMessage.setMessage({ message: 'test' })
		this.setState({ modalOpen: !this.state.modalOpen, selected: 'back' });
	}

	render() {
		const user = Meteor.user();
		const choices = {
			back: (
				<Grid columns={2} divided>
					<Grid.Row>
						<Grid.Column>
							<Header size="tiny">Login</Header>
							<Button size="tiny" name="login" onClick={this.handleSelect.bind(this)}>Login</Button>
						</Grid.Column>
						<Grid.Column>
							<Header size="tiny">Register</Header>
							<Button size="tiny" name="register" onClick={this.handleSelect.bind(this)}>Register</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			),
			login: (
				<div>login</div>
			),
			register: (
				<div>register</div>
			),
			logout: (
				<div>logout</div>
			),
		};
		return (
			<Modal size="small" trigger={this.props.trigger} open={this.state.modalOpen} closeIcon='close' onClose={this.toggleModal.bind(this)} onOpen={this.toggleModal.bind(this)}>
				<Header icon='user' content='Test Guest' />
				<Modal.Content>
					{ user ? choices.logout : choices[this.state.selected] }
				</Modal.Content>
				<Modal.Actions>
					<Button basic color='red' name="back" onClick={this.handleSelect.bind(this)}>
						<Icon name='remove' /> Back
					</Button>
				</Modal.Actions>
			</Modal>
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
		const user = Meteor.user();
		return (
			<Container>
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
            <Sidebar.Pushable as={Segment} attached>
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
								<Container style={{ minHeight: 500 }}>
									{this.props.children}
								</Container>
							</Sidebar.Pusher>
						</Sidebar.Pushable>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
		);
	}
}

class Home extends Component {
	render() { return (<div style={{minHeight: 500}}>Home</div>); }
}

class About extends Component {
	render() { return (<div style={{minHeight: 500}}>About</div>); }
}

const renderRoutes = () => (
	<Router>
		<div>
		<NavigationBar>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route path="/food" component={FoodMenu} />
		</NavigationBar>
		<GlobalMessage.component />
		</div>
  </Router>
);

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('render-target'));
});
