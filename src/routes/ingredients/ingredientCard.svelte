<script lang='ts'>

  export let ingredient:{
    name:string
  };
</script>

<a
class="card text-center py-3 px-1 flex align-middle"
href="/ingredient/[slug]/?i={ingredient.name}"
>
<div class="m-auto">
  <h3 class="mb-3">{ingredient.name}</h3>
  <img
    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.name.replaceAll(
      ' ',
      '%20'
    )}-small.png`}
    alt="{ingredient.name}"
    class="max-w-full m-auto"
  />
</div>
</a>