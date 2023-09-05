<script lang="ts">
	import { onMount } from 'svelte';
	import { BASE_URL } from '../../API/constants';
	import IngredientSearchForm from './ingredientSearchForm.svelte';
	import IngredientCard from './ingredientCard.svelte';
	import Loader from '../../components/ui/Loader.svelte';
	import ServerError from '../../components/ui/serverError.svelte';

	let ingredients: {
		name: string;
	}[] | null;

	let loading:boolean = false;
function updateSearchResult(result:[{name:string}]){
	ingredients = result
}

	export async function getAllIngredients() {
		loading = true
		try{
					const result = await fetch(BASE_URL + 'list.php?i=list');
					const json = await result.json();

					if(json.drinks){
						ingredients = json.drinks.map((ingredient: { strIngredient1: string }) => ({
						name: ingredient.strIngredient1
				}))	
					}else{
						throw new Error
					}
		}catch{
			ingredients = null
		}finally{
			loading = false
		}
	}

	onMount(() => {
		getAllIngredients();
	});

</script>

<div class="container m-auto max-w-[1000px] justify-center p-5">
	<h1 class="my-6">Ingredients</h1>
	<IngredientSearchForm {updateSearchResult} />
	{#if loading}
	<Loader />
	{/if}
	<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 my-10 gap-3 mx-auto">
{#if ingredients}		
{#each ingredients as ingredient}
<IngredientCard {ingredient}/>
		{/each}
{:else}
<ServerError />
{/if}
	</div>
</div>
