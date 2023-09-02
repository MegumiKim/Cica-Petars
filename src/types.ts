export type IngredientType = {
	name: string;
	amount: string;
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
	ingredients: IngredientType[];
}
