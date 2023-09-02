<script lang="ts">
	// components
	import WelcomeDrink from '../components/WelcomeDrink.svelte';
	// types
	import type { DrinkType } from '../types';
	// API
	import { fetchNewDrink } from '../API/API';
	import { BASE_URL } from '../API/constants';
	// Svelte
	import { onMount } from 'svelte';

	const randomDrinkURL: string = BASE_URL + 'random.php';

	let welcomeDrink: DrinkType | undefined;

	onMount(async () => {
		welcomeDrink = await fetchNewDrink(randomDrinkURL);

		return () => {
			console.log('destroyed');
		};
	});

	async function getRandomDrink() {
		try {
			welcomeDrink = await fetchNewDrink(randomDrinkURL);
		} catch (error) {
			console.error('Error fetching drink:', error);
		}
	}
</script>

<div class="m-auto sm:flex max-w-[1000px] justify-center p-4 gap-4 h-full">
	<section class="flex-1 m-auto flex flex-col my-6 justify-center text-center">
		<h1 class="leading-10">Welcome to Cika Petar's</h1>
		<p class="">Discover The World of Cocktails</p>
		<div class="flex justify-center mt-4 gap-4">
			<a
				type="button"
				class="w-min px-5 sm:text-lg font-bold btn variant-ringed-primary"
				href="/list">Categories</a
			>
			<a href="/ingredients/" class="sm:text-lg font-bold btn variant-ghost-surface px-5"
				>Ingredients</a
			>
		</div>
	</section>

	<section class="flex-1 m-auto">
		<div class="flex variant-glass-surface gap-5 align-middle px-5">
			<h2 class="">Today's Welcome Drink:</h2>
		</div>
		<WelcomeDrink drink={welcomeDrink} />
		<button
			type="button"
			class="mx-auto mt-3 block w-min px-5 sm:text-lg font-bold btn variant-ringed-primary"
			on:click={() => getRandomDrink()}>Get me another one</button
		>
	</section>
</div>
<style lang="postcss">
</style>
