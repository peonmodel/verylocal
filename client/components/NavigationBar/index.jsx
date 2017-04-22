import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { LoginModal } from '../login.jsx';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Header, Menu, Container, Icon } from 'semantic-ui-react';
import { reactify } from 'meteor/verylocal:reactify';
import './styles.css';

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
			<div style={{ position: 'fixed', top: 0, width: '100%' }}>
				<Menu attached='top'>
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
				</Menu>

				<Segment as={Sidebar.Pushable} style={{position: 'fixed', top: 40, transform: 'none'}}>
					<Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted style={{position: 'fixed', top: 40}}>
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
						<div style={{minHeight: '100vh', width: '100vw', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginBottom: 75}}>
							{this.props.children}
						</div>
					</Sidebar.Pusher>
				</Segment>
      </div>
		);
	}
}

function reactiveMapper(props, onData) {
	onData(null, { user: Meteor.user() });
}

export const SmartNavigationBar = reactify(reactiveMapper)(NavigationBar);
