<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	import { BASE_URL } from '../../API/constants';
	import type { DrinkThumbType } from '../../types';

	//components
	import Form from './Form.svelte';
	import Card from '../../components/Card.svelte';
	import ServerError from '../../components/ui/serverError.svelte';
	import Loader from '../../components/ui/Loader.svelte';
	import { allDrinks } from '../../drinkStore';

	let category: string = '';
	let drinks: DrinkThumbType[] = [];
	let loading = true;
	let showError = false;

	onMount(async () => {
		await fetchListOfDrinks(`${BASE_URL}/filter.php?c=Ordinary_Drink`);
	});

	export async function fetchListOfDrinks(URL: string) {
		try {
			const result = await fetch(URL);
			const json = await result.json();

			drinks = json.drinks.map((drink: {}) => {
				return {
					name: drink.strDrink,
					thumbUrl: drink.strDrinkThumb,
					id: drink.idDrink
				};
			});

			allDrinks.set(drinks);
		} catch (e) {
			showError = true;
			console.log(e);
		} finally {
			loading = false;
		}
	}

	async function handleChange(event: Event) {
		const userSelect: string = event.currentTarget.value;
		category = userSelect.replaceAll('_', ' ');
		await fetchListOfDrinks(filteredURL(userSelect));
	}

	const filteredURL = (category: string) => {
		if (category === 'Non_Alcoholic') {
			return `${BASE_URL}/filter.php?a=${category}`;
		}
		return `${BASE_URL}/filter.php?c=${category}`;
	};
</script>

<div class="container m-auto max-w-[1000px] justify-center p-5">
	<h1 class="my-6">Categories</h1>
	<Form {handleChange} />
	{#if loading}
		<Loader />
	{/if}
	{#if drinks.length}
		<div class="container flex mt-8 gap-5">
			<h2>{category}</h2>
			<h2 class="">({drinks.length} drinks)</h2>
		</div>
		<div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
			{#each drinks as drink}
				<Card {drink} />
			{/each}
		</div>
	{/if}
	{#if showError}
		<ServerError />
	{/if}
</div>
