import type { DrinkType, IngredientType } from '../types';

export function filterIngredients(data: DrinkType): IngredientType[] {
	const ingredients = [...Array(15)]
		.map((_value, i) => ({
			name: data[`strIngredient${i + 1}`],
			amount: data[`strMeasure${i + 1}`]
		}))
		.filter((ingredient) => ingredient.name);

	return ingredients;
}
