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
<dl class="mdCMN13Currency">
  <dt>{$countryStore.currency.currencyName}</dt>
  <dd>&yen; {currency.val}</dd>
</dl>
{/await}