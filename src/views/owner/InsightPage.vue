<template>
  <v-container>
    <v-responsive>
          <v-row>
            <v-col cols="12">
              <h1>Reservations Insights</h1>
              <p>On this page you can see reservations insights in general and per property.</p>
              <br>
            </v-col>
            <v-col cols="6">
          <highcharts class="hc" :options="reservationsChartOptions" ref="reservationsChart"></highcharts>
            </v-col>
            <v-col cols="6">
          <highcharts class="hc" :options="topRevenueChartOptions" ref="topRevenueChartOptions"></highcharts>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h1>Revenue Insights</h1>
              <p>On this page you can see revenue insights in general and per property.</p>
              <br>
              <highcharts class="hc" :options="revenueChartOptions" ref="revenueChart"></highcharts>
              <br>
            </v-col>
          </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: "InsightPage",
  data() {
    return {
      revenueChartOptions: {
        title: {
          text: 'Revenue',
          align: 'left'
        },

        subtitle: {
          text: 'The amount of revenue per week',
          align: 'left'
        },
        xAxis: {
          type: "datetime",
          tickInterval: 1 * 24 * 3600 * 1000, // one day
          tickWidth: 2,
          gridLineWidth: 1,
          labels: {
            align: 'left',
            x: 3,
            y: -3
          }
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            className: 'popup-on-click',
            marker: {
              lineWidth: 1
            }
          }
        },
        series: [{
          name: 'Cabana Florilor',
          data: [[1685559669000, 400], [1685732469000, 300], [1686164469000, 100]] // sample data
        },
          {
            name: 'Casa Flori De Nuc',
            data: [[1685559669000, 0], [1685732469000, 250], [1686164469000, 230]] // sample data
          }
        ]
      },
      reservationsChartOptions: {
        title: {
          text: 'Reservations',
          align: 'left'
        },

        subtitle: {
          text: 'The amount of reservations per cabin',
          align: 'left'
        },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Cabin',
          colorByPoint: true,
          type: "pie",
          data: [{
            name: 'Cabana Florilor',
            y: 70.67,
          }, {
            name: 'Casa Flori de Nuc',
            y: 30.33
          }]
        }]
      },
      topRevenueChartOptions: {
        title: {
          text: 'Top Revenue',
          align: 'left'
        },

        subtitle: {
          text: 'The amount of revenue per cabin',
          align: 'left'
        },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Cabin',
          colorByPoint: true,
          type: "pie",
          data: [{
            name: 'Cabana Florilor',
            y: 93,
          }, {
            name: 'Casa Flori de Nuc',
            y: 7,
          }]
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>
