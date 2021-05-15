<template>
  <section :class="['loading-page', { loaded: !loading }]">
    <div class="container">
      <div class="triangle"></div>
      <div class="triangle"></div>
    </div>
    <div class="container">
      <div class="triangle"></div>
      <div class="triangle"></div>
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    loading: true,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped lang="scss">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
@keyframes first {
  0% {
    transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866)
      translate(143.33%, 110%);
  }
  33% {
    transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866)
      translate(-76.67%, -120%);
  }
  66% {
    transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866)
      translate(-76.67%, 112%);
  }
}
@keyframes last {
  0% {
    transform: rotate(0deg) skewX(-30deg) scale(1, 0.866) translate(-100%, -4%);
  }
  33% {
    transform: rotate(0deg) skewX(-30deg) scale(1, 0.866) translate(134%, -4%);
  }
  66% {
    transform: rotate(0deg) skewX(-30deg) scale(1, 0.866) translate(-89%, -214%);
  }
}

.container {
  position: absolute;
  animation: rotate 3s linear infinite;
  min-height: 200px;
  border-radius: 50%;
  height: 400px;
  width: 400px;
  border: 2px dashed #ffffff;
  transition: all 0.3s ease-in-out;
  &:before {
    position: absolute;
    content: '';
    height: calc(100% + 40px);
    width: calc(100% + 40px);
    border: 2px dashed #fdb302;
    border-radius: inherit;
    animation: rotate 3.2s 0.3s reverse infinite;
  }
  &:after {
    position: absolute;
    content: '';
    height: calc(100% + 80px);
    width: calc(100% + 80px);
    border: 2px dashed #0740a9;
    animation: rotate 2.5s 0.5s reverse infinite;

    border-radius: inherit;
  }
}
.container:last-of-type {
  z-index: -1;
  margin: 1%;
}

.triangle {
  position: relative;
  text-align: left;
  transform-origin: 33.33% 66.66%;
}
.triangle:before,
.triangle:after {
  content: '';
  position: absolute;
  background: inherit;
}
.triangle,
.triangle:before,
.triangle:after {
  width: 2.3em;
  height: 2.3em;
  border-top-right-radius: 20%;
}
.triangle:before {
  transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
    translate(0, -50%);
}
.triangle:after {
  transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
}
.triangle:first-of-type {
  background: #fdb302;
  transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866)
    translate(143.33%, 110%);
  animation: first 3s cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
}
.triangle:last-of-type {
  background: #0740a9;
  transform: rotate(0deg) skewX(-30deg) scale(1, 0.866) translate(-100%, -4%);
  animation: last 3s cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
}
.triangle.shadow,
.triangle.shadow:before,
.triangle.shadow:after {
  background: #a0f5d0;
  backface-visibility: hidden;
  perspective: 1000;
  filter: blur(0.5em);
}
.loading-page {
  background-image: url('~/assets/img/app_bg.jpg');
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 200000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-out;
  &.loaded {
    opacity: 0.1;
    z-index: 0;
    .container {
      width: 550px;
      height: 550px;
    }
  }
}
</style>
