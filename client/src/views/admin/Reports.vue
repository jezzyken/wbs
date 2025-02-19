<template>
  <v-container class="px-6">
    <div class="mb-6">
      <v-breadcrumbs
        :items="breadcrumbs"
        divider="/"
        class="pa-0"
      ></v-breadcrumbs>
    </div>

    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="reportType"
              :items="reportTypes"
              label="Report Type"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="periodType"
              :items="periodTypes"
              label="Period"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-if="periodType === 'daily'">
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedDate"
                  label="Select Date"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="selectedDate"
                no-title
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-if="periodType === 'monthly'">
            <v-menu
              v-model="monthMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedMonth"
                  label="Select Month"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="selectedMonth"
                type="month"
                no-title
                @input="monthMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-btn
              color="primary"
              block
              :loading="isLoading"
              @click="generateReport"
            >
              Generate Report
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Summary Cards -->
    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card height="150">
          <!-- Add fixed height -->
          <v-card-text>
            <div class="text-h6 mb-2">Total Collections</div>
            <div class="text-h4">₱{{ formatNumber(totalCollections) }}</div>
            <div class="text-caption">
              {{ totalTransactions.collections }} transactions
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" md="4">
        <v-card height="150">
          <v-card-text>
            <div class="text-h6 mb-2">Total Received</div>
            <div class="text-h4">₱{{ formatNumber(totalReceived) }}</div>
          </v-card-text>
        </v-card>
      </v-col> -->
      <v-col cols="12" md="4">
        <v-card height="150">
          <v-card-text>
            <div class="text-h6 mb-2">Total Expenses</div>
            <div class="text-h4">₱{{ formatNumber(totalExpenses) }}</div>
            <div class="text-caption">
              {{ totalTransactions.expenses }} transactions
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="150">
          <v-card-text>
            <div class="text-h6 mb-2">Net Income</div>
            <div class="text-h4" :class="netIncomeClass">
              ₱{{ formatNumber(netIncome) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Data Tables -->
    <v-row>
      <v-col cols="12">
        <v-card v-if="reportType === 'collections'">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Collections Detail</span>
            <v-btn color="primary" @click="exportData" text>
              <v-icon left>mdi-download</v-icon> Export
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="collectionHeaders"
            :items="collections.data"
            :loading="collections.loading"
            :items-per-page="10"
          >
            <template v-slot:item.createdAt="{ item }">
              {{ formatDateTime(item.createdAt) }}
            </template>
            <template v-slot:item.consumerId="{ item }">
              <div>{{ formatConsumerName(item.consumerId) }}</div>
              <div class="text-caption">{{ item?.consumerId?.accountNo }}</div>
            </template>
            <template v-slot:item.amount="{ item }">
              ₱{{ formatNumber(item.amount) }}
            </template>
            <template v-slot:item.amountReceived="{ item }">
              ₱{{ formatNumber(item.amountReceived) }}
            </template>
            <template v-slot:item.change="{ item }">
              ₱{{ formatNumber(item.change) }}
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :color="getStatusColor(item.status)" small>
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>

        <v-card v-else>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Expenses Detail</span>
            <v-btn color="primary" @click="exportData" text>
              <v-icon left>mdi-download</v-icon> Export
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="expenseHeaders"
            :items="expenses.data"
            :loading="expenses.loading"
            :items-per-page="10"
          >
            <template v-slot:item.date="{ item }">
              {{ formatDateTime(item.date) }}
            </template>
            <template v-slot:item.amount="{ item }">
              ₱{{ formatNumber(item.amount) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Payment Breakdowns -->
    <!-- <v-row v-if="reportType === 'collections'" class="mt-6">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>By Payment Method</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item v-for="(amount, method) in collectionsByPaymentMethod" :key="method">
                <v-list-item-content>
                  <v-list-item-title>{{ method }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>₱{{ formatNumber(amount) }}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>By Payment Type</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item v-for="(amount, type) in collectionsByPaymentType" :key="type">
                <v-list-item-content>
                  <v-list-item-title>{{ formatPaymentType(type) }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>₱{{ formatNumber(amount) }}</v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ReportsPage",

  data: () => ({
    breadcrumbs: [
      { text: "Home", disabled: false, href: "/" },
      { text: "Reports", disabled: true },
    ],
    reportType: "collections",
    reportTypes: [
      { text: "Collections", value: "collections" },
      { text: "Expenses", value: "expenses" },
    ],
    periodType: "daily",
    periodTypes: [
      { text: "Daily", value: "daily" },
      { text: "Monthly", value: "monthly" },
    ],
    dateMenu: false,
    monthMenu: false,
    selectedDate: new Date().toISOString().substr(0, 10),
    selectedMonth: new Date().toISOString().substr(0, 7),
    collectionHeaders: [
      { text: "Date", value: "createdAt" },
      { text: "Reference No.", value: "referenceNo" },
      { text: "Consumer", value: "consumerId" },
      { text: "Payment Type", value: "paymentType" },
      { text: "Payment Method", value: "paymentMethod" },
      { text: "Amount", value: "amount" },
      // { text: 'Received', value: 'amountReceived' },
      // { text: 'Change', value: 'change' },
      { text: "Status", value: "status" },
    ],
    expenseHeaders: [
      { text: "Date", value: "date" },
      { text: "Type", value: "expenseType" },
      { text: "Description", value: "description" },
      { text: "Amount", value: "amount" },
    ],
  }),

  computed: {
    ...mapState("reports", ["collections", "expenses"]),
    ...mapGetters("reports", [
      "totalCollections",
      "totalExpenses",
      "netIncome",
      "totalReceived",
      "totalChange",
      "totalTransactions",
      "collectionsByPaymentMethod",
      "collectionsByPaymentType",
    ]),

    formattedDate() {
      return this.selectedDate;
    },

    formattedMonth() {
      return this.selectedMonth;
    },

    isLoading() {
      return this.collections.loading || this.expenses.loading;
    },

    netIncomeClass() {
      return this.netIncome >= 0 ? "success--text" : "error--text";
    },
  },

  methods: {
    ...mapActions("reports", [
      "fetchDailyCollections",
      "fetchMonthlyCollections",
      "fetchDailyExpenses",
      "fetchMonthlyExpenses",
    ]),

    formatNumber(value) {
      return new Intl.NumberFormat("en-PH").format(value || 0);
    },

    formatDateTime(date) {
      return new Date(date).toLocaleString("en-PH");
    },

    formatConsumerName(consumer) {
      if (!consumer) return "";
      let name = `${consumer.firstName}`;
      if (consumer.middleName) {
        name += ` ${consumer.middleName.charAt(0)}.`;
      }
      name += ` ${consumer.lastName}`;
      if (consumer.nameExtension) {
        name += ` ${consumer.nameExtension}`;
      }
      return name;
    },

    formatPaymentType(type) {
      return type
        .split("_")
        .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ");
    },

    getStatusColor(status) {
      const colors = {
        completed: "success",
        pending: "warning",
        failed: "error",
        reversed: "grey",
      };
      return colors[status] || "grey";
    },

    async generateReport() {
      try {
        if (this.reportType === "collections") {
          if (this.periodType === "daily") {
            await this.fetchDailyCollections(this.selectedDate);
          } else {
            const [year, month] = this.selectedMonth.split("-");
            await this.fetchMonthlyCollections({
              month: parseInt(month),
              year: parseInt(year),
            });
          }
        } else {
          if (this.periodType === "daily") {
            await this.fetchDailyExpenses(this.selectedDate);
          } else {
            const [year, month] = this.selectedMonth.split("-");
            await this.fetchMonthlyExpenses({
              month: parseInt(month),
              year: parseInt(year),
            });
          }
        }
      } catch (error) {
        // Handle error - show notification
        console.error("Error generating report:", error);
      }
    },

    exportData() {
      const data =
        this.reportType === "collections"
          ? this.collections.data
          : this.expenses.data;
      // Implement export logic here
    },
  },

  async created() {
    await this.generateReport();
  },
};
</script>

<style scoped>
.v-data-table ::v-deep th {
  font-weight: 600 !important;
}

.v-data-table ::v-deep td {
  font-size: 14px !important;
}
</style>
