<template>
  <v-container class="px-6">
    <!-- Page Header -->
    <div class="mb-6">
      <v-breadcrumbs
        :items="breadcrumbs"
        divider="/"
        class="pa-0"
      ></v-breadcrumbs>
    </div>

    <!-- Key Statistics Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stats-card" outlined>
          <v-card-text>
            <div class="text-overline mb-2">Total Consumers</div>
            <div class="d-flex align-center">
              <v-icon size="36" color="primary" class="mr-3"
                >mdi-account-group</v-icon
              >
              <span class="text-h4 font-weight-bold">{{
                summary.totalConsumers
              }}</span>
            </div>
            <div class="mt-2 text-caption">
              Active: {{ summary.activeConsumers }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stats-card" outlined>
          <v-card-text>
            <div class="text-overline mb-2">Current Month Readings</div>
            <div class="d-flex align-center">
              <v-icon size="36" color="success" class="mr-3"
                >mdi-meter-electric</v-icon
              >
              <span class="text-h4 font-weight-bold">{{
                summary.currentMonthReadings
              }}</span>
            </div>
            <div class="mt-2 text-caption">Total readings this month</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stats-card" outlined>
          <v-card-text>
            <div class="text-overline mb-2">Unpaid Bills</div>
            <div class="d-flex align-center">
              <v-icon size="36" color="warning" class="mr-3"
                >mdi-file-document-alert</v-icon
              >
              <span class="text-h4 font-weight-bold">{{
                summary.totalUnpaidBills
              }}</span>
            </div>
            <div class="mt-2 text-caption">
              Overdue: {{ summary.totalOverdueBills }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stats-card" outlined>
          <v-card-text>
            <div class="text-overline mb-2">Monthly Expenses</div>
            <div class="d-flex align-center">
              <v-icon size="36" color="error" class="mr-3"
                >mdi-currency-php</v-icon
              >
              <span class="text-h4 font-weight-bold">{{
                formatCurrency(summary.monthlyExpenses)
              }}</span>
            </div>
            <div class="mt-2 text-caption">Total expenses this month</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Activities Section -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card outlined class="mb-6">
          <v-card-title
            class="subtitle-1 d-flex align-center grey lighten-4 py-3"
          >
            <v-icon left color="primary">mdi-file-document</v-icon>
            Recent Bills
            <v-spacer></v-spacer>
            <v-btn small text color="primary" @click="viewAllBills">
              View All Bills
            </v-btn>
          </v-card-title>
          <v-list>
            <template v-for="(bill, index) in recentActivities.recentBills">
              <v-list-item :key="bill._id">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium">
                    {{ bill.consumerId.firstName }}
                    {{ bill.consumerId.lastName }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    Bill No: {{ bill.billNumber }} | Amount: ₱{{
                      formatCurrency(bill.amount)
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-chip
                    small
                    :color="getBillStatusColor(bill.status)"
                    text-color="white"
                  >
                    {{ bill.status }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="index < recentActivities.recentBills.length - 1"
                :key="`divider-${bill._id}`"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title
            class="subtitle-1 d-flex align-center grey lighten-4 py-3"
          >
            <v-icon left color="primary">mdi-meter-electric</v-icon>
            Recent Meter Readings
            <v-spacer></v-spacer>
            <v-btn small text color="primary" @click="viewAllReadings">
              View All Readings
            </v-btn>
          </v-card-title>
          <v-list>
            <template
              v-for="(reading, index) in recentActivities.recentReadings"
            >
              <v-list-item :key="reading._id">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium">
                    {{ reading.consumerId.firstName }}
                    {{ reading.consumerId.lastName }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    Reading: {{ reading.currentReading }} m³ | Previous:
                    {{ reading.previousReading }} m³
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-chip small color="info" text-color="white">
                    {{ formatDate(reading.readingDate) }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="index < recentActivities.recentReadings.length - 1"
                :key="`divider-${reading._id}`"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DashboardPage",

  data: () => ({
    breadcrumbs: [
      { text: "Home", disabled: true },
      { text: "Dashboard", disabled: true },
    ],
  }),

  computed: {
    ...mapState("dashboards", ["summary", "recentActivities"]),
  },

  async created() {
    await this.fetchAllDashboardData();
  },

  methods: {
    ...mapActions("dashboards", ["fetchAllDashboardData"]),

    formatDate(date) {
      return new Date(date).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    formatCurrency(value) {
      return new Intl.NumberFormat("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    },

    getBillStatusColor(status) {
      return (
        {
          paid: "success",
          unpaid: "warning",
          overdue: "error",
        }[status] || "grey"
      );
    },

    viewAllBills() {
      this.$router.push("/admin/billing");
    },

    viewAllReadings() {
      this.$router.push("/admin/readings");
    },
  },
};
</script>

<style scoped>
.stats-card {
  border-left: 4px solid !important;
}

.stats-card:nth-child(1) {
  border-left-color: var(--v-primary-base) !important;
}

.stats-card:nth-child(2) {
  border-left-color: var(--v-success-base) !important;
}

.stats-card:nth-child(3) {
  border-left-color: var(--v-warning-base) !important;
}

.stats-card:nth-child(4) {
  border-left-color: var(--v-error-base) !important;
}

.v-card__title {
  border-bottom: 1px solid #e0e0e0;
}

.text-overline {
  color: #666;
  font-weight: 500;
}
</style>
