import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { LoginModal } from '../login.jsx';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Menu, Container, Icon } from 'semantic-ui-react';
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
			<div>
				<Sidebar.Pushable as={Segment} style={{ minHeight: '100vh', overflow: 'hidden' }}>
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
            <Sidebar.Pushable as={Segment} attached >
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
								<Container style={{padding: 5, marginTop: 15, minHeight: '90vh', marginBottom: 45}}>
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

export const SmartNavigationBar = reactify(reactiveMapper)(NavigationBar);
