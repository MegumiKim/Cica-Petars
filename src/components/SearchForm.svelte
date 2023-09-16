<script lang="ts">
	import { BASE_URL } from '../API/constants';
	import { fetchNewDrink } from '../API/API';
	import { goto } from '$app/navigation';
	import type { DrinkType } from '../types';
	import { allDrinks } from '../drinkStore';

	export let searchTerm: string = '';
	let showResultBox = false;
	let showError = false;
	let searchResult: DrinkType;

	// function filterFromAllDrinksStore(){
	// 	const filteredItem = $allDrinks.filter((drink) => drink.name?.includes(searchTerm));
	// 	console.log(filteredItem);

	// }

	const handleSubmit = async () => {
		if (searchTerm.length > 0) {
			try {
				const URL: string = `${BASE_URL}search.php?s=${searchTerm}`;
				const drink = await fetchNewDrink(URL);

				// filterFromAllDrinksStore()
				if (drink) {
					searchResult = drink;
					showResultBox = true;
					searchTerm = '';
				}
			} catch (error) {
				console.log(error);
				showError = true;
			}
		}
	};

	// Handle user click of search result. Takes user to the drink's specific page
	const handleClick = () => {
		showResultBox = false;
		goto(`/drink/[slug]/?id=${searchResult.id}`);
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="flex min-w-[150px] my-auto sm:order-2">
	<div class="relative">
		<input
			class="input indent-2 h-10 variant-form-material"
			title="search"
			type="text"
			placeholder="Type Drink Name"
			bind:value={searchTerm}
			on:keydown={() => (showError = false)}
		/>
		{#if showResultBox}
			<button class="block select absolute text-left" on:click={() => handleClick()}>
				{searchResult.name}</button
			>
		{/if}
		{#if showError}
			<p class="block absolute py-1">No Result</p>
		{/if}
	</div>
</form>
