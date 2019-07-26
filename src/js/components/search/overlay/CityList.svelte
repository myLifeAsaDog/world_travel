<script>
import { searchOverlayStore, cityStore, cityList } from '../../../store.js';
const onCitySelect = (cityCode, cityName, cityLat, cityLon) => {
  cityStore.set({ code:cityCode, name:cityName, lat:cityLat, lon:cityLon })
  searchOverlayStore.closePanel()
}
</script>

<dl>
  <dt>都市</dt>
  <dd>
    <ul class="mdCMN03List">
    {#each $cityList as city}
      <li class:ExSelected={$cityStore.code === city.code}
      on:click={() => onCitySelect(city.code, city.name, city.lat, city.lng)}>{city.name}</li>
     {/each}
    </ul>
  </dd>
</dl>