<script lang="ts">
	import { UserFilter, allDrinks } from '../../drinkStore';
	import { BASE_URL } from '../../API/constants';
	import type { DrinkThumbType } from '../../types';
	import { fetchListOfDrinks } from '../../utils/fetchListOfAllDrinks';


	function handleChange(event: Event) {
		let displayName = event.currentTarget.value.replaceAll('_', ' ');
		UserFilter.update((currentFilter) => displayName);

		fetchListOfDrinks(filteredURL(event.currentTarget.value));
	}

	const filteredURL = (category: string) => {
		if (category === 'Non_Alcoholic') {
			return `${BASE_URL}/filter.php?a=${category}`;
		}
		return `${BASE_URL}/filter.php?c=${category}`;
	};
</script>

<section class="">
	<form action="" class="gap-3">
		<select
			class="select variant-form-material"
			placeholder="Select Category"
			on:change={(e) => {
				handleChange(e);
			}}
		>
			<option value="Ordinary_Drink">Ordinary Drink</option>
			<option value="Cocktail">Cocktail</option>
			<option value="Punch_/_Party_Drink">Punch / Party Drink</option>
			<option value="Shake">Shake</option>
			<option value="Coffee_/_Tea">Coffee / Tea</option>
			<option value="Beer">Beer</option>
			<option value="Non_Alcoholic">Non Alcoholic</option>
		</select>
	</form>
</section>
