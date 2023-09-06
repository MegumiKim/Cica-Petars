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
	import Loader from '../components/ui/Loader.svelte';
	import ServerError from '../components/ui/serverError.svelte';

	const randomDrinkURL: string = BASE_URL + 'random.php';

	let welcomeDrink: DrinkType;
	let loading:boolean = false;
	let showError = false;
	
	onMount(async () => {
		getRandomDrink()
	});

	async function getRandomDrink() {
			loading = true
			try{
				welcomeDrink = await fetchNewDrink(randomDrinkURL);
			}catch{
				showError = true
			}
			loading = false
	}
</script>

<div class="m-auto sm:flex max-w-[1000px] justify-center p-4 gap-4 h-full">
	<section class="flex-1 m-auto flex flex-col my-6 justify-center text-center">
		<h1 class="leading-10">Welcome to Čika Petar's</h1>
		<p class="">Discover The World of Cocktails</p>
		<div class="flex justify-center mt-4 gap-4">
			<a
				class="sm:text-lg px-5 font-bold btn variant-ringed-primary"
				href="/list">Categories</a
			>
			<a href="/ingredients/" class="sm:text-lg font-bold btn variant-ghost-surface px-5"
				>Ingredients</a
			>
		</div>
	</section>

	<section class="flex-1 m-auto">
		{#if loading}
 		<Loader />
		{/if}
		{#if showError}
		<ServerError />
		{/if}
		<WelcomeDrink drink={welcomeDrink} />
		<button
			type="button"
			class="mx-auto mt-6 block w-min px-5 sm:text-lg font-bold btn variant-ringed-primary"
			on:click={() => getRandomDrink()}>Get Me Another One</button
		>
	</section>
</div>
<style lang="postcss">
</style>
