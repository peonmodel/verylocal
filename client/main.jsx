import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Sidebar, Segment, Menu, Header, Icon } from 'semantic-ui-react';

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
		return (
			<div>
				<Segment inverted attached="top">
        <Header as='h4' inverted color='grey' onClick={this.toggleVisibility.bind(this)}>Menu</Header>
				</Segment>
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
            <Menu.Item as={Link} name='camera' to="/others">
              <Icon name='camera' />
              Others
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
		);
	}
}

class Home extends Component {
	render() { return (<div style={{height: 500}}>Home</div>) }
}

class About extends Component {
	render() { return (<div style={{height: 500}}>About</div>) }
}

const renderRoutes = () => (
	<Router>
		<NavigationBar>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
		</NavigationBar>
  </Router>
);

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('render-target'));
});
