<template>
  <section class="main-content">
    <PerfectScrollbar class="pt-10">
      <div class="theme-title2">
        <span class="main">{{ userDetails.first_name }}'s</span>
        <span class="sub">Wallet</span>
      </div>
      <div class="wallet--container">
        <vs-button
          class="wallet--item btc-btn op-88 theme-btn uk-padding-remove"
        >
          <div class="wallet-breakdown"></div>
          <trend-chart
            :datasets="[
              {
                data: btcChartData,
                fill: true,
                className: 'btc-chart',
                smooth: true,
              },
            ]"
          />
        </vs-button>
        <vs-button
          class="wallet--item eth-btn op-88 theme-btn uk-padding-remove"
        >
          <trend-chart
            :datasets="[
              {
                data: ethChartData,
                fill: true,
                className: 'eth-chart',
                smooth: true,
              },
            ]"
          />
        </vs-button>
        <vs-button
          class="wallet--item ltc-btn op-88 theme-btn uk-padding-remove"
        >
          <trend-chart
            :datasets="[
              {
                data: litecoinChartData,
                fill: true,
                className: 'ltc-chart',
                smooth: true,
              },
            ]"
          />
        </vs-button>
        <vs-button
          class="wallet--item op-88 dash-btn theme-btn uk-padding-remove"
        >
          <trend-chart
            :datasets="[
              {
                data: dashChartData,
                fill: true,
                className: 'dash-chart',
                smooth: true,
              },
            ]"
          />
        </vs-button>
      </div>
    </PerfectScrollbar>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "main",
  middleware: "query",
  data() {
    return {};
  },
  computed: {
    userDetails() {
      return this.$store.state.auth.user;
    },
    ...mapGetters({
      btcData: "chart/btcData",
      ethData: "chart/ethData",
      litecoinData: "chart/litecoinData",
      dashData: "chart/dashData",
      btcChartData: "chart/btcChartData",
      ethChartData: "chart/ethChartData",
      litecoinChartData: "chart/litecoinChartData",
      dashChartData: "chart/dashChartData",
      data: "chart/chartData",
      daysInterval: "chart/daysInterval",
      priceCurrency: "chart/priceCurrency",
      bitcoinCurrency: "chart/bitcoinCurrency",
      ethereumCurrency: "chart/ethereumCurrency",
      litecoinCurrency: "chart/litecoinCurrency",
      dashcoinCurrency: "chart/dashcoinCurrency",
      hourPeriod: "chart/hourPeriod",
      monthPeriod: "chart/monthPeriod",
      yearPeriod: "chart/yearPeriod",
      dayPeriod: "chart/dayPeriod",
      weekPeriod: "chart/weekPeriod",
      allPeriod: "chart/allPeriod",
    }),
  },
  mounted() {
    setTimeout(() => {
      this.$nuxt.$loading.finish();
    }, 700);
    // eslint-disable-next-line no-console
  },
  beforeDestroy() {
    this.$nuxt.$loading.start();
  },
};
</script>

<style scoped></style>
