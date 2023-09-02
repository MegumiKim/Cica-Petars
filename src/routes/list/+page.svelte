<script lang="ts">
	import Form from './Form.svelte';
	import { UserFilter, allDrinks } from '../../drinkStore';
	import Card from '../../components/Card.svelte';
	// Svelte
	import { onMount } from 'svelte';
	import { fetchListOfDrinks } from '../../utils/fetchListOfAllDrinks';
	import { BASE_URL } from '../../API/constants';
	import type { DrinkThumbType } from '../../types';

	onMount(async () => {
		const drinks:Promise<DrinkThumbType[] | []> = await fetchListOfDrinks(`${BASE_URL}/filter.php?c=Ordinary_Drink`);
		allDrinks.set(drinks)

		return () => {
			console.log('destroyed');
		};
	});

</script>

<div class="container mx-auto max-w-[800px] justify-center p-5">
	<Form />
	{#if $allDrinks.length}
		<div class="container flex mt-8 gap-5">
			<h2>{$UserFilter}</h2>
			<h2 class="">({$allDrinks.length} drinks)</h2>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			{#each $allDrinks as drink}
				<Card {drink} />
			{/each}
		</div>
	{:else}
		<p>No result</p>
	{/if}
</div>
