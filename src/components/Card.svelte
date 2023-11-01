<script lang="ts">
	import type { DrinkThumbType } from '../types';
	export let drink: DrinkThumbType;
</script>

<a href="/drink/[slug]/?id={drink.id}" class="card card-hover variant-glass-surface hover:bg-transparent">
	<img
		src="{drink.thumbUrl}/preview"
		alt={drink.name}
		class="w-full"
	/>
		<h3 class="p-2 text-center w-full m-auto ">
			{drink.name}
		</h3>
</a>
