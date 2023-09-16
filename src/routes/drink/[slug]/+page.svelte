<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { BASE_URL } from '../../../API/constants.js';
	import { fetchNewDrink } from '../../../API/API.js';
	import { SavedDrinkStore } from '../../../drinkStore.js';
	//type
	import type { DrinkType } from '../../../types.js';

	//components
	import Icon from '@iconify/svelte';
	import BackBtn from '../../../components/ui/BackBtn.svelte';
	import Loader from '../../../components/ui/Loader.svelte';
	import SaveBtn from './SaveBtn.svelte';
	import ServerError from '../../../components/ui/serverError.svelte';

	let drink: DrinkType | undefined;
	let isAlreadySaved: boolean = false;

	let drinkID: string | null = $page.url.searchParams.get('id');
	let drinkURL: string = `${BASE_URL}lookup.php?i=${drinkID}`;
	let loading: boolean = true;
	let showError: boolean = false;

	const fetchDrink = async () => {
		try {
			drink = await fetchNewDrink(drinkURL);
			isAlreadySaved = Boolean($SavedDrinkStore.find((item: DrinkType) => item.id === drinkID));
		} catch {
			showError = true;
		} finally {
			loading = false;
		}
	};
	onMount(async () => {
		await fetchDrink();
	});

	$: {
		if (drinkID !== $page.url.searchParams.get('id')) {
			drinkID = $page.url.searchParams.get('id');
			drinkURL = `${BASE_URL}lookup.php?i=${drinkID}`;
			fetchDrink();
		}
	}
</script>

<div class="container h-full mx-auto sm:flex max-w-[1000px] justify-center p-3">
	{#if loading}
		<Loader />
	{/if}
	{#if drink}
		<div class="sm:flex gap-5">
			<div class="flex-1 mx-auto">
				<img
					src={drink.thumbUrl}
					alt={drink.name}
					class="flex-1 object-cover mx-auto h-full w-full"
				/>
			</div>
			<div class="mx-auto flex-1 py-3">
				<BackBtn />
				<div class="flex align-middle gap-3 mt-5">
					<div class="variant-glass-surface outline outline-1 w-full p-3 flex justify-between">
						<h1 class="m-0 leading-snug">{drink.name}</h1>
						<SaveBtn {drink} {isAlreadySaved} />
					</div>
				</div>
				<table class="outline outline-1 w-full">
					<tr class="">
						<th class="text-start ps-5 pt-4">Category:</th>
						<td class="pt-4">{drink.category}</td>
					</tr>
					<tr>
						<th class="text-start ps-5 pb-4">Glass:</th>
						<td class="pb-4">{drink.glass}</td>
					</tr>
				</table>
				<h2>Ingredients</h2>
				<ul class="mx-6">
					{#each drink.ingredients as ingredient}
						<li class="list-disc">
							{ingredient.amount ? ingredient.amount : ''}
							<a href="/ingredient/[slug]/?i={ingredient.name}" class="underline ingredient"
								>{ingredient.name}
								<Icon icon="tdesign:jump" class="inline-block" />
							</a>
						</li>
					{/each}
				</ul>
				{#if drink.instructions}
					<h2>Instruction</h2>
					<p class="mx-4">{drink.instructions}</p>
				{/if}
			</div>
		</div>
	{/if}
	{#if showError}
		<ServerError />
	{/if}
</div>
