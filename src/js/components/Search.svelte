<script>
import { routerStore, deptStore, seatStore, orderStore, searchOverlayStore, countryStore, cityStore, tourList, tourDetail } from '../store.js';
import Footer from './common/Footer.svelte';
import TogglePanel from './search/TogglePanel.svelte';
import Overlay from './search/overlay/Overlay.svelte';

$:seatItem = {
  title: 'シートクラス',
  selectedItem: $seatStore,
  list: seatStore.nameMap
}

$:orderItem = {
  title: '並び順',
  selectedItem: $orderStore,
  list: orderStore.nameMap
}

const onSubmit = async (params) => {
  const dataParams = {
    countryCode: $countryStore.code,
    cityCode: $cityStore.code,
    deptCity: $deptStore,
    seatClass: $seatStore,
    order: $orderStore,
    pageStart: 1
  }
  await tourList.getTourlList(dataParams)
  /* Detailが描画できないので初期値を設定する */
  tourDetail.set($tourList.tourList[0])
  routerStore.list()
}
</script>

<main>
  <header class="LyHead">
    <span class="lyHeadMd02Back" on:click={() => routerStore.index()}>BACK</span>
    <h1>検索条件</h1>
    <span></span>
  </header>
  <section class="MdCMN03Areas">
    <dl class="ExOpen">
      <dt>目的地</dt>
      <dd class="mdCMN03Input" on:click={() => searchOverlayStore.openPanel()}>
      {#if $countryStore.name}{$countryStore.name}{:else}未選択{/if} - 
      {#if $cityStore.name}{$cityStore.name}{:else}未選択{/if}</dd>
      <dt>出発地</dt>
      <dd>
        <ul class="mdCMN03FloatList">
        {#each deptStore.nameMap as dept }
          <li 
          class:ExSelected={$deptStore === dept.code} 
          on:click={() => deptStore.changeDept(dept.code)}>{dept.name}</li>
        {/each}
        </ul>
      </dd>
    </dl>
    <TogglePanel items={seatItem} 
    on:select={(event) => seatStore.changeSeat(event.detail)} />
    <TogglePanel items={orderItem} 
    on:select={(event) => orderStore.changeOrder(event.detail)} />
    <button type="button" class="mdCMN03Btn" on:click={onSubmit}>検索</button>
  </section>
  <Footer/>
  <Overlay/>
</main>