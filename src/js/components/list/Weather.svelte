<script>
import { cityStore } from '../../store.js';

let weather = { city: { name: '' }, list: [] };
let weatherPromise = getWeather();

async function getWeather() {
  const WEATHER_API_ENDPOINT = `./api/weather.php?lat=${$cityStore.lat}&lon=${$cityStore.lon}`;

  const res = await fetch(WEATHER_API_ENDPOINT);
  const weather = await res.json();

  if (res.ok) { 
    return weather;
	}
}

const dateFormat = (dateParam) => {
  return new Date(dateParam*1000).toLocaleDateString('ja-JP');
}
const temperatureFormat = (tempParam) => {
  return Math.round(tempParam * 10) / 10;
}
</script>

{#await weatherPromise then res}
<dl class="mdCMN13Weather">
  <dt>{res.weather[0].description}</dt>
  <dd>
    <div>
      <img 
        src={`http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`}
        width="50"
        alt={res.weather[0].main} />
      <span>{temperatureFormat(res.main.temp)}</span>
    </div>
    <time>{dateFormat(res.dt)}</time>
  </dd>
</dl>
{/await}