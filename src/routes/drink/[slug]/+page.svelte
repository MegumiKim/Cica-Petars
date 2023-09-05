<script lang="ts">
	import Icon from '@iconify/svelte';
	import { BASE_URL } from '../../../API/constants.js';
	import { onMount } from 'svelte';
	import { fetchNewDrink } from '../../../API/API.js';
	import {  SavedDrinkStore } from '../../../drinkStore.js';
	import type { DrinkType } from '../../../types.js';
	import BackBtn from '../../../components/BackBtn.svelte';
	import { page } from '$app/stores';
	
	let drink: DrinkType | undefined;
	let isAlreadySaved: boolean = false;
	
  let drinkID:string |null= $page.url.searchParams.get('id');
	let drinkURL:string = `${BASE_URL}lookup.php?i=${drinkID}`;

	const fetchDrink = async ()=>{
		drink = await fetchNewDrink(drinkURL);
		isAlreadySaved = Boolean($SavedDrinkStore.find((item:DrinkType) => item.id === drinkID))
	}
	onMount(async()=>{
		await fetchDrink()
	});

	$: {
		if (drinkID !== $page.url.searchParams.get('id')) {
			drinkID = $page.url.searchParams.get('id');
			drinkURL = `${BASE_URL}lookup.php?i=${drinkID}`;
			 fetchDrink();
		}
	}

	function onSave(id: string) {
			if (isAlreadySaved) {
				SavedDrinkStore.update((prev) => prev.filter((d) => d.id !== id));
			} else {
				SavedDrinkStore.update((prev) => [drink, ...prev]);
			}
			isAlreadySaved = !isAlreadySaved;
		}

</script>

<div class="container h-full mx-auto sm:flex max-w-[1000px] justify-center p-3">
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
						<button class="inline-block" on:click={()=>onSave(drink.id)}>
							<Icon
								icon="uil:favorite"
								class="text-2xl mx-auto hover:text-yellow-500 {isAlreadySaved
									? 'text-yellow-500'
									: 'text-white'}"
							/>
							<small class="mx-auto" data-set="popup">{isAlreadySaved ? 'Unsave' : 'save'}</small>
						</button>
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
	{:else}
		<p>No drink available.</p>
	{/if}
</div>
