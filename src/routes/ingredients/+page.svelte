<script lang="ts">
	import { onMount } from 'svelte';
	import DOMPurify from 'dompurify';
	import { BASE_URL } from '../../API/constants';
	// components
	import IngredientSearchForm from './ingredientSearchForm.svelte';
	import IngredientCard from './ingredientCard.svelte';
	import Loader from '../../components/ui/Loader.svelte';
	import ServerError from '../../components/ui/serverError.svelte';

	let ingredients:
		| {
				name: string;
		  }[]
		| null;

	let loading: boolean = false;
	let showError: boolean = false;
	let noResults: boolean = false;

	onMount(() => {
		getAllIngredients();
	});

	export async function getAllIngredients() {
		loading = true;
		try {
			const result = await fetch(BASE_URL + 'list.php?i=list');
			const json = await result.json();

			if (json.drinks) {
				ingredients = json.drinks.map((ingredient: { strIngredient1: string }) => ({
					name: ingredient.strIngredient1
				}));
			} else {
				throw new Error();
			}
		} catch {
			ingredients = null;
		} finally {
			loading = false;
		}
	}

	async function onSearchIngredient(searchTerm: string): Promise<void> {
		let cleanInput = DOMPurify.sanitize(searchTerm);
		try {
			const result = await fetch(`${BASE_URL}search.php?i=${cleanInput}`);
			const json = await result.json();
			console.log(result);

			ingredients = [
				{
					name: json.ingredients[0].strIngredient
				}
			];
		} catch {
			noResults = true;
		}
	}

	function hideNoResult() {
		noResults = false;
	}
</script>

<div class="container m-auto max-w-[1000px] justify-center p-5 relative">
	<h1 class="my-6">Ingredients</h1>
	<IngredientSearchForm {onSearchIngredient} {hideNoResult} />
	{#if noResults}
		<p class="my-2 absolute top-32">No Result</p>
	{/if}
	{#if loading}
		<Loader />
	{/if}
	<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 my-10 gap-3 mx-auto">
		{#if ingredients}
			{#each ingredients as ingredient}
				<IngredientCard {ingredient} />
			{/each}
		{/if}
		{#if showError}
			<ServerError />
		{/if}
	</div>
</div>
