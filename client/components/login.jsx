import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Icon, Button, Modal, Header, Grid, Form } from 'semantic-ui-react';
// import { GlobalMessage } from './components/globalmessage.jsx';

export class LoginModal extends Component {
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
		// GlobalMessage.setMessage({ message: 'test' })
		this.setState({ modalOpen: !this.state.modalOpen, selected: 'back' });
	}

	handleLogin() {

	}

	handleLogout() {}

	handleRegister() {}

	render() {
		const user = Meteor.user();

		if (user) {
			// logout
			return (
				<Modal size="small" trigger={this.props.trigger} open={this.state.modalOpen} closeIcon='close' onClose={this.toggleModal.bind(this)} onOpen={this.toggleModal.bind(this)}>
					<Header icon='user' content='Logout' />
					<Modal.Content>
						Logout?
					</Modal.Content>
					<Modal.Actions>
						<Button basic color='green' name="mainaction" onClick={this.handleLogout.bind(this)}>Logout</Button>
						<Button basic color='red' name="back" onClick={this.handleSelect.bind(this)}>
							<Icon name='remove' /> Back
						</Button>
					</Modal.Actions>
				</Modal>
			);
		}

		// else check choices
		if (this.state.selected !== 'login' && this.state.selected !== 'register') {
			return (
				<Modal size="small" trigger={this.props.trigger} open={this.state.modalOpen} closeIcon='close' onClose={this.toggleModal.bind(this)} onOpen={this.toggleModal.bind(this)}>
					<Header icon='user' content='Login/Register' />
					<Modal.Content>
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
					</Modal.Content>
					<Modal.Actions>
						<Button basic color='red' name="back" onClick={this.handleSelect.bind(this)}>
							<Icon name='remove' /> Back
						</Button>
					</Modal.Actions>
				</Modal>
			);
		}

		if (this.state.selected === 'login') {
			return (
				<Modal size="small" trigger={this.props.trigger} open={this.state.modalOpen} closeIcon='close' onClose={this.toggleModal.bind(this)} onOpen={this.toggleModal.bind(this)}>
					<Header icon='user' content='Login' />
					<Modal.Content>
						<Form>
							<Form.Input name='username' label='Username' placeholder='Enter username' />
							<Form.Input name='password' label='Password' type='password' placeholder='Enter password' />
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button type="submit" basic color='green' name="mainaction" onClick={this.handleLogin.bind(this)}>Login</Button>
						<Button basic color='red' name="back" onClick={this.handleSelect.bind(this)}>
							<Icon name='remove' /> Back
						</Button>
					</Modal.Actions>
				</Modal>
			);
		}

		if (this.state.selected === 'register') {
			return (
				<Modal size="small" trigger={this.props.trigger} open={this.state.modalOpen} closeIcon='close' onClose={this.toggleModal.bind(this)} onOpen={this.toggleModal.bind(this)}>
					<Header icon='user' content='Register' />
					<Modal.Content>
						<Form>
							<Form.Input name='username' label='Username' placeholder='Enter username' />
							<Form.Input name='email' label='Email address' placeholder='Enter email address' />
							<Form.Input name='password' label='Password' type='password' placeholder='Enter password' />
							<Form.Input name='passwordConfirmation' label='Confirm password' type='password' placeholder='Enter password again' />
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button basic color='green' name="mainaction" onClick={this.handleRegister.bind(this)}>Register</Button>
						<Button basic color='red' name="back" onClick={this.handleSelect.bind(this)}>
							<Icon name='remove' /> Back
						</Button>
					</Modal.Actions>
				</Modal>
			);
		}
	}
}
