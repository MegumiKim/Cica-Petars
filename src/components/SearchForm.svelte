<script lang="ts">
	import { BASE_URL } from '../API/constants';
	import { fetchNewDrink } from '../API/API';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';

	export let searchTerm: string = '';
	let showResultBox = false;
	let searchResult: {};

	const handleSubmit = async () => {
		const URL: string = `${BASE_URL}search.php?s=${searchTerm}`;
		const drink = await fetchNewDrink(URL);

		if (drink) {
			searchResult = drink;
		} else {
			searchResult = {
				name: 'No result'
			};
		}
		showResultBox = true;
		searchTerm = '';
	};

	const handleClick = () => {
		showResultBox = false;
		goto(`/drink/[slug]/?id=${searchResult.id}`);
	};

	export function load() {
		// ...
		throw redirect(302, '/');
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="flex min-w-[150px] my-auto sm:order-2">
	<div class="relative">
		<input
			class="input indent-2 h-10"
			title="search"
			type="text"
			placeholder="search by name"
			bind:value={searchTerm}
		/>
		{#if showResultBox}
			<button class="block select absolute" on:click={() => handleClick()}
				>{searchResult.name}</button
			>
			<!-- <a class="block select absolute" href="/drink/[slug]/?id={searchResult.id}">{searchResult.name}</a> -->
		{/if}
	</div>
</form>
