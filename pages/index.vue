<template>
  <lazy-home-content />
</template>

<script>
export default {
  layout: "main",
  middleware: "query",
  data() {
    return {
      text: null,
      active: "home",
      activeSidebar: false,
    };
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
  methods: {
    greet() {
      this.$toast.add({ severity: "info", summary: "Hello " + this.text });
    },
  },
};
</script>

<style></style>
