<template>
  <section class="main-content">
    <PerfectScrollbar>
      <div class="chart--data">
        <vs-button shadow class="bg-remove back-btn" @click.prevent="to">
          <i class="bx bx-left-arrow-alt" :class="data.currClass"></i>
        </vs-button>
        <div class="uk-text-center crypto-logo">
          <img :src="data.asset_name.img" alt="" />
        </div>
        <div class="uk-text-center crypto-balance">
          <h2 :class="data.currClass">
            {{ data.balance | doubleForm }} {{ data.currency }}
          </h2>
          <p>$ {{ (data.balance * data.price) | doubleForm }} USD</p>
        </div>
        <div class="wallet--actions">
          <div class="wallet--btns">
            <div>
              <vs-button floating circle size="xl" icon color="#fafafa" border>
                <i class="bx bx-plus" :class="data.currClass"></i>
              </vs-button>
              <p>Buy</p>
            </div>
            <div>
              <vs-button floating circle size="xl" icon color="#fafafa" border>
                <i class="bx bx-network-chart" :class="data.currClass"></i>
              </vs-button>
              <p>Sell</p>
            </div>
            <Divider layout="vertical" />
            <div>
              <vs-button floating circle size="xl" icon color="#fafafa" border>
                <i class="bx bx-chevron-up" :class="data.currClass"></i>
              </vs-button>
              <p>Send</p>
            </div>
            <div>
              <vs-button floating circle size="xl" icon color="#fafafa" border>
                <i class="bx bx-chevron-down" :class="data.currClass"></i>
              </vs-button>
              <p>Recieve</p>
            </div>
          </div>
        </div>
        <div class="uk-text-center crypto-value">
          <h2 class="text--white">
            <span>$</span>{{ data.price | formatNumber }}<span>USD</span>
          </h2>
          <p :class="data.currClass">1{{ data.currency }}</p>
        </div>
        <div class="chart--space">
          <trend-chart
            :datasets="[
              {
                data: data.coinChart,
                fill: true,
                className: data.className,
                smooth: true,
              },
            ]"
          />
        </div>
      </div>
    </PerfectScrollbar>
  </section>
</template>

<script>
  export default {
    name: 'Index',
    layout: 'main',
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      data() {
        return this.$store.getters[`chart/${this.$route.params.id}Wallet`]
      },
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 700)
    },
    beforeDestroy() {
      this.$nuxt.$loading.start()
    },
    methods: {
      to() {
        this.$router.go(-1)
      },
    },
  }
</script>

<style lang="scss">
  .chart--data {
    padding: 30px 0;
    .crypto-logo {
      img {
        height: 6rem;
      }
    }
    .back-btn {
      position: absolute;
      top: 0;
      i {
        font-size: 2.5rem;
      }
    }

    .crypto-balance {
      h2 {
        margin-top: 10px;
        margin-bottom: 0;
        font-size: 3rem;
      }
      p {
        font-size: 1.1rem;
        margin: 0 0;
        color: #fafafa;
      }
    }
    .crypto-value {
      h2 {
        margin-top: 10px;
        margin-bottom: 0;
        font-size: 2.5rem;
        font-weight: 500;
      }
      p {
        font-size: 2.4rem;
        margin: 0 0;
      }
      span {
        font-size: 1.8rem;
        font-weight: 400;
      }
    }
    .wallet--actions {
      background: #0d1231;
      display: flex;
      justify-content: center;
      padding: 15px 30px;
      border-radius: 80px;
      margin-top: 20px;
      .p-divider.p-divider-vertical:before {
        border-left: solid 1px rgb(169 169 169);
      }
      .wallet--btns {
        display: flex;
        justify-content: space-between;
        min-width: 80%;
        text-align: center;
        .vs-button--floating {
          box-shadow: none;
        }
        i {
          font-size: 3rem;
        }
        p {
          color: #fafafa;
          margin: 5px 0 0;
          font-size: 1.1rem;
        }
      }
    }
  }
</style>
