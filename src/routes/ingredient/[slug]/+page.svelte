<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	//API functions
	import { BASE_URL } from '../../../API/constants';
	import { fetchDrinksByIngredient, fetchIngredient } from '../../../API/API';
	//types
	import type {DrinkThumbType, IngredientType} from "../../../types"
	//components
	import Icon from '@iconify/svelte';
	import Card from '../../../components/Card.svelte';
	import BackBtn from '../../../components/ui/BackBtn.svelte';
	import Loader from '../../../components/ui/Loader.svelte';
	import ServerError from '../../../components/ui/serverError.svelte';

	const param = $page.url.searchParams.get('i');
	const URL_INGREDIENT = BASE_URL + `search.php?i=${param}`;
	const URL_DRINKS_BY_INGREDIENT = BASE_URL + `/filter.php?i=${param}`;

	let ingredient:IngredientType = {
		name: '',
		id: '',
		description: '',
		ABV: '',
		type: ''
	};
	let drinks: DrinkThumbType[] | void = [];
	let loading = true;
	let showError = false;

	// Loads Ingredient details
async function getIngredient(){
try{
ingredient = await fetchIngredient(URL_INGREDIENT);
}catch{
	showError = true
}finally{
	loading = false
}
}

	// Loads Related drinks
async function getDrinksByIngredient(){
try{
drinks = await fetchDrinksByIngredient(URL_DRINKS_BY_INGREDIENT);
}catch{
	showError = true
}finally{
	loading = false
}
}

	onMount(async () => {
		getIngredient()
		getDrinksByIngredient()
	});
</script>

<div class="m-auto max-w-[1000px] justify-center p-3 sm:px-5">
<BackBtn />
	<div class="m-auto">
		{#if loading}
			<Loader />
		{/if}
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
			{#if showError}
				<ServerError />
			{/if}
		</div>
	</div>
</div>
