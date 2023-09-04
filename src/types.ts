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
	name: string | undefined;
	thumbUrl: string | undefined;
	id: string | undefined;
}

export interface DrinkType extends DrinkThumbType {
	category: string;
	glass: string;
	instructions: string;
	ingredients: BasicIngredientType[];
}
