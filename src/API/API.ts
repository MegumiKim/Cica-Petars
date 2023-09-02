// simulate endpoint

import type { DrinkType } from '../types';
import { filterIngredients } from '../utils/ingredientsFilter';

export async function fetchNewDrink(URL: string): Promise<DrinkType | undefined> {
	const result = await fetch(URL);
	const json = await result.json();

	if (json) {
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
		console.log('no such drink');
		return undefined;
	}
}

// export async function fetchDrink(URL: string): Promise<DrinkType | undefined> {
// 	try {
// 		const result = await (await fetch(URL)).json();
// 		const currentDrink = result.drinks[0];

// 		if (!result || !result.drinks || result.drinks.length === 0) {
// 			console.error('Invalid API response');
// 			return undefined;
// 		}

// 		const ingredients = filterIngredients(currentDrink);
// 		console.log(currentDrink);

// 		return {
// 			name: currentDrink.strDrink,
// 			category: currentDrink.strCategory,
// 			glass: currentDrink.strGlass,
// 			instructions: currentDrink.strInstructions,
// 			ingredients,
// 			thumbUrl: currentDrink.strDrinkThumb,
// 			id: currentDrink.idDrink
// 		};
// 	} catch (error) {
// 		console.error('Error fetching drink:', error);
// 		return undefined;
// 	}
// }
