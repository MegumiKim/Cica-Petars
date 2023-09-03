export type BasicIngredientType = {
	name: string;
	amount: string;
};

export type IngredientType = {
	name: string;
	id: string;
	description: string;
	ABV: string;
	type: string;
};

export interface DrinkThumbType {
	name: string;
	thumbUrl: string;
	id: string;
}

export interface DrinkType extends DrinkThumbType {
	category: string;
	glass: string;
	instructions: string;
	ingredients: BasicIngredientType[];
}
