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
let showError:boolean = false;
let noResults:boolean = false;

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

  async function onSearchIngredient(searchTerm:string):Promise<void> {
		try{		
		const result = await fetch(`${BASE_URL}search.php?i=${searchTerm}`);
		const json = await result.json();
		ingredients = [
			{
				name: json.ingredients[0].strIngredient
			}
		];
  }
		catch{	
      noResults = true
		}
	}

</script>

<div class="container m-auto max-w-[1000px] justify-center p-5">
	<h1 class="my-6">Ingredients</h1>
	<IngredientSearchForm {onSearchIngredient}/>
	{#if noResults}
  <p class="my-2 ">No result</p>
  {/if}
	{#if loading}
	<Loader />
	{/if}
	<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 my-10 gap-3 mx-auto">
{#if ingredients}		
{#each ingredients as ingredient}
<IngredientCard {ingredient}/>
{/each}
{/if}
{#if showError}
<ServerError />
{/if}
	</div>
</div>
