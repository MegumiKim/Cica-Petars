<script lang="ts">
	export let drink;
</script>

<div>
	{#if drink}
		<div class="relative">
			<img src={drink.thumbUrl} alt={drink.name} class=" object-cover m-auto h-full w-full" />

			<a
				href={`/drink/[slug]?id=${drink.id}`}
				class="absolute bottom-4 variant-glass-surface px-9 overflow-clip"
			>
			<lead class="italic text-sm">Today's Welcome Drink:</lead>
				<h1 class="underline leading-snug">{drink.name}</h1>
		</a>
		</div>
	{:else}
		<p>No drink available.</p>
	{/if}
</div>
