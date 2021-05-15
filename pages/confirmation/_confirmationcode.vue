<template>
  <div class="content-wrapper">
    <a class="back-btn" @click.prevent="to">
      <i class="pi pi-arrow-left"></i>
    </a>
    <nuxt-link class="reg-btn" to="/auth/register"> REGISTER </nuxt-link>
    <div class="login--data">
      <div class="auth--data">
        <div class="auth-logo">
          <img src="~/assets/img/logo.png" alt="" />
        </div>
        <h3 class="uk-text-center uk-light">
          <span>Please Verify your Phone Number to Proceed</span>
        </h3>
        <div class="p-inputgroup uk-margin-bottom">
          <span class="p-inputgroup-addon">
            <Dropdown
              v-model="selectedCountry"
              :options="countryCodes"
              option-label="name"
              :filter="true"
              placeholder="Select a Country"
            >
              <template #value="slotProps">
                <div
                  v-if="slotProps.value"
                  class="country-item country-item-value"
                >
                  <div class="uk-margin-small-right">
                    (+{{ slotProps.value.number }})
                  </div>
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <img :src="slotProps.option.flag" />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </span>
          <InputText
            id="username"
            v-model="number"
            placeholder="Phone Number"
          />
        </div>
        <span v-if="!resendCode">
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock-open"></i>
            </span>
            <Password v-model="pin" placeholder="Pin" :feedback="false" />
          </div>
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-key"></i>
            </span>
            <InputText
              id="username"
              v-model="vercode"
              placeholder="Verification code sent to you"
            />
          </div>
        </span>
        <div class="uk-margin-top">
          <vs-button class="theme-btn" shadow>
            <span v-if="!resendCode">Verify Phone Number </span>
            <span v-else>Resend Verification Code </span>
          </vs-button>
        </div>
        <p v-if="!resendCode" class="uk-text-center theme-color">
          Didn't get a code?
          <a href="#" @click.prevent="resend(true)">Resend now</a>
        </p>
        <p v-else class="uk-text-center theme-color">
          Already got the code?
          <a href="#" @click.prevent="resend(false)">Confirm</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  layout: 'auth',
  mounted() {
    setTimeout(() => {
      this.$nuxt.$loading.finish()
    }, 700)
  },
  beforeDestroy() {
    this.$nuxt.$loading.start()
  },
  methods: {
    to() {
      this.$router.go(-1)
    },
  },
}
</script>
