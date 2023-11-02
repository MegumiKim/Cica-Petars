export type BasicIngredientType = {
	name: string;
	amount: string;
};

export type IngredientType = {
	name: string;
	id: string;
	description: [];
	ABV: string;
	type: string;
	alcohol: string;
};

export interface DrinkThumbType {
	name: string | undefined;
	thumbUrl: string | undefined;
	id: string | undefined;
}

export interface DrinkThumbType_copy {
	idDrink: string;
	strDrinkThumb: string;
	strDrink: string;
}
export interface DrinkType extends DrinkThumbType {
	category: string;
	glass: string;
	instructions: string;
	ingredients: BasicIngredientType[];
}
