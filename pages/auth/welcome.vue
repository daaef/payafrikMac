<template>
  <div class="container welcome-page">
    <transition name="fade" mode="out-in">
      <onboarding v-if="!onboarded" key="on" />
      <welcomeScreen v-else key="off" else />
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
      }
    },
    computed: {
      onboarded() {
        return this.$store.state.onboarded
      },
    },
    mounted() {
      setTimeout(() => {
        this.greet()
        this.$nuxt.$loading.finish()
      }, 700)
      console.dir('response is', this.$auth.$state)
    },
    beforeDestroy() {
      this.$nuxt.$loading.start()
    },
    methods: {
      greet() {
        console.log('store infor', this.$store.$auth.$state.onboarded)
        this.$toast.add({ severity: 'info', summary: 'Hello ' + this.text })
      },
    },
  }
</script>

<style></style>
