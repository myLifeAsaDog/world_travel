<script>
import { cityStore } from '../../store.js';

let weather = { city: { name: '' }, list: [] };
let weatherPromise = getWeather();

async function getWeather() {
  const API_KEY = 'a2354bac666e77fac0546559d1d8f424';
  const WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';

  const res = await fetch(`${WEATHER_API_ENDPOINT}?APPID=${API_KEY}&lat=${$cityStore.lat}&lon=${$cityStore.lon}&units=metric&lang=ja`);
  const weather = await res.json();

  if (res.ok) { 
    return weather;
	}
}

const dateFormat = (dateParam) => {
  return String(dateParam).replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$2/$3 $4:$5')
}
const temperatureFormat = (tempParam) => {
  return Math.round(tempParam * 10) / 10;
}
</script>

{#await weatherPromise then weather}
<section class="MdCMN13Weather">
  <h2>Weather</h2>
  <ol>
    {#each weather.list as list}
    <li>
      <dl>
        <dt>{list.weather[0].description}</dt>
        <dd>
          <div>
            <img 
              src={`http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}
              width="50"
              alt={list.weather[0].main} />
            <span>{temperatureFormat(list.main.temp)}</span>
          </div>
          <time>{dateFormat(list.dt_txt)}</time>
        </dd>      
      </dl>
    </li>
    {/each}
  </ol>
</section>
{/await}