<script>
import { routerStore, orderStore, tourList, tourDetailStore } from '../store.js';
import TourCard from './list/TourCard.svelte';
import Pager from './list/Pager.svelte';
import Detail from './list/Detail.svelte';
import SortPanel from './list/SortPanel.svelte';
import Footer from './common/Footer.svelte';

let isOpenDetail = false;
let isOpenSortPanel = false;

$:orderName = orderStore.nameMap.filter(item => item.code === $orderStore);
</script>

<main class="LyMain">
  <header class="LyHead">
    <span class="lyHeadMd02Back" 
    on:click={() => routerStore.search()}>BACK</span>
    <h1>検索結果</h1>
    <span/>
  </header>
  <section>
    <div class="MdCMN07Result">
      <p class="mdCMN07Sort" class:ExOpen={isOpenSortPanel} class:ExClose={!isOpenSortPanel} on:click={() => isOpenSortPanel = !isOpenSortPanel}>
        {orderName[0].name}
      </p>
      <p class="mdCMN07NumOfResult">
        検索結果：{$tourList.result||'--'} 件
      </p>
    </div>    
    {#if $tourList.result === 0}
    <p class="mdCMN07NoResult">条件に該当するツアーはありませんでした。</p>
    {/if}
    {#if $tourList.result}
    <ol>
      {#each $tourList.tourList as tour}
        <li><TourCard item={tour} on:openDetailPanel={() => { 
          isOpenDetail = true;
          isOpenSortPanel = false; 
        }}/></li>
      {/each}
    </ol>  
    {/if}
  </section>
  {#if $tourList.result}
  <Pager />
  {/if}
  <Footer />
  <SortPanel 
    isOpenSortPanel={isOpenSortPanel} 
    on:closeSortPanel={() => isOpenSortPanel = false} />
  <Detail 
    isOpenDetail={isOpenDetail}
    on:closeDetailPanel={() => { 
      isOpenDetail = false; 
      isOpenSortPanel = false; 
    }}/>
</main>