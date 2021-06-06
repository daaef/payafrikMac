<template>
  <section class="main-content">
    <PerfectScrollbar class="pt-10">
      <div class="theme-title2">
        <span class="main">{{ userDetails.first_name }}'s</span>
        <span class="sub">Wallet</span>
      </div>
      <div class="wallet--container">
        <wallet-btn
          v-for="(datum, index) in data"
          :key="index"
          :coin-data="datum"
        />
      </div>
    </PerfectScrollbar>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import WalletBtn from '~/components/wallet/walletbtn'

  export default {
    components: { WalletBtn },
    layout: 'main',
    middleware: 'query',
    data() {
      return {}
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      ...mapGetters({
        btcData: 'chart/btcData',
        ethData: 'chart/ethData',
        litecoinData: 'chart/litecoinData',
        dashData: 'chart/dashData',
        btcChartData: 'chart/btcChartData',
        ethChartData: 'chart/ethChartData',
        litecoinChartData: 'chart/litecoinChartData',
        dashChartData: 'chart/dashChartData',
        data: 'chart/chartData',
        daysInterval: 'chart/daysInterval',
        priceCurrency: 'chart/priceCurrency',
        bitcoinCurrency: 'chart/bitcoinCurrency',
        ethereumCurrency: 'chart/ethereumCurrency',
        litecoinCurrency: 'chart/litecoinCurrency',
        dashcoinCurrency: 'chart/dashcoinCurrency',
        hourPeriod: 'chart/hourPeriod',
        monthPeriod: 'chart/monthPeriod',
        yearPeriod: 'chart/yearPeriod',
        dayPeriod: 'chart/dayPeriod',
        weekPeriod: 'chart/weekPeriod',
        allPeriod: 'chart/allPeriod',
      }),
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 700)
      // eslint-disable-next-line no-console
    },
    beforeDestroy() {
      this.$nuxt.$loading.start()
    },
  }
</script>

<style scoped></style>
