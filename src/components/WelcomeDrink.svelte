<script lang="ts">
	// import { SingleDrink } from "../drinkStore";
	export let drink;
</script>

<div>
	{#if drink}
		<div class="relative">
			<img src={drink.thumbUrl} alt={drink.name} class=" object-cover m-auto h-full w-full" />
			<a
				href={`/drink/[slug]?id=${drink.id}`}
				class="absolute bottom-4 left-4 bg-opacity-50 bg-red-950 px-5"
			>
				<h1 class="my-4 underline leading-snug">{drink.name}</h1>
			</a>
		</div>
	{:else}
		<p>No drink available.</p>
	{/if}
</div>
