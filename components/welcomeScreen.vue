<template>
  <div class="welcome">
    <div class="content">
      <div class="cl-logo">
        <img src="~/assets/img/logo.png" alt="" />
      </div>
      <ul class="auth-boxes">
        <nuxt-link to="/" tag="li" class="register-btn">
          <vs-button class="theme-btn" shadow> Register </vs-button>
        </nuxt-link>
        <nuxt-link to="/auth/login" tag="li" class="login-btn">
          <vs-button class="theme-btn" shadow> Login </vs-button>
        </nuxt-link>
      </ul>
    </div>
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
  },
}
</script>

<style scoped lang="scss">
@keyframes rotate2 {
  from {
    transform: rotate(0deg) translate(-50%, -50%) scale(1.2);
    transform-origin: top left;
  }
  to {
    transform: rotate(-360deg) translate(-50%, -50%) scale(1.2);
    transform-origin: top left;
  }
}
.welcome {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    .cl-logo {
      text-align: center;
      img {
        height: 80px;
      }
    }
    .auth-boxes {
      padding: 0;
      display: flex;
      width: 550px;
      justify-content: space-between;
      margin-top: 50px;
      .register-btn,
      .login-btn {
        width: 250px;
        height: 250px;
        position: relative;
        button {
          width: 100%;
          height: 100%;
          font-size: 2rem;
          position: relative;
          background: transparent;
          border-radius: 12px;
          padding: 2px;
          &:before {
            content: '';
            position: absolute;
            background: transparent;
            height: calc(100% + 2px);
            width: calc(100% + 2px);
            top: calc(50% + 0px);
            left: calc(50% + 0px);
            transform: translate(-50%, -50%) scale(1.2);
            z-index: 0;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
            transform-origin: center;
            animation: rotate2 1.2s 0.3s reverse infinite;
          }
          &:hover {
            &:before {
              background-image: linear-gradient(to left, #fdb302, #0740a9);
            }
          }
        }
      }
      .register-btn {
        button {
          color: #fafafa;
        }
      }
      .login-btn {
        button {
          color: #fafafa;
        }
      }
    }
  }
}
</style>
