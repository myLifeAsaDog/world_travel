<script>
import { countryStore, cityStore, deptStore, seatStore, orderStore, tourList } from '../../store.js';
export let isOpenPanel = false;
const onSortChange = (orderCode) => {
  orderStore.changeOrder(orderCode);
  const dataParams = {
    countryCode: $countryStore.code,
    cityCode: $cityStore.code,
    deptCity: $deptStore,
    seatClass: $seatStore,
    order: $orderStore,
    pageStart: 1
  }
  tourList.getTourlList(dataParams);
  isOpenPanel = false;
}
</script>

<aside class="mdCMN07OrderPanel" class:ExOpen={isOpenPanel} class:ExClose={!isOpenPanel}>
  <header class="Md01SubHeader">
    <span></span>
    <h2>並び順</h2>
    <span
      class="mdCMN04Close"
      on:click={() => isOpenPanel = false}
    >CLOSE</span>
  </header>
  <ul>
  {#each orderStore.nameMap as order }
    <li class:ExSelected={$orderStore === order.code} on:click={() => onSortChange(order.code)}>{order.name}</li>
  {/each}
  </ul>
</aside>