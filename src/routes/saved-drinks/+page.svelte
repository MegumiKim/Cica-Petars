<script lang=ts>
  import { SavedDrinkStore } from "../../drinkStore";
  import Card from "../../components/Card.svelte";
import Icon from '@iconify/svelte';

const unSaveDrink =(id:string)=>{
  SavedDrinkStore.update((prev)=>prev.filter((drink)=>drink.id !==id))
}

</script>

<div class="container h-full mx-auto max-w-[1000px] p-4">
  <h1 class="my-5">Saved Drinks</h1>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    {#if $SavedDrinkStore.length}
      {#each $SavedDrinkStore as drink}
        <div class="relative">
          <Card {drink} />
          <button class="absolute bottom-0 right-0 text-white text-xl mx-3 mb-3 cursor-pointer hover:text-yellow-500"
          on:click={()=>unSaveDrink(drink.id)}>
            <Icon icon="mingcute:delete-line" />
          </button>
        </div>
      {/each}
    {:else}
    <h2 class="m-auto">No drink saved</h2>

    {/if}
  </div>
</div>