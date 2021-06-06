export const state = () => ({
  onboarded: false,
  activeBiller: {},
})

export const mutations = {
  setOnboarded(state, value) {
    state.onboarded = value
    console.log('onboarded updated')
  },
  setActiveBiller(state, value) {
    state.activeBiller = value
  },
}
export const actions = {
  async nuxtServerInit({ commit, dispatch, redirect }, { req }) {
    await console.log('in nuxt Server init')
    await dispatch('chart/getCoinData')
    await dispatch('syncData')
  },
  async syncData(store) {
    await store.dispatch(
      'chart/getBitcoinData',
      store.getters['chart/hourPeriod']
    )
    await store.dispatch(
      'chart/getEthPriceData',
      store.getters['chart/hourPeriod']
    )
    await store.dispatch(
      'chart/getLtcPriceData',
      store.getters['chart/hourPeriod']
    )
    await store.dispatch(
      'chart/getDashPriceData',
      store.getters['chart/hourPeriod']
    )
  },
}

export const getters = {
  onboarded(state) {
    return state.onboarded
  },
  activeBiller(state) {
    return state.activeBiller
  },
}
