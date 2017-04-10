export const FoodDishSchema = {
	_id: String,
	stallId: String,
	data: Object,
	options: Object,  // less spice, more stuff etc
	ingredients: Object,
	dateModified: Date,
	dateCreated: Date,
};
