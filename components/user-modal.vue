<template>
  <div class="userdetail-content">
    <div class="uk-width-2-3@m u-details">
      <PerfectScrollbar>
        <div class="mod-top">
          <label class="img-btn">
            <vs-avatar class="bg-avatar" size="90">
              <img v-if="avatar !== ''" :src="avatar" alt="User Avatar" />
              <template v-else #text>
                {{ userDetails.first_name }} {{ userDetails.last_name }}
              </template>
            </vs-avatar>
            <input
              class="uk-hidden"
              type="file"
              @change="onFileChange($event, 'KYC-SELFIE', 'FRONT')"
            />
          </label>
          <div class="title-togglers uk-margin-top">
            <vs-button
              :class="[{ 'active-title': profile }, 'bg-remove']"
              :disabled="profile"
              @click="toggleTitle(true)"
            >
              <div class="theme-title">
                <span class="main">USER</span>
                <span class="sub">profile</span>
              </div>
            </vs-button>
            <vs-button
              :class="[{ 'active-title': !profile }, 'bg-remove']"
              :disabled="!profile"
              @click="toggleTitle(false)"
            >
              <div class="theme-title">
                <span class="main">KYC</span>
                <span class="sub">documents</span>
              </div>
            </vs-button>
          </div>
        </div>
        <div v-if="profile" class="user-profile">
          <div class="mod-inputs">
            <div class="p-field">
              <span class="p-float-label">
                <InputText
                  id="uname"
                  v-model="uname"
                  type="text"
                  :disabled="true"
                />
                <label for="uname">Username</label>
              </span>
            </div>
            <div class="p-field">
              <span class="p-float-label">
                <InputText
                  id="pnum"
                  v-model="pnum"
                  type="text"
                  :disabled="true"
                />
                <label for="pnum">Phone Number</label>
              </span>
            </div>
            <div class="p-field">
              <span class="p-float-label">
                <InputText
                  id="fname"
                  v-model="fname"
                  type="text"
                  :disabled="cantEdit"
                />
                <label for="fname">First Name</label>
              </span>
            </div>
            <div class="p-field">
              <span class="p-float-label">
                <InputText
                  id="lname"
                  v-model="lname"
                  type="text"
                  :disabled="cantEdit"
                />
                <label for="lname">Last Name</label>
              </span>
            </div>
            <div class="p-field">
              <span class="p-float-label">
                <InputText
                  id="email"
                  v-model="email"
                  type="email"
                  :disabled="cantEdit"
                />
                <label for="email">Email</label>
              </span>
            </div>
            <div class="p-field">
              <span class="p-float-label">
                <InputText
                  id="gender"
                  v-model="gender"
                  type="text"
                  :disabled="cantEdit"
                />
                <Dropdown
                  v-model="selectedGender"
                  :options="genders"
                  option-label="name"
                  :disabled="cantEdit"
                />
                <label for="gender">Gender</label>
              </span>
            </div>
            <div class="p-field">
              <span class="p-float-label">
                <Calendar
                  id="dob"
                  v-model="dob"
                  :show-icon="true"
                  :disabled="cantEdit"
                  date-format="yy-mm-dd"
                />
                <label for="dob">Date Of Birth</label>
              </span>
            </div>
          </div>
          <div class="det-act-btns uk-margin-top">
            <vs-button
              v-if="cantEdit"
              class="theme-btn"
              dark
              shadow
              @click.prevent="cantEdit = false"
            >
              EDIT
            </vs-button>
            <vs-button
              v-else
              class="theme-btn"
              :loading="processing"
              shadow
              @click="updateProfile"
            >
              Update
            </vs-button>
          </div>
        </div>
        <div v-else class="rem-uploads">
          <div class="kyc-docs">
            <vs-button class="theme-btn" :disabled="cantEdit">
              <label class="img-btn" for="pass1">
                <div class="btn-card">
                  <i class="bx theme-color bxs-plane-alt"></i>
                  <h3>International Passport Page 1</h3>
                </div>
                <input
                  id="pass1"
                  class="uk-hidden"
                  type="file"
                  @change="onFileChange($event, 'PASSPORT', 'PAGE-ONE')"
                />
              </label>
            </vs-button>
            <vs-button class="theme-btn" :disabled="cantEdit">
              <label class="img-btn" for="pass2">
                <div class="btn-card">
                  <i class="bx theme-color bxs-plane-alt"></i>
                  <h3>International Passport Page 2</h3>
                </div>
                <input
                  id="pass2"
                  class="uk-hidden"
                  type="file"
                  @change="onFileChange($event, 'PASSPORT', 'PAGE-TWO')"
                />
              </label>
            </vs-button>
            <vs-button class="theme-btn" :disabled="cantEdit">
              <label class="img-btn" for="nid1">
                <div class="btn-card">
                  <i class="bx theme-color bx-id-card"></i>
                  <h3>National ID (Front)</h3>
                </div>
                <input
                  id="nid1"
                  class="uk-hidden"
                  type="file"
                  @change="onFileChange($event, 'NATIONAL-ID', 'FRONT')"
                />
              </label>
            </vs-button>
            <vs-button class="theme-btn" :disabled="cantEdit">
              <label class="img-btn" for="nid2">
                <div class="btn-card">
                  <i class="bx theme-color bx-id-card"></i>
                  <h3>National ID (Back)</h3>
                </div>
                <input
                  id="nid2"
                  class="uk-hidden"
                  type="file"
                  @change="onFileChange($event, 'NATIONAL-ID', 'BACK')"
                />
              </label>
            </vs-button>
          </div>
          <div class="det-act-btns uk-margin-top">
            <vs-button
              v-if="cantEdit"
              class="theme-btn"
              dark
              shadow
              @click.prevent="cantEdit = false"
            >
              UPDATE KYC
            </vs-button>
            <vs-button
              v-else
              class="theme-btn"
              :loading="processing"
              shadow
              @click.prevent="cantEdit = true"
            >
              DISABLE
            </vs-button>
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserModal",
  data() {
    return {
      profile: true,
      uname: "",
      pnum: "",
      avatar: "",
      fname: "",
      lname: "",
      email: "",
      docType: "",
      docSide: "",
      uploadedFile: "",
      fileName: "",
      selectedGender: [{ name: "", value: "" }],
      genders: [
        { name: "Male", value: "M" },
        { name: "Female", value: "F" },
      ],
      dob: null,
      cantEdit: true,
      activeDetail: 0,
      processing: false,
      uploading: false,
      baseUrl: process.env.baseUrl,
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.auth.user;
    },
    gender() {
      return this.selectedGender.value;
    },
  },
  watch: {
    dob(val) {
      console.log(this.$moment(val).format("YYYY-MM-DD"));
    },
  },
  mounted() {
    console.log("Date is", this.$moment().format("YYYY-MM-DD"));
    this.uname = this.userDetails.username;
    this.pnum = this.userDetails.phone;
    this.fname = this.userDetails.first_name;
    this.lname = this.userDetails.last_name;
    this.email = this.userDetails.email;
    this.dob = this.userDetails.dob;
    this.avatar = this.userDetails.avatar;

    if (this.userDetails.gender === "") {
      console.log("gender is", this.userDetails.gender);
      this.selectedGender = "";
    } else {
      console.log("gender from return is", this.userDetails.gender);
      if (this.userDetails.gender === "M") {
        this.selectedGender = {
          name: "Male",
          value: "M",
        };
      } else {
        this.selectedGender = {
          name: "Female",
          value: "F",
        };
      }
    }
  },
  methods: {
    toggleTitle(val) {
      this.profile = val;
      this.cantEdit = true;
    },
    async updateProfile() {
      this.processing = true;
      const payload = {
        first_name: this.fname,
        last_name: this.lname,
        dob: this.$moment(this.dob).format("YYYY-MM-DD"),
        email: this.email,
        gender: this.gender,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: this.$auth.strategy.token.get(),
      };

      console.log("payloads are", payload);
      console.log("Headers", headers);

      try {
        const signupResponse = await this.$axios.$put(
          this.baseUrl + "auth/user/edit-profile/",
          payload,
          { headers }
        );
        console.log("Edit Response", signupResponse);
        await this.getUserDetails();
        this.processing = false;
      } catch (e) {
        console.dir(e);
        this.$vs.notification({
          color: "danger",
          position: "top-right",
          title: "Error!",
          text: `${e.response.data.msg}: Please make sure all ur fields are provided`,
        });
        this.processing = false;
      }
    },

    async getUserDetails() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: this.$auth.strategy.token.get(),
      };

      try {
        const updatedUserDetails = await this.$axios.$get(
          this.baseUrl + "auth/accounts/" + this.userDetails.id + "/",
          { headers }
        );
        updatedUserDetails.token = this.$auth.strategy.token.get();
        console.log("updated user =====>", updatedUserDetails);

        const userLoad = {
          key: "user",
          value: updatedUserDetails,
        };
        this.$store.commit("auth/SET", userLoad);
        this.fname = this.userDetails.first_name;
        this.lname = this.userDetails.last_name;
        this.uname = this.userDetails.username;
        this.pnum = this.userDetails.phone;
        this.email = this.userDetails.email;
        this.dob = this.userDetails.dob;
      } catch (e) {
        this.$vs.notification({
          color: "danger",
          position: "top-right",
          title: "Error!",
          text: `${e.response}`,
        });
        this.importingWallet = false;
        console.log(e);
      }
    },
    onFileChange(e, docType, docSide) {
      this.uploading = true;
      this.docSide = docSide;
      this.docType = docType;
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.uploadedFile = files[0];
      this.fileName = this.uploadedFile.name;
      this.createImage(files[0]);
    },

    createImage(file) {
      const image = new Image();
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log("image is", image);
      this.avatar = image;
      this.uploadKYC();
    },
    log() {
      console.log("card clicked");
    },
    async uploadKYC() {
      await console.log("uploading");
      const formData = new FormData();
      formData.append("file", this.uploadedFile);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: this.$auth.strategy.token.get(),
      };

      try {
        const uploaded = await this.$axios.$post(
          `${this.baseUrl}auth/kyc/${this.docType}/${this.docSide}/`,
          formData,
          { headers }
        );
        console.log(uploaded);
        this.uploadedFile = "";
        this.image = "";
        this.fileName = "";
        await this.getUserDetails();
        this.uploading = false;
      } catch (e) {
        this.importingWallet = false;
        console.log(e.response);
        this.uploading = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.userdetail-content {
  padding: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .p-inputtext {
    color: #fdb302;
    &[id="gender"] {
      position: absolute;
    }
  }
  .p-dropdown.p-component.p-inputwrapper {
    width: 100%;
    background: #080426;
  }
  input {
    width: 100%;
  }
  .p-float-label {
    label {
      background: transparent;
      color: #fafafa;
    }

    .p-inputtext {
      background: #080426 !important;
    }
  }
}

.mod-top {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
}

.mod-inputs {
  margin-top: 30px;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  .p-field {
    margin-bottom: 0;
    &:last-of-type {
      grid-column: 1 / span 2;
    }
  }

  .p-calendar-w-btn {
    background: #080426;
    width: 100%;
  }
  .p-calendar-w-btn .p-datepicker-trigger.p-button span {
    color: #fafafa;
  }
}
.u-details {
  max-height: 90vh;
  height: 90vh;
}
</style>
