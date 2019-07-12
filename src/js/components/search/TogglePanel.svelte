<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let items;
let isOpenPanel = false;
</script>

<dl class:ExOpen={isOpenPanel}>  
  <dt on:click={() => isOpenPanel = !isOpenPanel}>{items.title}</dt>
  <dd>
    <ul class="mdCMN03List">
    {#each items.list as item }
      <li 
      class:ExSelected={items.selectedItem === item.code}
      on:click={() => dispatch('select', item.code)}>{item.name}</li>
    {/each}
    </ul>
  </dd>
</dl>