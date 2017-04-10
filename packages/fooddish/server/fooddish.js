// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export class FoodDish {
	constructor(item) {
		Object.assign(this, item);
	}
}

FoodDish.prefix = `verylocal:foodmenu`;
FoodDish.collectionName = `verylocal:foodmenu-Collection`;
FoodDish.collection = new Mongo.Collection(FoodDish.collectionName, {
	transform: function(item) {
		return new FoodDish(item);
	},
	defineMutationMethods: false,
});
FoodDish.collection._ensureIndex({ expiredAt: 1 }, { expireAfterSeconds: 3600 });
