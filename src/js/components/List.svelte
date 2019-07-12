<script>
import { routerStore, orderStore, tourList, tourDetail } from '../store.js';
import TourCard from './list/TourCard.svelte';
import Pager from './list/Pager.svelte';
import Detail from './Detail.svelte';
import Footer from './common/Footer.svelte';
</script>

<main>
  <header class="LyHead">
    <span class="lyHeadMd02Back" 
    on:click={() => routerStore.search()}>BACK</span>
    <h1>検索結果</h1>
    <span></span>
  </header>
  <section>
    <div class="MdCMN07Result">
      <p class="mdCMN07Sort">
        {orderStore.nameMap[$orderStore].name}
      </p>
      <p class="mdCMN07NumOfResult">
        検索結果：{$tourList.result||'--'}件
      </p>
    </div>    
    <ol>
    {#if $tourList.result === 0}
      <li>条件に該当するツアーはありませんでした。</li>
    {/if}
    {#each $tourList.tourList as tour}
      <li><TourCard item={tour}/></li>
    {/each}
    </ol>
  </section>
  {#if $tourList.result}
  <Pager />
  {/if}
  <Footer />
  <Detail />
</main>