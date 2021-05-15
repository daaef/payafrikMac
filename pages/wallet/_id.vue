<template>
  <div class="content-wrapper"></div>
</template>

<script>
export default {
  name: "Index",
  layout: "auth",
  mounted() {
    setTimeout(() => {
      this.$nuxt.$loading.finish();
    }, 700);
  },
  beforeDestroy() {
    this.$nuxt.$loading.start();
  },
  methods: {
    to() {
      this.$router.go(-1);
    },
  },
};
</script>
