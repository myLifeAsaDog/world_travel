<script>
import { orderStore, tourList, searchParamsDerived } from '../../store.js';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let isOpenSortPanel = false;

const onSortChange = async(orderCode) => {
  dispatch('closeSortPanel', false);
  tourList.reset();
  orderStore.changeOrder(orderCode);
  await tourList.getTourlList($searchParamsDerived);
}
</script>

<aside class="mdCMN07OrderPanel" class:ExOpen={isOpenSortPanel} class:ExClose={!isOpenSortPanel}>
  <header class="Md01SubHeader">
    <span/>
    <h2>並び順</h2>
    <span
      class="mdCMN04Close"
      on:click={() => dispatch('closePanel', false)}
    >CLOSE</span>
  </header>
  <ul>
  {#each orderStore.nameMap as order }
    <li class:ExSelected={$orderStore === order.code} on:click={() => onSortChange(order.code)}>{order.name}</li>
  {/each}
  </ul>
</aside>