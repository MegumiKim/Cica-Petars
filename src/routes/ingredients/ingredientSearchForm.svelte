<script lang='ts'>

  let searchTerm:string;
  export let noResults = false;
  export let onSearchIngredient:(searchTerm:string)=>Promise<void>;

</script>

<form on:submit|preventDefault={() => onSearchIngredient(searchTerm)} class='flex relative'>
  <input
    bind:value={searchTerm}
    class="input variant-form-material indent-2 h-10"
    type="text"
    title="search"
    placeholder="Type ingredient (max 1)"
    on:keydown={()=>noResults = false}
  />
  <!-- {#if noResults}
  <p class="my-2">No result</p>
  {/if} -->
</form>