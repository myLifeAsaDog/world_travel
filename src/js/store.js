import { writable, derived } from 'svelte/store'

const DEPARTURE_MAP = [
  { code: 'TYO', name: '東京' },
  { code: 'NGO', name: '名古屋' },
  { code: 'OSA', name: '大阪' },
  { code: 'FUK', name: '福岡' },
  { code: '999', name: 'その他' },
]

const SEAT_CLASS_MAP = [
  { code: 0, name: 'エコノミー' },
  { code: 2, name: 'プレミアムエコノミー' },
  { code: 1, name: 'ビジネス' },
  { code: 3, name: 'ファースト' },
]

const ORDER_MAP = [
  { code: 5, name: 'おすすめ順' },
  { code: 0, name: '新着順' },
  { code: 1, name: '料金が安い順' },
  { code: 2, name: '料金が高い順' },
  { code: 3, name: '期間が短い順' },
  { code: 4, name: '期間が長い順' },
]

/** ページ遷移 */
const router = () => {
  const { subscribe, set } = writable(0)
  return {
    subscribe,
    index: () => set(0),
    search: () => set(1),
    list: () => set(2),
  }
}

/** 出発地 */
const departure = () => {
  const { subscribe, set } = writable('TYO')
  return {
    subscribe,
    nameMap: DEPARTURE_MAP,
    changeDept: (deptCode) => set(deptCode),
  }
}

/** 座席クラス */
const seatClass = () => {
  const { subscribe, set } = writable(0)
  return {
    subscribe,
    nameMap: SEAT_CLASS_MAP,
    changeSeat: (seatCode) => set(seatCode),
  }
}

/** 並び順 */
const orderList = () => {
  const { subscribe, set } = writable(5)
  return {
    subscribe,
    nameMap: ORDER_MAP,
    changeOrder: (orderCode) => set(orderCode),
  }
}

/** 検索パネル */
const searchOverlay = () => {
  const { subscribe, set } = writable(false)
  return {
    subscribe,
    closePanel: () => set(false),
    openPanel: () => set(true),
  }
}

/** 国家と地域 */
const countries = () => {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    getCountryList: async (areaCode) => {
      const res = await fetch(`./data/countryList_${areaCode}.json`)
      const countries = await res.json()
      set(countries)
    },
  }
}

/** 都市 */
const cities = () => {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    getCityList: async (countryCode) => {
      const res = await fetch(`./api/cityList.php?countryCode=${countryCode}`)
      const cites = await res.json()
      set(cites)
    },
  }
}

/** 検索結果 */
const defaultTour = {
  result: 0,
  result_start: 0,
  tourList: [{
    id: null,
    title: null,
    last_update: null,
    url: null,
    term: null,
    brand: null,
    dept_city: null,
    price_min: null,
    price_max: null,
    image: null,
    seat_class: null,
    city_summary: null,
    hotel_summary: null,
    theme: null,
    sche: [],
    airline_summary: null,
  }],
}

const tours = () => {
  const { subscribe, set } = writable({ result: 0, result_start: 0, tourList: [] })
  return {
    subscribe,
    getTourlList: async (dataParams) => {
      const res = await fetch(`./api/tourList.php?countryCode=${dataParams.countryCode}&cityCode=${dataParams.cityCode}&deptCity=${dataParams.deptCity}&seatClass=${dataParams.seatClass}&order=${dataParams.order}&pageStart=${dataParams.pageStart}`)
      const tours = await res.json()
      tours.tourList.length ? set(tours) : set(defaultTour)
    },
  }
}

/** ツアー詳細オーバーレイ */
const detailOverlay = () => {
  const { subscribe, set } = writable(false)
  return {
    subscribe,
    closePanel: () => set(false),
    openPanel: () => set(true),
  }
}
/** 検索条件 */
const searchParams = () => derived(
  [countryStore, cityStore, deptStore, seatStore, orderStore],
  ([$countryStore, $cityStore, $deptStore, $seatStore, $orderStore]) => {
    return {
      countryCode: $countryStore.code,
      cityCode: $cityStore.code,
      deptCity: $deptStore,
      seatClass: $seatStore,
      order: $orderStore,
      pageStart: 1,
    }
  }
)

export const routerStore = router()
export const deptStore = departure()
export const seatStore = seatClass()
export const orderStore = orderList()
export const searchOverlayStore = searchOverlay()
export const destStore = writable('area')
export const areaStore = writable({ code: '', name: '' })
export const countryStore = writable([])
export const countryList = countries()
export const cityStore = writable([])
export const cityList = cities()
export const tourStore = writable({})
export const tourList = tours()
export const detailOverlayStore = detailOverlay()
export const tourDetail = writable({})
export const searchParamsDerived = searchParams()
