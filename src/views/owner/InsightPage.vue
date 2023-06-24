<template>
  <v-container>
    <v-responsive>
          <v-row>
            <v-col cols="12">
              <h1>Overall Insights</h1>
              <p>On this page you can see overall insights in general and per property.</p>
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
              <h1>Reservations Insights</h1>
              <p>On this page you can see reservation insights in general and per property.</p>
              <br>
              <highcharts class="hc" :options="reservationsPerDayChartOptions" ref="revenueChart"></highcharts>
              <br>
            </v-col>
          </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import {useBookingsStore} from "@/store/bookings";

export default {
  name: "InsightPage",
  watch: {
    "bookingsStore.bookings": {
      handler() {
        this.reservationsChartOptions.series[0].data = this.topReservations;
        this.topRevenueChartOptions.series[0].data = this.topRevenue;
        this.reservationsPerDayChartOptions.series = this.bookingsStatistics;
      }
    }
  },
  setup() {
    let bookingsStore = useBookingsStore();
    return {
      bookingsStore: bookingsStore,
    }
  },
  mounted() {
    this.bookingsStore.retrieveBookingsOfOwner();
  },
  computed: {
    bookingsStatistics() {
      let data = []

      let countReservationsByDay = {};
      this.bookingsStore.bookings.forEach(booking => {
        let date = new Date(booking.start_date);
        let cabinName = booking.cabin_name.name;
        date.setHours(0, 0, 0, 0);
        if (countReservationsByDay[cabinName] === undefined) {
          // date is a timestamp
          countReservationsByDay[cabinName] = {
            x: date.getTime(),
            y: 1,
          }
        } else {
          countReservationsByDay[cabinName] = {
            x: date.getTime(),
            y: countReservationsByDay[cabinName].y + 1,
          }
        }
      });

      let reservationsPerDay = {};
      for (const [key, value] of Object.entries(countReservationsByDay)) {
        if (reservationsPerDay[key] === undefined) {
          reservationsPerDay[key] = [[value.x, value.y]];
        } else {
          reservationsPerDay[key].push([value.x, value.y]);
        }
      }

      for (const [key, value] of Object.entries(reservationsPerDay)) {
        data.push({
          name: key,
          data: value,
        })
      }

      return data;
    },
    topRevenue() {
      let totalRevenue = this.bookingsStore.bookings.reduce((acc, booking) => {
        return acc + booking.price;
      }, 0);
      let cabins = {};

      this.bookingsStore.bookings.forEach(booking => {
        if (cabins[booking.cabin_name.name] === undefined) {
          cabins[booking.cabin_name.name] = booking.price;
        } else {
          cabins[booking.cabin_name.name] += booking.price;
        }
      });

      let revenue = []

      for (const [key, value] of Object.entries(cabins)) {
        revenue.push({
          name: key,
          y: value / totalRevenue * 100,
        })
      }

      return revenue;
    },
    topReservations() {
      let totalBookings = this.bookingsStore.bookings.length;
      let cabins = {};

      this.bookingsStore.bookings.forEach(booking => {
        if (cabins[booking.cabin_name.name] === undefined) {
          cabins[booking.cabin_name.name] = 1;
        } else {
          cabins[booking.cabin_name.name] += 1;
        }
      });

      let reservations = []
      for (const [key, value] of Object.entries(cabins)) {
        reservations.push({
          name: key,
          y: value / totalBookings * 100,
        })
      }

      return reservations;
    }
  },
  data() {
    return {
      reservationsPerDayChartOptions: {
        title: {
          text: 'Reservations per day',
          align: 'left'
        },

        subtitle: {
          text: 'The amount of reservations per day in your cabins',
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
          data: []
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
