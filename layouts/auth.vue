<template>
  <div class="auth--bg">
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
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
.auth--bg {
  height: 100vh;
  width: 100%;
  /*background-image: url('~/assets/img/auth_bg.jpg');*/
}
</style>
