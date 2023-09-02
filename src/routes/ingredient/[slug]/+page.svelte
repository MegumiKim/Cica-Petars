<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { BASE_URL } from '../../../API/constants';
	import Card from '../../../components/Card.svelte';
	import BackBtn from '../../../components/BackBtn.svelte';
	const param = $page.url.searchParams.get('i');
	const URL_INGREDIENT = BASE_URL + `search.php?i=${param}`;
	const URL_DRINKS_BY_INGREDIENT = BASE_URL + `/filter.php?i=${param}`;

	let ingredient = {};
	let drinks: [] = [];

	async function getIngredient(url: string): Promise<void> {
		const result = await fetch(url);
		const json = await result.json();
		ingredient = json.ingredients[0];
	}

	async function getDrinksByIngredient(url: string): Promise<void> {
		const result = await fetch(url);
		const json = await result.json();
		drinks = json.drinks.map((drink) => {
			return {
				name: drink.strDrink,
				thumbUrl: drink.strDrinkThumb,
				id: drink.idDrink
			};
		});
	}

	onMount(() => {
		getIngredient(URL_INGREDIENT);
		getDrinksByIngredient(URL_DRINKS_BY_INGREDIENT);
		return () => {
			console.log('destroyed');
		};
	});
</script>

<div class="m-auto max-w-[1000px] justify-center p-3 sm:px-5">
<BackBtn />
	<div class="m-auto">
		<h1 class="text-center sm:text-5xl m-auto mb-5">{ingredient.strIngredient}</h1>
		<div class="md:flex align-middle max-w-full">
			<div class="mx-auto my-5 sm:flex">
				<img
					src="https://www.thecocktaildb.com/images/ingredients/{ingredient.strIngredient}-Medium.png"
					alt={ingredient.strIngredient}
					class="m-auto"
				/>
				<div class="">
					<p class="font-bold mb-4">ABV: {ingredient.strABV ? ingredient.strABV : 0} %</p>
					<p class="max-h-96 overflow-y-scroll">
						{ingredient.strDescription ? ingredient.strDescription : 'No description available'}
					</p>
				</div>
			</div>
		</div>
		<div class="m-auto">
			{#if drinks.length}
				<div class="container m-auto">
					<h2 class="text-2xl italic">
						Recipe with {ingredient.strIngredient} : {drinks.length} drinks
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
