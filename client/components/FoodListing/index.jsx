import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import './styles.css';

// breakpoint at 350, smaller image

class FoodCard extends Component {
	render() {
		const food = this.props.food;
		return (
			<Card>
				<Image src='' width={500} height={200} maxWidth='100%'/>
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

export class FoodListing extends Component {
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
						<FoodCard key={food._id} food={food} />
					);
				})}
			</Card.Group>
		);
	}
}
