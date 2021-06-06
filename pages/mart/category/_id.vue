<template>
  <section class="main-content">
    <PerfectScrollbar>
      <h3 v-if="!$isEmpty(billers)" class="theme-color">
        {{ billers[0].categoryname }}
      </h3>
      <div v-if="loadingBillers" class="prod--grid grid-category">
        <vs-button class="grid--item">
          <div>
            <h4 class="uk-light"></h4>
            <h5></h5>
            <h5 class="btc-color"></h5>
          </div>
        </vs-button>
      </div>
      <div v-else class="prod--grid grid-category">
        <vs-button
          v-for="(data, index) in billers"
          :key="index"
          class="grid--item"
          @click="setBillerAndNavigate($event, data)"
        >
          <div>
            <h4 class="uk-light">
              {{ data.billername.toLowerCase() }}
            </h4>
            <h5>{{ data.narration }}</h5>
            <h5 class="btc-color">{{ data.categoryname }}</h5>
          </div>
        </vs-button>
      </div>
    </PerfectScrollbar>
  </section>
</template>

<script>
  export default {
    name: 'Id',
    layout: 'main',
    middleware: 'query',
    data() {
      return {
        interswitchBaseUrl: process.env.interswitchBaseUrl,
        loadingBillers: false,
        billers: [],
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      category() {
        return this.$route.params.id
      },
      currentBiller() {
        return this.billers.filter((biller) => {
          return biller.categoryid === this.category
        })
      },
    },
    mounted() {
      this.getCategoryBillers()
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 700)
      // eslint-disable-next-line no-console
    },
    beforeDestroy() {
      this.$nuxt.$loading.start()
    },
    methods: {
      async getCategoryBillers() {
        this.loadingBillers = true
        try {
          const billersResponse = await this.$axios.$get(
            this.interswitchBaseUrl + 'billers/category/' + this.category
          )
          console.log(billersResponse)
          if (billersResponse.status === true && billersResponse.data) {
            this.billers = billersResponse.data
          } else {
            this.billers = []
          }
          this.loadingBillers = false
        } catch (e) {
          // this.$toast.error(e.response.data.error)
          this.loadingBillers = false
          console.log(e)
        }
      },

      setBillerAndNavigate(e, biller) {
        this.$store.commit('setActiveBiller', biller)
        console.log('working here...')
        this.$router.push({
          name: 'mart-biller-id',
          params: {
            id: biller.billerid,
          },
        })
      },
    },
  }
</script>

<style scoped>
  h3 {
    font-size: 2rem;
  }
</style>
