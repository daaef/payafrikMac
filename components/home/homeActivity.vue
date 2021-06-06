<template>
  <vs-button class="activity--holder">
    <div class="activity">
      <div class="trans-icon">
        <i
          v-if="transaction.status === 'SUCCESSFUL'"
          class="bx bxs-check-circle"
        ></i>
        <!--        <i class="bx bxs-x-circle"></i>-->
        <i v-else class="bx bxs-error"></i>
      </div>
      <div class="trans-content">
        <h3 class="trans-title">{{ transaction.transaction_type }}</h3>
        <h3 class="trans-value">
          {{ transaction.sent_amount | doubleForm }} {{ transaction.wallet }}
        </h3>
        <span class="trans-date">{{
          $moment(transaction.updated).format('MMMM D, YYYY LT')
        }}</span>
      </div>

      <div class="trans-status">
        <span>{{ transaction.status }}</span>
      </div>
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
    width: 100%;
    .activity {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      grid-gap: 10px;
      width: 100%;
    }
    .trans-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      .bxs-check-circle {
        color: #068a5d;
        font-size: 1.3rem;
      }
      .bxs-x-circle {
        color: #b00020;
        font-size: 1.3rem;
      }
      .bxs-error {
        color: #fdb302;
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
