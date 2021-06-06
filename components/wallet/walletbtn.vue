<template>
  <vs-button
    class="wallet--item btc-btn op-88 theme-btn uk-padding-remove"
    :class="coinData.btnClass"
    :to="coinData.address"
  >
    <div class="wallet-breakdown uk-flex">
      <div class="breakdown-left">
        <img class="logo" :src="coinData.asset_name.img" alt="" />
      </div>
      <div class="breakdown-right">
        <div class="wallet--top">
          <div class="logo-coin">
            <div>
              <div class="coin-name">
                <h3>{{ coinData.asset_name.name }}</h3>
                <p>{{ coinData.currency }}</p>
              </div>
            </div>
          </div>
          <div class="coin-balance">
            <h3>{{ coinData.balance | doubleForm }}</h3>
            <p>0.00 USD</p>
          </div>
        </div>
        <hr />
        <div class="wallet-bottom">
          <div class="dollar-bal">${{ coinData.price | formatNumber }}</div>
          <div
            class="percent"
            :class="{
              danger: coinData.change < 0,
              success: coinData.change > 0,
            }"
          >
            {{ coinData.change | doubleForm }}%
          </div>
        </div>
      </div>
    </div>
    <trend-chart
      :datasets="[
        {
          data: coinData.coinChart,
          fill: true,
          className: coinData.className,
          smooth: true,
        },
      ]"
    />
  </vs-button>
</template>

<script>
  export default {
    name: 'WalletBtn',
    props: {
      coinData: {
        type: Object,
        default: null,
        required: false,
      },
    },
    data() {
      return {}
    },
  }
</script>

<style scoped></style>
