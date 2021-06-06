<template>
  <section class="main-content">
    <PerfectScrollbar>
      <lazy-home-slider />
      <div class="prod--grid">
        <vs-button class="grid--item" to="/mart/category/1">
          <div>
            <img src="~/assets/img/energy.png" alt="Buy Electricity" />
            <h4>Buy Electricity</h4>
          </div>
        </vs-button>
        <vs-button class="grid--item" to="/mart/category/4">
          <div>
            <img src="~/assets/img/telcos.jpg" alt="" />
            <h4>Airtime &amp; Data</h4>
          </div>
        </vs-button>
        <vs-button class="grid--item" to="/mart/category/5">
          <div>
            <img src="~/assets/img/mart-utilities.png" alt="" />
            <h4>Bills &amp; Utilities</h4>
          </div>
        </vs-button>
        <vs-button class="grid--item" to="/buy-crypto">
          <div>
            <img src="~/assets/img/blockchain.png" alt="" />
            <h4>Buy &amp; Sell Crypto</h4>
          </div>
        </vs-button>
        <vs-button class="grid--item" to="/exchange">
          <div>
            <img src="~/assets/img/bitcoin-exchange.png" alt="" />
            <h4>Swap Crypto</h4>
          </div>
        </vs-button>
        <vs-button class="grid--item" disabled>
          <div>
            <img src="~/assets/img/remote-control.png" alt="" />
            <h4>Power Smart Control</h4>
          </div>
        </vs-button>
        <vs-button class="grid--item" disabled>
          <div>
            <img src="~/assets/img/stock.png" alt="" />
            <h4>Stock Market</h4>
          </div>
        </vs-button>
        <vs-button class="grid--item" to="/transactions">
          <div>
            <img src="~/assets/img/clock.png" alt="" />
            <h4>Transactions</h4>
          </div>
        </vs-button>
      </div>
    </PerfectScrollbar>
  </section>
</template>

<script>
  export default {
    name: 'HomeContent',
  }
</script>

<style lang="scss"></style>
