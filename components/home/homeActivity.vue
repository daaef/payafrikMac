<template>
  <vs-button class="activity--holder">
    <div class="activity">
      <div class="trans-icon">
        <i class="bx bxs-check-circle"></i>
        <!--      <i class="bx bxs-x-circle"></i>
                                                                                                      <i class="bx bxs-error"></i>-->
      </div>
      <div class="trans-content">
        <h3 class="trans-title">UTILITY PURCHASE</h3>
        <h3 class="trans-value">1000.00 Afritokens</h3>
        <span class="trans-date">December 7, 2021 10:18am</span>
      </div>

      <div class="trans-status"><span>SUCCESSFUL</span></div>
    </div>
  </vs-button>
</template>

<script>
export default {
  name: 'HomeActivity',
  props: {
    transaction: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped lang="scss">
.activity--holder {
  background: #17164f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  text-align: left;
  margin: 10px 0;
  .activity {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-gap: 10px;
  }
  .trans-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    .bxs-check-circle {
      color: #068a5d;
      font-size: 1.3rem;
    }
  }
  .trans-title {
    font-size: 1rem;
    margin: 0;
    color: #fdb302;
  }
  .trans-value {
    font-size: 1rem;
    margin: 0;
    color: #fafafa;
  }
  .trans-status {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: #068a5d;
  }
  .trans-date {
    font-size: 0.8rem;
    color: #707070;
  }
}
</style>
