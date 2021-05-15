<template>
  <div class=""></div>
</template>

<script>
export default {
  name: "Index",
  layout: "main",
  middleware: "query",
  data() {
    return {};
  },
  computed: {
    userDetails() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    setTimeout(() => {
      this.$nuxt.$loading.finish();
    }, 700);
    // eslint-disable-next-line no-console
  },
  beforeDestroy() {
    this.$nuxt.$loading.start();
  },
};
</script>

<style scoped></style>
