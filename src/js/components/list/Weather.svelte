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
  return new Date(dateParam*1000).toLocaleString();
}
const temperatureFormat = (tempParam) => {
  return Math.round(tempParam * 10) / 10;
}
</script>

{#await weatherPromise then results}
<dl class="mdCMN13Weather">
  <dt><time>{dateFormat(results.dt)}</time></dt>
  <dd>
    <span class="mdCMN13Desc">{results.weather[0].description}</span>
    <img 
      src={`http://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`}
      width="50"
      alt={results.weather[0].main} />
    <span class="mdCMN13Temp">{temperatureFormat(results.main.temp)}</span>
    <span class="mdCMN13Humi">{results.main.humidity}</span>
  </dd>
</dl>
{/await}