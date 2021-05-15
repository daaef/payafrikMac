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
    <nuxt-link class="reg-btn" to="/auth/login"> LOGIN </nuxt-link>
    <div class="login--data">
      <PerfectScrollbar>
        <form class="auth--data">
          <div class="auth-logo">
            <img src="~/assets/img/logo.png" alt="" />
          </div>
          <h3 class="uk-text-center uk-light">
            <span>Create a New Account</span>
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
              v-validate="'required|min:10|max:11|numeric'"
              placeholder="Phone Number"
              name="number"
            />
            <span class="err-msg">{{ errors.first("number") }}</span>
          </div>
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText
              id="fname"
              v-model="fname"
              v-validate="'required|min:4|alpha'"
              name="first"
              placeholder="First Name"
            />
            <span class="err-msg">{{ errors.first("first") }}</span>
          </div>
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText
              id="lname"
              v-model="lname"
              v-validate="'required|min:4|alpha'"
              name="last"
              placeholder="Last Name"
            />
            <span class="err-msg">{{ errors.first("last") }}</span>
          </div>
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock-open"></i>
            </span>
            <Password
              v-model="pass"
              v-validate="'required|min:4|max:4|numeric'"
              name="pin"
              placeholder="Pin"
              :toggle-mask="true"
              :feedback="false"
            />
            <span class="err-msg">{{ errors.first("pin") }}</span>
          </div>
          <div class="p-inputgroup uk-margin-bottom">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <Password
              v-model="pass2"
              v-validate="'required|min:4|max:4|numeric'"
              name="confirm"
              placeholder="Confirm Pin"
              :toggle-mask="true"
              :feedback="false"
            />
            <span class="err-msg">{{ errors.first("confirm") }}</span>
          </div>
          <div class="terms--confirm">
            <span class="uk-light"
              >By clicking the button below, you agree to PayAfrik's</span
            >
            <a href="#" class="theme-color">terms of acceptable use</a>
          </div>
          <div class="uk-margin-top">
            <vs-button
              class="theme-btn"
              :loading="registering"
              shadow
              :disabled="errors.items.length > 0"
              @click.prevent="register"
            >
              Register
            </vs-button>
          </div>
          <p class="uk-text-center theme-color">
            Need to confirm your phone number?
            <nuxt-link to="/confirmation">Click here</nuxt-link>
          </p>
        </form>
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
      pass: "",
      pass2: "",
      fname: "",
      lname: "",
      registering: false,
      baseUrl: process.env.baseUrl,
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
    async register() {
      this.registering = true;
      await this.$validator.validateAll();
      await console.log(this.errors.items);
      const payload = {
        first_name: this.fname,
        last_name: this.lname,
        phone: this.fullUser,
        password: this.pass,
      };

      const headers = {
        "Content-Type": "application/json",
        "X-PFK-DT": "B",
      };
      if (this.errors.items.length > 0) {
        await console.log("There are errors!!!");
        this.registering = false;
      } else if (this.pass === this.pass2) {
        try {
          const signupResponse = await this.$axios.$post(
            this.baseUrl + "auth/accounts/signup/",
            payload,
            { headers }
          );
          await console.log("Signup Response", signupResponse);
          await this.$router.push("/confirmation");
          this.registering = false;
        } catch (e) {
          console.log(e.response);
          this.$vs.notification({
            color: "danger",
            position: "top-right",
            title: "Auth Error!",
            text: `${e.response.data.msg}`,
          });
          this.registering = false;
        }
      }
    },
  },
};
</script>
