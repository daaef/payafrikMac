import webpack from 'webpack'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    baseUrl: process.env.BASE_URL || 'https://api.payafrik.io/',
    interswitchBaseUrl: 'https://payafrik.immanuel.com.ng/v1/api/interswitch/',
    superPayBaseUrl: 'https://payafrik.immanuel.com.ng/v1/api/superpay/',
    // interswitchBaseUrl: 'http://localhost:5000/v1/api/interswitch/'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title:
      'PayAfrik | A digital financial institution powered by the blockchain',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Helping merchants and users utilise the verities of blockchain technology for value exchange by implementing seamless smart services while eliminating the risk of price fluctuations.',
      },
      { name: 'author', content: 'Afekhide Gbadamosi' },
      { name: 'copyright', content: 'PAYAFRIK WORLD CONNECT LTD' },
      {
        name: 'keywords',
        content:
          'bitcoin, ethereum, litecoin, payafrik, pay, payment, dashcoin, blockchain, pay bills, airtime, crypto, mtn, aedc, power',
      },
      {
        name:
          'twitter:PayAfrik (A digital financial institution powered by the blockchain)',
        content: 'A digital financial institution powered by the blockchain',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vuesax/dist/vuesax.css', '~/assets/scss/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuesax',
    { src: '~/plugins/persistedState.client.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  loading: '~/components/loader.vue',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    [
      'primevue/nuxt',
      {
        theme: 'md-light-indigo',
        ripple: true,
        components: [
          'InputText',
          'InputNumber',
          'Button',
          'Toast',
          'Dropdown',
          'Password',
          'Divider',
          'Chart',
          'Sidebar',
          'Calendar',
          'TabView',
          'TabPanel',
        ],
      },
    ],
    'nuxt-highcharts',
    'nuxt-validate',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.payafrik.io/',
    debug: true,
    credentials: false,
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
      },
    },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/accounts/signin/', method: 'post' },
          logout: { url: '/auth/user/logout/', method: 'post' },
          user: { url: '/auth/user/profile/', method: 'get' },
        },
        user: {
          property: false,
        },
        token: {
          type: '',
          property: 'data.token',
          maxAge: 3600,
        },
      },
    },
    redirect: {
      login: '/auth/welcome',
      logout: '/auth/welcome',
      home: '/',
    },
    fullPathRedirect: true,
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      /primevue/,
      { src: 'vue-image-crop-upload', mode: 'client' },
      'vee-validate/dist/rules',
    ],
    plugins: [
      new webpack.IgnorePlugin({
        // eslint-disable-next-line
        resourceRegExp: /\@highcharts\/map\-collection/,
      }),
    ],
  },
  router: {
    middleware: ['auth'],
    linkExactActiveClass: 'active',
  },
}
