<script>
import { searchOverlayStore, destStore } from '../../../store.js';
import AreaList from './AreaList.svelte'
import CountryList from './CountryList.svelte'
import CityList from './CityList.svelte'

$:isCanGoBack = $destStore !== 'area';

const backPanel = () => {
  switch ($destStore) {
    case 'country':
      destStore.set('area');
      break;
    case 'city':
      destStore.set('country');
      break;
    default:
      destStore.set('area');
      break;
  }
}
</script>

<aside class="MdCMN04Overlay" class:ExOpen={$searchOverlayStore} class:ExClose={!$searchOverlayStore}>
  <section>
    <header class="Md01SubHeader">
      {#if isCanGoBack}
      <span class="mdCMN04Back" on:click={() => backPanel}>BACK</span>
      {:else}
      <span></span>
      {/if}  
      <h2>目的地</h2>
      <span class="mdCMN04Close" on:click={() => searchOverlayStore.closePanel()}>CLOSE</span>
    </header>
    <main class="mdCMN04Wrapper" data-current={$destStore}>
      <AreaList />
      <CountryList />
      <CityList />
    </main>
  </section>
</aside>