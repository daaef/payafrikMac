<template>
  <div class="slider">
    <div
      class="uk-position-relative uk-visible-toggle uk-light"
      tabindex="-1"
      uk-slideshow="autoplay: true"
    >
      <ul class="uk-slideshow-items">
        <li>
          <div>
            <img class="slide-img" src="~/assets/img/slide1.png" alt="slide1" />
          </div>
        </li>
        <li>
          <div>
            <img class="slide-img" src="~/assets/img/slide2.png" alt="slide1" />
          </div>
        </li>
        <li>
          <div>
            <img class="slide-img" src="~/assets/img/slide3.png" alt="slide1" />
          </div>
        </li>
        <li>
          <div>
            <img class="slide-img" src="~/assets/img/slide4.png" alt="slide1" />
          </div>
        </li>
        <li>
          <div>
            <img class="slide-img" src="~/assets/img/slide5.png" alt="slide1" />
          </div>
        </li>
        <li>
          <div>
            <img class="slide-img" src="~/assets/img/slide6.png" alt="slide1" />
          </div>
        </li>
        <li>
          <div>
            <img class="slide-img" src="~/assets/img/slide7.png" alt="slide1" />
          </div>
        </li>
      </ul>

      <a
        class="uk-position-center-left uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-previous
        uk-slideshow-item="previous"
      ></a>
      <a
        class="uk-position-center-right uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-next
        uk-slideshow-item="next"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSlider',
}
</script>

<style scoped></style>
