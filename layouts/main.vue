<template>
  <div class="main--bg">
    <navigation />
    <div class="home-holder">
      <Nuxt />
      <Divider layout="vertical" />
      <lazy-home-side-bar />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: true,
        active: 'home',
        activeSidebar: false,
      }
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 700)
    },
  }
</script>
<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }
  div#__layout {
    position: relative;
  }
  .main--bg {
    height: 100vh;
    width: 100%;
  }
</style>
