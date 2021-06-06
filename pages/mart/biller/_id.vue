<template>
  <section class="main-content">
    <PerfectScrollbar> </PerfectScrollbar>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Id',
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
        activeBiller: 'activeBiller',
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
