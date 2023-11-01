<script lang="ts">
	export let handleChange: (event: Event) => void;
</script>

<form action="" class="gap-3 mt-3">
	<select
		class="select variant-form-material"
		placeholder="Select Drink Category"
		on:change={(e) => {
			handleChange(e);
		}}
	>
		<option value="Cocktail">Cocktail</option>
		<option value="Punch_/_Party_Drink">Punch / Party Drink</option>
		<option value="Shot">Shot</option>
		<option value="Shake">Shake</option>
		<option value="Coffee_/_Tea">Coffee / Tea</option>
		<option value="Beer">Beer</option>
		<option value="Homemade_Liqueur">Homemade Liqueur</option>
		<option value="Non_Alcoholic">Non Alcoholic</option>
	</select>
</form>
