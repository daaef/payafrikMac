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
          <span>Verify your Phone number</span>
        </h3>
        <p class="uk-light">
          Enter the Phone number of the account you wish to verify
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
            v-validate="'required|min:10|max:11|numeric'"
            name="number"
            placeholder="Phone Number"
          />
          <span class="err-msg">{{ errors.first('number') }}</span>
        </div>
        <span v-if="!resendCode">
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock-open"></i>
            </span>
            <Password
              v-model="pin"
              v-validate="'required|min:4|max:4|numeric'"
              placeholder="Pin"
              name="pin"
              :feedback="false"
            />
            <span class="err-msg">{{ errors.first('pin') }}</span>
          </div>
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-key"></i>
            </span>
            <InputText
              id="username"
              v-model="vercode"
              v-validate="'required|min:4|max:4|numeric'"
              name="code"
              placeholder="Verification code sent to you"
            />
            <span class="err-msg">{{ errors.first('code') }}</span>
          </div>
        </span>
        <div class="uk-margin-top">
          <vs-button
            :loading="processing"
            class="theme-btn"
            shadow
            @click.prevent="verifyPhone"
          >
            <span v-if="!resendCode">Verify Phone Number </span>
            <span v-else>Resend Verification Code </span>
          </vs-button>
        </div>
        <p v-if="!resendCode" class="uk-text-center theme-color">
          Didn't get a code?
          <a href="#" @click.prevent="toggleRes(true)">Resend now</a>
        </p>
        <p v-else class="uk-text-center theme-color">
          Already got the code?
          <a href="#" @click.prevent="toggleRes(false)">Confirm</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Index',
    layout: 'auth',
    auth: 'guest',
    data() {
      return {
        number: '',
        selectedCountry: {
          name: 'Nigeria',
          flag:
            'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
          number: '234',
        },
        pin: '',
        vercode: '',
        baseUrl: process.env.baseUrl,
        resendCode: false,
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
      toggleRes(action) {
        this.resendCode = action
      },
      async resendOTP() {
        console.log('resending')
        if (this.errors.items.length === 0) {
          const payload = {
            username: this.fullUser,
          }
          console.log(payload)

          const headers = {
            'Content-Type': 'application/json',
            'X-PFK-DT': 'B',
          }

          try {
            const resendResponse = await this.$axios.$post(
              `${this.baseUrl}auth/accounts/resend-otp/`,
              payload,
              { headers }
            )
            console.log(resendResponse)
            /*
          this.$vs.notification({
            key: 'updatable',
            message: 'Success!',
            description: 'Activation code resent, please try again',
            duration: 0,
          }) */
            this.$vs.notification({
              color: 'success',
              position: 'top-right',
              title: 'Success!',
              text: `${resendResponse.msg}`,
            })
            this.resendCode = false
            this.processing = false
          } catch (e) {
            console.log(JSON.stringify(e))
            this.$vs.notification({
              color: 'danger',
              position: 'top-right',
              title: 'Error!',
              text: `${e.response.data.msg}`,
            })
            this.processing = false
          }
        }
      },
      async verifyPhone() {
        await this.$validator.validateAll()
        this.processing = true
        if (this.resendCode) {
          await this.resendOTP()
        } else if (this.errors.items.length === 0) {
          const payload = {
            username: this.fullUser,
            password: this.pin,
            nonce: this.vercode,
          }
          console.log(payload)

          const headers = {
            'Content-Type': 'application/json',
            'X-PFK-DT': 'B',
          }

          try {
            await this.$axios.$post(
              this.baseUrl + 'auth/accounts/verify-phone/',
              payload,
              { headers }
            )

            // this.authenticate(signInResponse)
            this.$vs.notification({
              color: 'success',
              position: 'top-right',
              title: 'Success!',
              text: 'Account activated successfully, you can now log in.',
            })
            await this.$router.push('/auth/login')
            // this.processing = false;
          } catch (e) {
            console.log(JSON.stringify(e))
            this.$vs.notification({
              color: 'danger',
              position: 'top-right',
              title: 'Error!',
              text: `${e.response.data.msg}`,
            })
            this.processing = false
          }
          this.processing = false
        }
      },
      to() {
        this.$router.go(-1)
      },
    },
  }
</script>

<style scoped></style>
