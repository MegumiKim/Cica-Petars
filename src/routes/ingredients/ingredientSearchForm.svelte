<script lang='ts'>
	import { BASE_URL } from "../../API/constants";

let showError = false;
let searchTerm:string;

export let updateSearchResult: ({})=> void;

  async function onSearchIngredient(searchTerm:string):Promise<void> {
		try{		
		const result = await fetch(`${BASE_URL}search.php?i=${searchTerm}`);
		const json = await result.json();
		const foundIngredient = [
			{
				name: json.ingredients[0].strIngredient
			}
		];
  updateSearchResult(foundIngredient);
  }
		catch{
      updateSearchResult([])
      showError = true
		}
	}
</script>

<form on:submit|preventDefault={() => onSearchIngredient(searchTerm)} class='flex relative'>
  <input
    bind:value={searchTerm}
    class="input variant-form-material indent-2 h-10"
    type="text"
    title="search"
    placeholder="Type ingredient (max 1)"
    on:keydown={()=>showError = false}
  />
  {#if showError}
  <p class="my-2 absolute top-10">No result</p>
  {/if}
</form>