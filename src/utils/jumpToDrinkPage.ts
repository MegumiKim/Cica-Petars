import { goto } from '$app/navigation';
import { fetchNewDrink } from '../API/API';
import { BASE_URL } from '../API/constants';
import { SingleDrink } from '../drinkStore';
import type { DrinkType } from '../types';

export default async function jump(id: string) {
	const newDrink: DrinkType = await fetchNewDrink(`${BASE_URL}lookup.php?i=${id}`);
	SingleDrink.set(newDrink);
	goto(`/drink/[slug]/?id=${id}`);
}
