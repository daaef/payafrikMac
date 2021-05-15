<template>
  <div class="content-wrapper">
    <vs-button shadow class="bg-remove back-btn" @click.prevent="to">
      <i class="bx bx-left-arrow-alt"></i>
    </vs-button>
    <nuxt-link class="reg-btn" to="/auth/register"> REGISTER </nuxt-link>
    <div class="login--data">
      <PerfectScrollbar>
        <div class="auth--data">
          <div class="auth-logo">
            <img src="~/assets/img/logo.png" alt="" />
          </div>
          <h3 class="uk-text-center uk-light">
            <span>Login to Your Account</span>
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
                    <!--                    <div>{{ slotProps.value.name }}</div>-->
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
              v-model="username"
              placeholder="Phone Number"
            />
          </div>
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <Password v-model="pass" placeholder="Pin" :feedback="false" />
          </div>
          <div class="uk-text-center">
            Forgot your Password?
            <nuxt-link class="theme-color" to="/auth/reset"
              >Reset Password</nuxt-link
            >
          </div>
          <div class="uk-margin-top">
            <vs-button
              class="theme-btn"
              :loading="loggingIn"
              shadow
              @click.prevent="login"
            >
              Login
            </vs-button>
          </div>
          <p class="uk-text-center theme-color">
            Need to confirm your phone number?
            <nuxt-link to="/confirmation">Click here</nuxt-link>
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  layout: "auth",
  auth: "guest",
  data() {
    return {
      username: "",
      selectedCountry: {
        name: "Nigeria",
        flag:
          "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
        number: "234",
      },
      loggingIn: false,
      pass: "",
    };
  },
  computed: {
    fullUser() {
      return `${this.selectedCountry.number}${
        this.username[0] === "0" ? this.username.slice(1) : this.username
      }`;
    },
    ...mapGetters({
      countryCodes: "countryCodes",
    }),
  },
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
    async login() {
      const payload = {
        username: this.fullUser,
        password: this.pass,
      };
      this.loggingIn = true;
      try {
        const response = await this.$auth.loginWith("local", {
          data: payload,
        });
        console.log("res is", response);
        this.loggingIn = false;
      } catch (error) {
        this.$vs.notification({
          title: "ERROR!!!",
          progress: "auto",
          color: "danger",
          text: `${error.response.data.msg}`,
        });
        console.error(error);
        this.loggingIn = false;
      }
      // this.$router.push('/')
    },
  },
};
</script>

<style lang="scss"></style>
