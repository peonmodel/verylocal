// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export class FoodMenu {}

FoodMenu.prefix = `verylocal:foodmenu`;
FoodMenu.collectionName = `verylocal:foodmenu-Collection`;
FoodMenu.collection = new Mongo.Collection(FoodMenu.collectionName, {
	transform: function(item) {
		return new FoodMenu(item);
	},
	defineMutationMethods: false,
});
FoodMenu.collection._ensureIndex({ expiredAt: 1 }, { expireAfterSeconds: 3600 });
