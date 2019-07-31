<script>
import { countryStore } from '../../store.js';

let currency = {};
let currencyPromise = getCurrency();

async function getCurrency() {
  const CURRENCY_API_ENDPOINT = './api/currency.php?currency='

  const res = await fetch(`${CURRENCY_API_ENDPOINT}${$countryStore.currency.id}`);
  const currency = await res.json();
  
  if (res.ok) {
    return currency[`${$countryStore.currency.id}_JPY`];
  }
}
</script>

{#await currencyPromise then currency}
<section class="MdCMN14Currency">
  <h2>Currency</h2>
  <dl>
    <dt>{$countryStore.currency.currencyName}</dt>
    <dd>&yen; {currency.val}</dd>
  </dl>
</section>
{/await}