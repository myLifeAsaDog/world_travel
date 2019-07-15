<script>
import { tourDetailStore } from '../../store.js';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let isOpenDetail = false;

$:backgroundImage = 
$tourDetailStore.image ? `background-image:url(${$tourDetailStore.image});` : '';

$:destCites = 
$tourDetailStore.city_summary ? $tourDetailStore.city_summary.split('、') : '';
$:tourTheme = 
$tourDetailStore.theme ? $tourDetailStore.theme[0].name : '';
$:hotels = 
$tourDetailStore.hotel_summary ? $tourDetailStore.hotel_summary.split('、') : '';

const addDigits = (numberParam) => {
  return String(numberParam).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
const dateFormat = (dateParam) => {
  const Time = new Date(dateParam)
  return Time.toLocaleString()
}
</script>

<div class="MdCMN12DetailOverlay" 
  class:ExOpen={isOpenDetail} 
  class:ExClose={!isOpenDetail}>

  <div class="MdCMN09Img" style={backgroundImage}>
    <span on:click={() => dispatch('closeDetailPanel', false)}>CLOSE</span>
  </div>  

  <article class="MdCMN10Tbl">
    <dl>
      <dt>ツアーコード</dt>
      <dd>{$tourDetailStore.id}</dd>
      <dt>ツアー名</dt>
      <dd>{$tourDetailStore.title}</dd>
      <dt>ツアー料金</dt>
      <dd>&yen;{addDigits($tourDetailStore.price_min)} ～ 
      &yen;{addDigits($tourDetailStore.price_max)}</dd>
      <dt>ツアー日数</dt>
      <dd>{$tourDetailStore.term}日間</dd>
      <dt>出発地</dt>
      <dd>{$tourDetailStore.dept_city}</dd>
      <dt>目的地</dt>
      <dd>
        <ul>
          {#each destCites as city}
          <li>{ city }</li>
          {/each}
        </ul>
      </dd>
      {#if tourTheme}
      <dt>ツアーテーマ</dt>
      <dd>
        <ul>
          {#each $tourDetailStore.theme as theme}
          <li>{theme.name}</li>
          {/each}
        </ul>
      </dd>
      {/if}
      <dt>航空会社</dt>
      <dd>{$tourDetailStore.airline_summary}</dd>
      <dt>シートクラス</dt>
      <dd>{$tourDetailStore.seat_class}</dd>
      <dt>ホテル</dt>
      <dd>
        <ul>
        {#each hotels as hotel}
          <li>{hotel}</li>
        {/each}
        </ul>
      </dd>
      <dt>ツアー日程</dt>
      <dd>
        <ol>
          {#each $tourDetailStore.sche as sche}
          <li>{sche.day}日目：{sche.city||'帰国'}</li>
          {/each}
        </ol>
      </dd>
      <dt>企画会社</dt>
      <dd>{$tourDetailStore.brand}</dd>
      <dt>AB-ROAD URL</dt>
      <dd>
        <a href={$tourDetailStore.url} target="_blank">{$tourDetailStore.url}</a>
      </dd>
      <dt>最終更新日</dt>
      <dd>{dateFormat($tourDetailStore.last_update)}</dd>
    </dl>
  </article>
</div>