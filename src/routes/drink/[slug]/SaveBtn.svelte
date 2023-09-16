<script lang="ts">
	import Icon from '@iconify/svelte';
	import { SavedDrinkStore } from '../../../drinkStore';
	import type { DrinkType } from '../../../types.js';

	export let isAlreadySaved: boolean = false;
	export let drink: DrinkType;

	function onSave(id: string): void {
		if (isAlreadySaved) {
			SavedDrinkStore.update((prev) => prev.filter((d) => d.id !== id));
		} else {
			SavedDrinkStore.update((prev) => [drink, ...prev]);
		}
		isAlreadySaved = !isAlreadySaved;
	}
</script>

<button class="inline-block" on:click={() => onSave(drink.id)}>
	<Icon
		icon="uil:favorite"
		class="text-2xl mx-auto hover:text-yellow-500 {isAlreadySaved
			? 'text-yellow-500'
			: 'text-white'}"
	/>
	<small class="mx-auto" data-set="popup">{isAlreadySaved ? 'Unsave' : 'save'}</small>
</button>
