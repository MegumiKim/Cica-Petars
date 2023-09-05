<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { BASE_URL } from '../../../API/constants';
	import Card from '../../../components/Card.svelte';
	import BackBtn from '../../../components/ui/BackBtn.svelte';
	import type {DrinkThumbType, IngredientType} from "../../../types"
	import Icon from '@iconify/svelte';

	const param = $page.url.searchParams.get('i');
	const URL_INGREDIENT = BASE_URL + `search.php?i=${param}`;
	const URL_DRINKS_BY_INGREDIENT = BASE_URL + `/filter.php?i=${param}`;

	let ingredient = {};
	let drinks: DrinkThumbType[] = [];

	async function getIngredient(url: string): Promise<IngredientType> {
		const result = await fetch(url);
		const json = await result.json();
		const data = json.ingredients[0];
return {
	name: data.strIngredient,
	id: data.idIngredient,
	description: data.strDescription,
	ABV: data.strAVB,
	type: data.strType
}
	}

	async function getDrinksByIngredient(url: string): Promise<void> {
		const result = await fetch(url);
		const json = await result.json();
		return json.drinks.map((drink) => {
			return {
				name: drink.strDrink,
				thumbUrl: drink.strDrinkThumb,
				id: drink.idDrink
			};
		});
	}

	onMount(async () => {
		ingredient = await getIngredient(URL_INGREDIENT);
		drinks = await getDrinksByIngredient(URL_DRINKS_BY_INGREDIENT);
		console.log(drinks);
		
		return () => {
			console.log('destroyed');
		};
	});
</script>

<div class="m-auto max-w-[1000px] justify-center p-3 sm:px-5">
<BackBtn />
	<div class="m-auto">
		<h1 class="text-center sm:text-5xl m-auto mb-5">{ingredient.name}</h1>
		<div class="md:flex align-middle max-w-full">
			<div class="mx-auto my-5 sm:flex gap-5">
				<img
					src="https://www.thecocktaildb.com/images/ingredients/{ingredient.name}-Medium.png"
					alt={ingredient.name}
					class="m-auto"
				/>
				<div class="">
					<p class="font-bold mb-4">ABV: {ingredient.ABV ? ingredient.ABV : 0} %</p>


					<p class="max-h-96 overflow-y-scroll">
						{ingredient.description ? ingredient.description : 'No description available'}
						<a target=”_blank” href={`https://en.wikipedia.org/wiki/${ingredient.name}` }
						class="hover:text-yellow-500 cursor-pointer underline block mt-4">Jump to Wikipedia <Icon icon="tdesign:jump" class="inline-block" /></a>
					</p>
				</div>
			</div>
		</div>
		<div class="m-auto">
			{#if drinks.length}
				<div class="container m-auto">
					<h2 class="text-2xl italic">
						Recipe with {ingredient.name} : {drinks.length} drinks
					</h2>
					<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
						{#each drinks as drink}
							<Card {drink} />
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
