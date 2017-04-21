import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import { GlobalMessage } from './components/globalmessage.jsx';
import { SmartNavigationBar } from './components/NavigationBar/index.jsx';


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
