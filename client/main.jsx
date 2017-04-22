import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalMessage } from './components/globalmessage.jsx';
import { SmartNavigationBar } from './components/NavigationBar/index.jsx';
import { FoodListing } from './components/FoodListing/index.jsx';

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
			<Route path="/food" component={FoodListing} />
		</SmartNavigationBar>
		<GlobalMessage.component />
		</div>
  </Router>
);

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('render-target'));
});
