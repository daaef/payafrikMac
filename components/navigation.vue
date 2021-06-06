<template>
  <div class="">
    <vs-navbar v-model="active" shadow square hide-scroll center-collapsed>
      <template #left>
        <vs-button flat icon @click="activeSidebar = !activeSidebar">
          <i class="bx bx-menu"></i>
        </vs-button>
      </template>
      <vs-navbar-item id="guide" to="/" :active="$route.name === 'index'">
        <i class="bx bxs-home"></i> Home
      </vs-navbar-item>
      <vs-navbar-item id="docs" to="/wallet" :active="$route.name === 'wallet'">
        <i class="bx bxs-wallet-alt"></i> Wallet
      </vs-navbar-item>
      <vs-navbar-item
        id="components"
        to="/mart"
        :active="$route.name.includes('mart')"
      >
        <i class="bx bxs-cart"></i> Mart
      </vs-navbar-item>
      <vs-navbar-item
        id="license"
        to="/exchange"
        :active="$route.name === 'exchange'"
      >
        <i class="bx bx-transfer-alt"></i> Swap
      </vs-navbar-item>
      <!--      <vs-navbar-item id="license" :active="$route.name === 'power'">
        <i class="bx bxs-bulb"></i> Power
      </vs-navbar-item>-->
      <template #right>
        <vs-button class="def-btn profile-btn" @click="userModal = true">
          <i class="bx bxs-user-pin"></i>
        </vs-button>
      </template>
    </vs-navbar>
    <vs-sidebar v-model="active" absolute :open.sync="activeSidebar">
      <template #logo>
        <vs-avatar class="theme-bg bg-avatar" size="90">
          <img
            v-if="userDetails.avatar !== ''"
            :src="userDetails.avatar"
            alt="User Avatar"
          />
          <template v-else #text>
            {{ userDetails.first_name }} {{ userDetails.last_name }}
          </template>
        </vs-avatar>
      </template>
      <div class="p-x-20">
        <h4 class="theme-color uk-text-small uk-margin-remove">
          {{ userDetails.first_name }} {{ userDetails.last_name }}
        </h4>
      </div>
      <vs-sidebar-item id="home">
        <template #icon>
          <i class="bx bx-credit-card-front"></i>
        </template>
        Smart Card
      </vs-sidebar-item>
      <vs-sidebar-item id="market">
        <template #icon>
          <i class="bx bx-receipt"></i>
        </template>
        Transaction History
      </vs-sidebar-item>
      <vs-sidebar-item id="Music">
        <template #icon>
          <i class="bx bxs-help-circle"></i>
        </template>
        Help / Support
      </vs-sidebar-item>
      <vs-sidebar-item>
        <template #icon>
          <i class="bx bx-group"></i>
        </template>
        Join the Community
      </vs-sidebar-item>
      <template #footer>
        <vs-row justify="space-between">
          <vs-tooltip danger right>
            <vs-avatar danger>
              <a class="text-link" href="#" @click="logoutUser">
                <i class="pi pi-sign-out"></i>
              </a>
            </vs-avatar>
            <template #tooltip> LogOut </template>
          </vs-tooltip>

          <!--          <vs-avatar badge-color="danger" badge-position="top-right">
            <i class="bx bx-bell"></i>
            <template #badge> 28 </template>
          </vs-avatar>-->
        </vs-row>
      </template>
    </vs-sidebar>
    <Sidebar
      :visible.sync="userModal"
      class="user-modal"
      :base-z-index="10000"
      position="full"
    >
      <lazy-user-modal></lazy-user-modal>
    </Sidebar>
  </div>
</template>

<script>
  export default {
    name: 'NavNSidebar',
    data: () => ({
      active: 'home',
      activeSidebar: false,
      userModal: false,
    }),
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
    },
    methods: {
      logoutUser() {
        this.$nuxt.$loading.start()
        this.$auth.logout()
      },
    },
  }
</script>

<style scoped>
  .user-modal,
  .p-sidebar {
    background: rgba(11, 9, 48, 0.98);
    height: 100%;
    width: 100%;
    z-index: 10000 !important;
  }
</style>
