<script lang="ts">

	export let handleChange:(event: Event)=>void;

</script>

	<form action="" class="gap-3 mt-3">
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
