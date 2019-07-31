<script>
import { destStore, countryStore, countryList, cityList } from '../../../store.js';
const onCountrySelect = (countryCode, countryName, countryCurrency) => {
  countryStore.set({ code:countryCode, name:countryName, currency:countryCurrency })
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
      on:click={() => onCountrySelect(country.code, country.name, country.currency)}>{country.name}</li>
     {/each}
    </ul>
  </dd>
</dl>