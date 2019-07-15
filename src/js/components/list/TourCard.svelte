<script>
import { tourDetailStore } from '../../store.js';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let item = {};

const destinations = item.city_summary? item.city_summary.split('、'): '';
const style = item.image? `background-image:url(${item.image})`: '';

const addDigits = (numberParam) => {
  return String(numberParam).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
const onClickTour = () => {
  tourDetailStore.setTourDetail(item);
  dispatch('openDetailPanel');
}
</script>

<div class="MdCMN05TourList" on:click={onClickTour}>
  <div class="mdCMN05TourImage" style={style}>
    <div class="mdCMN05Info">
      <span class="mdCMN05Dept">{item.dept_city}発</span>
      <span class="mdCMN05Term">{item.term}日間</span>
    </div>
    <div class="mdCMN05Price">
      <span>ツアー料金</span>
      <span class="mdCMN05Tour">
      &yen;{addDigits(item.price_min)} ～ 
      &yen;{addDigits(item.price_max)}</span>
    </div>
  </div>
  <dl class="mdCMN05City">
    <dt>宿泊地</dt>
    <dd>
      <ul>
      {#each destinations as city}
        <li>{city}</li>
      {/each}
      </ul>
    </dd>
  </dl>
  <p class="mdCMN05Desc">{item.title}</p>
</div>