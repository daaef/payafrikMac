<template>
  <home-content />
</template>

<script>
  export default {
    layout: 'main',
    middleware: 'query',
    data() {
      return {
        text: null,
        activeSidebar: false,
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
    },
    beforeMount() {
      // this.getUserTransactions(this.baseUrl + 'transactions/transactions')
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 700)
      // eslint-disable-next-line no-console
    },
    methods: {
      greet() {
        this.$toast.add({ severity: 'info', summary: 'Hello ' + this.text })
      },
    },
  }
</script>

<style></style>
