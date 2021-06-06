import Vue from 'vue'
import Vuesax from 'vuesax'
import 'boxicons/css/boxicons.min.css'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import TrendChart from 'vue-trend-chart'

Vue.use(TrendChart)
Vue.use(PerfectScrollbar)
Vue.use(Vuesax)

UIkit.use(Icons)

const numeral = require('numeral')

const empty = require('is-empty')
const eventBus = {}

Vue.prototype.$isEmpty = empty
eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue()
}

Vue.filter('formatNumber', function (value) {
  return numeral(value).format('0,0') // displaying other groupings/separators is possible, look at the docs
})

Vue.filter('formatNumberLong', function (value) {
  return numeral(value).format('0,0.000') // displaying other groupings/separators is possible, look at the docs
})

Vue.filter('doubleForm', function (value) {
  return numeral(value).format('0,0.00') // displaying other groupings/separators is possible, look at the docs
})

Vue.filter('exchangeFilter', function (value) {
  return numeral(value).format('0,0.0000000') // displaying other groupings/separators is possible, look at the docs
})
