<template>
  <vs-button class="wallet--item">
    <div class="card">
      <h5>Line Styles</h5>
      <Chart type="line" :data="lineStylesData" :options="basicOptions" />
    </div>
    <div>
      <img src="~/assets/img/energy.png" alt="" />
      <h4>Buy Electricity</h4>
    </div>
  </vs-button>
</template>

<script>
export default {
  name: 'WalletBtn',
  data() {
    return {
      multiAxisOptions: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
      lineStylesData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#42A5F5',
          },
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#66BB6A',
          },
          {
            label: 'Third Dataset',
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: '#FFA726',
            backgroundColor: 'rgba(255,167,38,0.2)',
          },
        ],
      },
      basicOptions: null,
    }
  },
}
</script>

<style scoped></style>
