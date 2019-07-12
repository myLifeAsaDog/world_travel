<script>
import { countryStore, cityStore, deptStore, seatStore, orderStore, tourList } from '../../store.js';

const ITEM_PER_PAGE = 50;

$:isStartPage = parseInt($tourList.result_start) === 1;
$:isLastPage = Math.ceil($tourList.result_start / ITEM_PER_PAGE) === Math.ceil($tourList.result / ITEM_PER_PAGE);
$:currentPage = Math.ceil($tourList.result_start / ITEM_PER_PAGE)
$:endOfPage = Math.ceil($tourList.result / ITEM_PER_PAGE);

const onPagerClick = (direction) => {
  let dataParams = {
    countryCode: $countryStore.code,
    cityCode: $cityStore.code,
    deptCity: $deptStore,
    seatClass: $seatStore,
    order: $orderStore,
    pageStart: 1
  }

  switch (direction) {
    case 'prev':
      dataParams.pageStart = parseInt($tourList.result_start) - ITEM_PER_PAGE;
      break;
    case 'next':
      dataParams.pageStart = parseInt($tourList.result_start) + ITEM_PER_PAGE;
      break;
  }

  tourList.getTourlList(dataParams)
}
</script>

<aside>
  <ol class="MdCMN06Pager">
    <li class:ExDisabled={ isStartPage } 
    on:click={() => onPagerClick('prev')}>Prev</li>
    <li>{ currentPage }/{ endOfPage }</li>
    <li class:ExDisabled={ isLastPage } 
    on:click={() => onPagerClick('next')}>Next</li>
  </ol>
</aside>