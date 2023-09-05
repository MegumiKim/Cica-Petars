// simulate endpoint

import type { DrinkType } from '../types';
import { filterIngredients } from '../utils/ingredientsFilter';

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
