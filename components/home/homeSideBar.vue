<template>
  <section class="sidebar">
    <PerfectScrollbar>
      <div class="account-box">
        <div class="account--balance">
          <span>
            <span class="token--title">TOKEN BALANCE</span>
            <span class="token--balance">{{
              userDetails.balance | doubleForm
            }}</span>
          </span>
        </div>
        <section class="uk-margin-small-top uk-width-1-1@m">
          <vs-button class="theme-btn">TOP UP</vs-button>
          <vs-button class="theme-btn uk-margin-small-top">WITHDRAW</vs-button>
          <vs-button class="theme-btn uk-margin-small-top">TRANSFER</vs-button>
        </section>
      </div>
      <h4 class="transaction--tilte">Latest Activities</h4>
      <lazy-home-activity
        v-for="(transaction, index) in transfers.slice(0, 3)"
        :key="index"
        :transaction="transaction"
      />
      <vs-button transparent class="view-all-trans-btn"
        >View All Transactions</vs-button
      >
    </PerfectScrollbar>
  </section>
</template>

<script>
  export default {
    name: 'HomeSideBar',
    data() {
      return {
        active: 'home',
        baseUrl: process.env.baseUrl,
        transfers: [],
        loadingTransfers: '',
        transfersPagination: {},
        nextPageUrl: '',
        previousPageUrl: '',
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
    },
    mounted() {
      this.getUserTransactions(this.baseUrl + 'transactions/transactions')
      // eslint-disable-next-line no-console
    },
    methods: {
      async getUserTransactions(url) {
        this.transfers = []
        this.loadingTransfers = true
        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.strategy.token.get(),
        }

        try {
          const userTransactionsResponse = await this.$axios.$get(url, {
            headers,
          })
          console.log('User transactions ==>', userTransactionsResponse)

          if (
            this.transfersPagination.itemsPerPage >
            userTransactionsResponse.count
          ) {
            this.transfersPagination.itemsPerPage =
              userTransactionsResponse.count
          }

          this.nextPageUrl = userTransactionsResponse.next
          this.previousPageUrl = userTransactionsResponse.previous

          this.transfersPagination.totalRecords = userTransactionsResponse.count
          this.transfers = userTransactionsResponse.results
          this.loadingTransfers = false
        } catch (e) {
          // this.$toast.error(e.response.data.detail)
          console.log(e.response.data.detail)
          this.loadingTransfers = false
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .account-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #17164f;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    .account--balance {
      width: 12rem;
      height: 12rem;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      &:before {
        content: '';
        background: #0f0537;
        position: absolute;
        border: 1px solid #1d3a71;
        box-sizing: border-box;
        box-shadow: 0px 0px 20px 10px rgba(65, 84, 255, 0.25);
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: pulseShadow 5s linear infinite;
      }
      span {
        display: block;
        position: relative;
        text-align: center;
        .token--title {
          font-size: 0.9rem;
          color: #fafafa;
        }
        .token--balance {
          font-size: 1.1rem;
          color: #fafafa;
          font-weight: 600;
        }
      }
    }
    .theme-btn {
      font-size: 0.9rem;
    }
  }
  .transaction--tilte {
    margin: 10px 0;
    color: #fafafa;
  }
  .view-all-trans-btn {
    font-size: 1rem;
    color: #fafafa;
  }
</style>
