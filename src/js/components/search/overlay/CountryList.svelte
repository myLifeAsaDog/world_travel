<script>
import { destStore, countryStore, countryList, cityList } from '../../../store.js';
const onCountrySelect = (countryCode, countryName) => {
  countryStore.set({ code:countryCode, name:countryName })
  cityList.getCityList(countryCode)
  destStore.set('city')
}
</script>
<dl>
  <dt>国家および地域</dt>
  <dd>
    <ul class="mdCMN03List">
    {#each $countryList as country}
      <li class:ExSelected={$countryStore.code === country.code}
      on:click={() => onCountrySelect(country.code, country.name)}>{country.name}</li>
     {/each}
    </ul>
  </dd>
</dl>