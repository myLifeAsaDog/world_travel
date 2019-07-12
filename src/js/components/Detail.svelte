<script>
import { tourDetail, detailOverlayStore } from '../store.js';

$:style = `background-image:url(${$tourDetail.image})`;
$:destCites = $tourDetail.city_summary ? $tourDetail.city_summary.split('、') : '';
$:tourTheme = $tourDetail.theme ? $tourDetail.theme[0].name : false;
$:hotels = $tourDetail.hotel_summary ? $tourDetail.hotel_summary.split('、') : '';

const addDigits = (numberParam) => {
  return String(numberParam).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
const dateFormat = (dateParam) => {
  const Time = new Date(dateParam)
  return Time.toLocaleString()
}
</script>

<div class="MdCMN11Overlay" class:ExOpen={$detailOverlayStore} class:ExClose={!$detailOverlayStore}>
  <header class="Md01SubHeader">
    <span></span>
    <h2>ツアー詳細</h2>
    <span class="mdCMN04Close" on:click={() => detailOverlayStore.closePanel()}>CLOSE</span>
  </header>
  <div class="MdCMN09Img" style={style}></div>
  <article class="MdCMN10Tbl">
    <dl>
      <dt>ツアーコード</dt>
      <dd>{$tourDetail.id}</dd>
      <dt>ツアー名</dt>
      <dd>{$tourDetail.title}</dd>
      <dt>ツアー料金</dt>
      <dd>&yen;{addDigits($tourDetail.price_min)} ～ 
      &yen;{addDigits($tourDetail.price_max)}</dd>
      <dt>ツアー日数</dt>
      <dd>{$tourDetail.term}日間</dd>
      <dt>出発地</dt>
      <dd>{$tourDetail.dept_city}</dd>
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
          {#each $tourDetail.theme as theme}
          <li>{theme.name}</li>
          {/each}
        </ul>
      </dd>
      {/if}
      <dt>航空会社</dt>
      <dd>{$tourDetail.airline_summary}</dd>
      <dt>シートクラス</dt>
      <dd>{$tourDetail.seat_class}</dd>
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
          {#each $tourDetail.sche as sche}
          <li>{sche.day}日目：{sche.city||'帰国'}</li>
          {/each}
        </ol>
      </dd>
      <dt>企画会社</dt>
      <dd>{$tourDetail.brand}</dd>
      <dt>AB-ROAD URL</dt>
      <dd>
        <a href={$tourDetail.url} target="_blank">{$tourDetail.url}</a>
      </dd>
      <dt>最終更新日</dt>
      <dd>{dateFormat($tourDetail.last_update)}</dd>
    </dl>
  </article>
</div>