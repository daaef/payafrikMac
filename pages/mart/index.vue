<template>
  <section class="main-content">
    <PerfectScrollbar>
      <div class="uk-padding-small">
        <h4 class="uk-text-muted">My Favorites</h4>
        <div class="wallet--btns">
          <div>
            <vs-button floating size="xl" icon border>
              <i class="bx bx-plus"></i>
            </vs-button>
            <p>Buy</p>
          </div>
        </div>
        <div class="uk-flex uk-flex-between uk-flex-middle">
          <h4 class="uk-text-muted">Categories</h4>
          <vs-input
            v-model="search"
            type="search"
            state="dark"
            :loading="loading"
            icon-after
            label-placeholder="Search"
            @input="onSearching"
          >
            <template #icon>
              <i class="bx bx-search"></i>
            </template>
          </vs-input>
        </div>
        <div v-if="$isEmpty(searchData)" class="prod--grid grid-2">
          <vs-button class="grid--item" to="/mart/category/1">
            <div>
              <img src="~/assets/img/energy.png" alt="Buy Electricity" />
              <h4>Utilities</h4>
            </div>
          </vs-button>
          <vs-button class="grid--item" to="/mart/category/4">
            <div>
              <img src="~/assets/img/telcos.jpg" alt="" />
              <h4>Cable TV</h4>
            </div>
          </vs-button>
          <vs-button class="grid--item" to="/mart/category/5">
            <div>
              <img src="~/assets/img/mart-utilities.png" alt="" />
              <h4>Mobile Recharge</h4>
            </div>
          </vs-button>
          <vs-button class="grid--item" to="/buy-crypto">
            <div>
              <img src="~/assets/img/blockchain.png" alt="" />
              <h4>Betting & Lottery</h4>
            </div>
          </vs-button>
          <vs-button class="grid--item" to="/exchange">
            <div>
              <img src="~/assets/img/bitcoin-exchange.png" alt="" />
              <h4>Travel & Hotel</h4>
            </div>
          </vs-button>
          <vs-button class="grid--item">
            <div>
              <img src="~/assets/img/remote-control.png" alt="" />
              <h4>Online Shopping</h4>
            </div>
          </vs-button>
          <vs-button class="grid--item">
            <div>
              <img src="~/assets/img/stock.png" alt="" />
              <h4>School & Exam Fees</h4>
            </div>
          </vs-button>
          <vs-button class="grid--item" to="/transactions">
            <div>
              <img src="~/assets/img/clock.png" alt="" />
              <h4>Credit & Loans</h4>
            </div>
          </vs-button>
          <vs-button class="grid--item">
            <div>
              <img src="~/assets/img/clock.png" alt="" />
              <h4>More</h4>
            </div>
          </vs-button>
        </div>
        <div v-else class="prod--grid grid-3">
          <vs-button
            v-for="(data, index) in searchData"
            :key="index"
            class="grid--item"
            :to="`/mart/category/${data.categoryid}`"
          >
            <div>
              <h4 class="uk-light">
                {{ data.billername.toLowerCase() }}
              </h4>
              <h3 class="btc-color">{{ data.categoryname }}</h3>
            </div>
          </vs-button>
        </div>
      </div>
    </PerfectScrollbar>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Index',
    layout: 'main',
    middleware: 'query',
    data() {
      return {
        search: '',
        searching: false,
        searchData: [],
        loading: false,
        loadedMore: false,
        billerCategories: [],
        baseUrl: process.env.baseUrl,
        interswitchBaseUrl: process.env.interswitchBaseUrl,
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      ...mapGetters({
        services: 'data/services',
        categories: 'data/categories',
        billers: 'data/billers',
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
    methods: {
      onSearching(e) {
        this.searchData = this.billers.filter((data) => {
          return data.billername.toLowerCase().includes(e)
        })
        if (this.$isEmpty(this.search)) {
          this.searchData = []
        }
      },
      async getBillerCategories() {
        this.loading = true
        try {
          const categoriesResponse = await this.$axios.$get(
            this.interswitchBaseUrl + 'categories'
          )
          console.log(categoriesResponse)
          if (categoriesResponse.status === true) {
            this.billerCategories = categoriesResponse.data
            this.loadedMore = true
          }
          this.loading = false
        } catch (e) {
          // this.$toast.error(e.response.data.error)
          this.loading = false
          console.log(e)
        }
      },
    },
  }
</script>

<style scoped>
  .bx-plus {
    font-size: 4rem;
  }
</style>
