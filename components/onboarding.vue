<template>
  <div
    class="uk-position-relative uk-visible-toggle uk-light"
    tabindex="-1"
    uk-slideshow="finite: true"
  >
    <ul class="uk-slideshow-items" uk-height-viewport>
      <li>
        <div class="onboarding">
          <div class="left">
            <h2 class="onb--title">Bills &amp; Utilities</h2>
            <p class="breakdown">
              Pay for your bills, utilities and services with ease.
            </p>
          </div>
          <div class="right">
            <div class="img-hold">
              <img src="~/assets/img/onb-bills.png" alt="" />
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="onboarding">
          <div class="left">
            <h2 class="onb--title">Exchange</h2>
            <p class="breakdown">Swap your crypto with other assets securely</p>
          </div>
          <div class="right">
            <div class="img-hold">
              <img src="~/assets/img/onb-exc.png" alt="" />
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="onboarding">
          <div class="left">
            <h2 class="onb--title">Payout</h2>
            <p class="breakdown">Cashout into any Bank or PayAfrik Smartcard</p>
          </div>
          <div class="right">
            <div class="img-hold">
              <img src="~/assets/img/onb-payout.png" alt="" />
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="onboarding last">
          <div>
            <h2>Your Novel Solution</h2>
            <vs-button
              class="p-button-raised theme-btn uk-width-1-1@m p-button-rounded"
              shadow
              @click="onFin"
            >
              Get Started
            </vs-button>
          </div>
          <div>
            <div class="img-hold">
              <img src="~/assets/img/onb-getstarted.png" alt="" />
            </div>
          </div>
        </div>
      </li>
    </ul>

    <a
      class="uk-position-center-left uk-position-small uk-hidden-hover"
      href="#"
      @click="onSkip"
    >
      SKIP
    </a>
    <a
      class="uk-position-center-right uk-position-small uk-hidden-hover"
      href="#"
      uk-slideshow-item="next"
      >Next</a
    >
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
      }
    },
    mounted() {
      // eslint-disable-next-line no-console
      console.dir(this.$nuxt.$loading)
    },
    methods: {
      greet() {
        this.$toast.add({ severity: 'info', summary: 'Hello ' + this.text })
      },
      onSkip() {
        this.$store.commit('setOnboarded', true)
      },
      onFin() {
        this.$store.commit('setOnboarded', true)
      },
    },
  }
</script>

<style scoped>
  a.uk-position-center-right.uk-position-small.uk-hidden-hover {
    bottom: 0;
    top: unset;
    right: 50%;
    transform: translate(50%, -50%);
    text-decoration: none;
  }
  a.uk-position-center-left.uk-position-small.uk-hidden-hover {
    top: 20px;
    left: unset;
    right: 20px;
    transform: translate(50%, -50%);
    text-decoration: none;
  }
</style>
