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

<div class="container m-auto max-w-[1000px] justify-center p-5">
	<h1 class="my-6">Ingredients</h1>
	<form on:submit|preventDefault={() => onSearchIngredient()} class='flex'>
		<input
			bind:value={searchTerm}
			class="input variant-form-material indent-2 h-9"
			type="text"
			title="search"
			placeholder="Type ingredient (max 1)"
		/>
	</form>
	<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 my-6 gap-3 mx-auto">
		{#each ingredients as ingredient}
			<a
				class="card text-center py-3 px-1 flex align-middle"
				href="/ingredient/[slug]/?i={ingredient.strIngredient1}"
			>
				<div class="m-auto">
					<h3 class="mb-3">{ingredient.strIngredient1}</h3>
					<img
						src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1.replaceAll(
							' ',
							'%20'
						)}-small.png`}
						alt="{ingredient.strIngredient1}"
						class="max-w-full m-auto"
					/>
				</div>
			</a>
		{/each}
	</div>
</div>
