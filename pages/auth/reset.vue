<template>
  <div class="content-wrapper">
    <vs-button
      transparent
      shadow
      class="bg-remove back-btn"
      @click.prevent="to"
    >
      <i class="bx bx-left-arrow-alt"></i>
    </vs-button>
    <nuxt-link class="reg-btn" to="/auth/register"> REGISTER </nuxt-link>
    <div class="login--data">
      <div class="auth--data">
        <div class="auth-logo">
          <img src="~/assets/img/logo.png" alt="" />
        </div>
        <h3 class="uk-text-center uk-light">
          <span>Reset Pin</span>
        </h3>
        <p class="uk-light">
          Enter the Phone number of the account you wish to reset
        </p>
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
                  <!--                  <div>{{ slotProps.value.name }}</div>-->
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
        <div v-if="codeSent">
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-key"></i>
            </span>
            <InputText
              id="username"
              v-model="code"
              v-validate="'required|min:4|max:4|numeric'"
              name="code"
              placeholder="Verification code sent to you"
            />
            <span class="err-msg">{{ errors.first('code') }}</span>
          </div>
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock-open"></i>
            </span>
            <Password
              v-model="pin"
              v-validate="'required|min:4|max:4|numeric'"
              090
              placeholder="Pin"
              name="pin"
              :feedback="false"
            />
            <span class="err-msg">{{ errors.first('pin') }}</span>
          </div>
        </div>
        <div class="uk-margin-top">
          <vs-button
            class="theme-btn"
            :loading="processing"
            shadow
            @click.prevent="resetAcc"
          >
            <span v-if="!codeSent">Request Pin Reset </span>
            <span v-else>Reset </span>
          </vs-button>
        </div>
        <p class="uk-text-center theme-color">
          Need to confirm your phone number?
          <nuxt-link to="/confirmation">Click here</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Login',
    layout: 'auth',
    auth: 'guest',
    data() {
      return {
        number: '',
        codeSent: false,
        code: '',
        pin: '',
        selectedCountry: {
          name: 'Nigeria',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
          number: '234',
        },
        baseUrl: process.env.baseUrl,
        processing: false,
      }
    },
    computed: {
      fullUser() {
        return `${this.selectedCountry.number}${
          this.number[0] === '0' ? this.number.slice(1) : this.number
        }`
      },
      ...mapGetters({
        countryCodes: 'data/countryCodes',
      }),
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 700)
    },
    beforeDestroy() {
      this.$nuxt.$loading.start()
    },
    methods: {
      async reqReset() {
        const payload = {
          username: this.fullUser,
        }
        try {
          const requestResponse = await this.$axios.$post(
            this.baseUrl + 'auth/user/request-password-reset/',
            payload
          )
          console.log(requestResponse)
          if (requestResponse.success) {
            this.codeSent = true
          }
          this.$vs.notification({
            color: 'success',
            position: 'top-right',
            title: 'Success!',
            text: `${requestResponse.msg}`,
          })
          // this.authenticate(signInResponse)
          this.processing = false
          this.codeSent = true
        } catch (e) {
          this.$vs.notification({
            color: 'danger',
            position: 'top-right',
            title: 'Error!',
            text: `${JSON.stringify(e.response.data.detail)}`,
          })
          this.processing = false
          console.log(e.response)
        }
      },
      async resetAcc() {
        this.processing = true
        if (!this.codeSent) {
          await this.reqReset()
        } else {
          const payload = {
            username: this.fullUser,
            nonce: this.code,
            password: this.pin,
          }
          console.log(payload)
          this.processing = true
          try {
            const resetResponse = await this.$axios.$post(
              this.baseUrl + 'auth/user/complete-password-reset/',
              payload
            )
            console.log(resetResponse)
            this.$vs.notification({
              color: 'success',
              position: 'top-right',
              title: 'Success!',
              text: `${resetResponse.msg}`,
            })
            // this.authenticate(signInResponse)
            await this.$router.push('/auth/login')
            this.processing = false
          } catch (e) {
            this.$vs.notification({
              color: 'danger',
              position: 'top-right',
              title: 'Error!',
              text: `${JSON.stringify(e.response.data.error)}`,
            })

            this.processing = false
            console.log(e.response)
          }
        }
        /* const payload {
        username: this.fullUser
      } */
      },
      to() {
        this.$router.go(-1)
      },
    },
  }
</script>
