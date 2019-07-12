<script>
import { onMount } from 'svelte';
import { destStore, areaStore, countryList } from '../../../store.js';

let areaListState = [];

onMount(async () => {
  const res = await fetch('./data/areaList.json');
  const areas = await res.json();

  if (res.ok) areaListState = areas;
})

const onAreaSelect = (areaCode, areaName) => {
  areaStore.set({ code:areaCode, name:areaName })
  countryList.getCountryList(areaCode)
  destStore.set('country')
}
</script>

<dl>
  <dt>地域</dt>
  <dd>
    <ul class="mdCMN03List">
    {#each areaListState as area}
      <li 
      class:ExSelected={$areaStore.code === area.code} 
      on:click={() => onAreaSelect(area.code, area.name)}>{area.name}</li>
    {/each}  
    </ul>
  </dd>
</dl>