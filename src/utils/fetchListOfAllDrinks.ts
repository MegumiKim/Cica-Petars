import { allDrinks } from '../drinkStore';

export async function fetchListOfDrinks(URL: string) {
	try {
		const result = await fetch(URL);
		const json = await result.json();

		if (!result) {
			console.log('no drinks found');
			return [];
			// Show Error message
		}
		const drinks = json.drinks.map((drink) => {
			return {
				name: drink.strDrink,
				thumbUrl: drink.strDrinkThumb,
				id: drink.idDrink
			};
		});
		// allDrinks.update((state) => drinks);

		return drinks;
	} catch (e) {
		console.log('error in fetching drinks', e);
		return [];
		// Show Error message
	}
}
