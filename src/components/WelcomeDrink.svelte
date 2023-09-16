<script lang="ts">
	import type { DrinkType } from '../types';
	export let drink: DrinkType;
</script>

<div>
	{#if drink}
		<div class="relative">
			<img src={drink.thumbUrl} alt={drink.name} class=" object-cover m-auto h-full w-full" />
			<a
				href={`/drink/[slug]?id=${drink.id}`}
				class="sm:px-4 sm:absolute sm:outline-0 bottom-4 variant-glass-surface overflow-clip"
			>
				<p class="italic text-sm">Today's Welcome Drink:</p>
				<h1 class="underline leading-snug">{drink.name}</h1>
			</a>
		</div>
	{/if}
</div>
