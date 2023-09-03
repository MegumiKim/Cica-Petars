<script lang="ts">
	import type { DrinkThumbType } from '../types';
	export let drink: DrinkThumbType;
	// import jump from '../utils/jumpToDrinkPage';

</script>

<a href="/drink/[slug]/?id={drink.id}" class="card card-hover">
		<img
			src="{drink.thumbUrl}/preview"
			alt={drink.name}
			class="bg-back/50 w-full outline outline-1"
		/>
		<h3 class="p-2 truncate bg-opacity-60 w-full variant-glass-surface outline outline-1">
			{drink.name}
		</h3>
		</a>

