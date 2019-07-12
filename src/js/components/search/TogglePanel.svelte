<script>
import { slide } from 'svelte/transition';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let items;
let isOpenPanel = false;
</script>

<dl>  
  <dt on:click={() => isOpenPanel = !isOpenPanel}>{items.title}</dt>
  {#if isOpenPanel}
  <dd transition:slide="{{ y:10, duration:300 }}">
    <ul class="mdCMN03List">
    {#each items.list as item }
      <li 
      class:ExSelected={items.selectedItem === item.code}
      on:click={() => dispatch('select', item.code)}>{item.name}</li>
    {/each}
    </ul>
  </dd>
  {/if}
</dl>