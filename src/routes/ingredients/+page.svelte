<script lang="ts">
	import { onMount } from 'svelte';
	import { BASE_URL } from '../../API/constants';

	let ingredients: {
		strIngredient1: string;
	}[] = [];

	let searchTerm: string;

	async function getAllIngredients() {
		const result = await fetch(BASE_URL + 'list.php?i=list');
		const json = await result.json();
		ingredients = json.drinks;
	}

	onMount(() => {
		getAllIngredients();
		return () => {
			console.log('destroyed');
		};
	});

	async function onSearchIngredient() {
		const result = await fetch(`${BASE_URL}search.php?i=${searchTerm}`);
		const json = await result.json();

		const foundIngredient = [
			{
				strIngredient1: json.ingredients[0].strIngredient
			}
		];
		ingredients = foundIngredient;
	}
</script>

<div class="m-auto max-w-[1000px] justify-center p-3">
	<h1 class="my-6">Ingredients</h1>
	<form on:submit|preventDefault={() => onSearchIngredient()}>
		<label for=""
			>Search Ingredient
			<input
				bind:value={searchTerm}
				class="input variant-form-material indent-2"
				type="text"
				title="search"
				placeholder="ingredient (max 1)"
			/>
		</label>
	</form>
	<div class="container grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 my-6 gap-3">
		{#each ingredients as ingredient}
			<a
				class="card text-center py-3 px-1 flex align-middle"
				href="/ingredient/[slug]/?i={ingredient.strIngredient1}"
			>
				<div class="m-auto">
					<h3>{ingredient.strIngredient1}</h3>
					<img
						src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1.replaceAll(
							' ',
							'%20'
						)}-small.png`}
						alt=""
						class="max-w-full h-min m-auto"
					/>
				</div>
			</a>
		{/each}
	</div>
</div>
