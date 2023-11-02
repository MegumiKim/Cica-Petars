import type { DrinkType, IngredientType, DrinkThumbType_copy } from '../types';
import { filterIngredients } from '../utils/ingredientsFilter';

// Fetch data for specific drink page
export async function fetchNewDrink(URL: string): Promise<DrinkType> {
	const result = await fetch(URL);
	const json = await result.json();

	if (json.drinks) {
		const currentDrink = json.drinks[0];
		const ingredients = filterIngredients(currentDrink);
		const newDrink: DrinkType = {
			name: currentDrink.strDrink,
			glass: currentDrink.strGlass,
			category: currentDrink.strCategory,
			instructions: currentDrink.strInstructions,
			ingredients,
			thumbUrl: currentDrink.strDrinkThumb,
			id: currentDrink.idDrink
		};
		return newDrink;
	} else {
		throw new Error('no result');
	}
}

// Fetch data for specific ingredient page
export async function fetchIngredient(url: string): Promise<IngredientType> {
	const result = await fetch(url);
	const json = await result.json();
	const data = json.ingredients[0];

	if (data) {
		return {
			name: data.strIngredient,
			id: data.idIngredient,
			description: data.strDescription ? data.strDescription.split('\n') : [],
			ABV: data.strABV,
			type: data.strType,
			alcohol: data.strAlcohol
		};
	} else {
		throw new Error();
	}
}

// // Fetch drinks using specific ingredient
export async function fetchDrinksByIngredient(url: string): Promise<void> {
	const result = await fetch(url);
	const json = await result.json();

	if (json.drinks) {
		return json.drinks.map((drink: DrinkThumbType_copy) => {
			return {
				name: drink.strDrink,
				thumbUrl: drink.strDrinkThumb,
				id: drink.idDrink
			};
		});
	} else {
		throw new Error('no result');
	}
}
