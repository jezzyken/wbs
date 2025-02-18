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

    <!-- Filter Section -->
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="billingPeriod"
              :items="billingPeriods"
              label="Billing Period"
              dense
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="statusFilter"
              :items="statusItems"
              label="Status"
              dense
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="search"
              label="Consumer ID/Name"
              placeholder="Search consumer..."
              dense
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="zoneFilter"
              :items="zones"
              label="Purok"
              dense
              outlined
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-spacer></v-spacer>
          <v-btn text @click="resetFilters" class="mr-2">Reset</v-btn>
          <!-- <v-btn color="primary" @click="applyFilters">Apply Filter</v-btn> -->
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Tab Navigation -->
    <v-tabs v-model="activeTab" class="mb-6">
      <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
    </v-tabs>

    <!-- Billing Records -->
    <v-card>
      <v-card-title class="d-flex justify-space-between py-4">
        <span class="text-h6">Billing Records</span>
        <div>
          <v-btn color="primary" @click="generateBills">
            <v-icon left>mdi-plus</v-icon>
            Generate Bills
          </v-btn>
        </div>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredBillingRecords"
        :loading="loading"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [10, 20, 50],
          'show-first-last-page': true,
        }"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            small
            label
            text-color="white"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <!-- <v-btn
            small
            text
            color="primary"
            class="mr-2"
            @click="viewBill(item)"
          >
            <v-icon small left>mdi-eye</v-icon>
            View
          </v-btn> -->
          <v-btn
            v-if="item.status !== 'paid'"
            small
            text
            color="primary"
            @click="processBill(item)"
          >
            <v-icon small left>mdi-cash-register</v-icon>
            Process
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <div ref="billContainer" style="display: none">
      <div
        v-for="(billPair, pageIndex) in billPairs"
        :key="pageIndex"
        class="bill-container"
        v-if="billPair && billPair.length > 0"
      >
        <div class="bill-wrapper">
          <bill-template v-if="billPair[0]" :bill="billPair[0]" />
        </div>

        <div v-if="billPair.length > 1">
          <div class="dash-separator"></div>
          <div class="bill-wrapper">
            <bill-template :bill="billPair[1]" />
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment-timezone";
import BillTemplate from "@/components/BillTemplate.vue";
import { BillGenerator } from "@/services/billGenerator";

export default {
  name: "BillingPage",
  components: {
    BillTemplate,
  },
  data: () => ({
    navItems: [
      "Dashboard",
      "Consumer Records",
      "Billing",
      "Payments",
      "Reports",
      "Settings",
    ],
    breadcrumbs: [
      { text: "Home", disabled: false, href: "/" },
      { text: "Billing Management", disabled: true },
    ],
    tabs: ["All Bills", "Pending", "Paid", "Overdue"],
    activeTab: 0,
    search: "",

    statusFilter: "All Status",
    zoneFilter: "All",
    billingPeriod: "February 2025",
    billingPeriods: [],
    statusItems: ["All Status", "Unpaid", "Paid", "Overdue"],
    zones: [
      "All",
      "Purok 1",
      "Purok 2",
      "Purok 3",
      "Purok 4",
      "Purok 5",
      "Purok 6",
      "Purok 7",
    ],
    headers: [
      { text: "Bill Number", value: "billNo", sortable: true },
      { text: "Consumer Name", value: "consumerName", sortable: true },
      { text: "Previous Reading", value: "prevReading", sortable: true },
      { text: "Current Reading", value: "currReading", sortable: true },
      { text: "Consumption", value: "consumption", sortable: true },
      { text: "Amount", value: "amount", sortable: true },
      { text: "Due Date", value: "dueDate", sortable: true },
      { text: "Status", value: "status", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  computed: {
    ...mapState("billings", ["bills", "loading", "error", "billTemplate"]),

    billPairs() {
      const pairs = [];
      for (let i = 0; i < this.billingRecords.length; i += 2) {
        const pair = this.billingRecords.slice(i, i + 2).map((record) => {
          const formattedData = BillGenerator.formatBillData(record);
          return formattedData;
        });
        pairs.push(pair);
      }
      return pairs;
    },

    filteredBillingRecords() {
      return this.billingRecords.filter((bill) => {
        const matchesSearch =
          this.search.toLowerCase() === "" ||
          bill.consumerName.toLowerCase().includes(this.search.toLowerCase()) ||
          bill.consumerId.toLowerCase().includes(this.search.toLowerCase());

        const matchesStatus =
          this.statusFilter === "All Status" ||
          bill.status.toLowerCase() === this.statusFilter.toLowerCase();

        const matchesZone =
          this.zoneFilter === "All" || bill.zone === this.zoneFilter;

        const matchesTab =
          this.tabs[this.activeTab] === "All Bills" ||
          bill.status.toLowerCase() === this.tabs[this.activeTab].toLowerCase();

        return matchesSearch && matchesStatus && matchesZone && matchesTab;
      });
    },

    billingRecords() {
      console.log({ bills: this.bills });
      return this.bills.map((bill) => ({
        billNo: bill.billNo,
        consumerName: `${bill.consumer.firstName} ${bill.consumer.lastName}`,
        consumerId: bill.consumer.consumerId,
        prevReading: bill.meterReading.previousReading,
        currReading: bill.meterReading.currentReading,
        consumption: `${bill.meterReading.consumption} m³`,
        amount: `₱${bill.amount.toFixed(2)}`,
        billing: bill.billingPeriod,
        dueDate: new Date(bill.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: bill.status,
        _id: bill._id,
      }));
    },
  },

  methods: {
    ...mapActions("billings", [
      "fetchBills",
      "createBill",
      "updateBill",
      "fetchBillById",
    ]),

    generateBillingPeriods() {
      const periods = [];
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      months.forEach((month, index) => {
        if (index >= currentMonth) {
          periods.push(`${month} ${currentYear}`);
        }
      });

      this.billingPeriods = periods;

      if (!this.selectedBillingPeriod) {
        this.selectedBillingPeriod = `${months[currentMonth]} ${currentYear}`;
      }
    },

    getStatusColor(status) {
      console.log(status);
      switch (status) {
        case "paid":
          return "success";
        case "unpaid":
          return "warning";
        case "overdue":
          return "error";
        default:
          return "grey";
      }
    },

    resetFilters() {
      this.search = "";
      this.billingPeriod = "February 2025";
      this.statusFilter = "All Status";
      this.zoneFilter = "All Zones";
      this.fetchBills();
    },

    async applyFilters() {
      await this.fetchBills({
        period: this.billingPeriod,
        status: this.statusFilter,
        zone: this.zoneFilter,
        search: this.search,
      });
    },

    async viewBill(item) {
      try {
        const bill = await this.fetchBillById(item._id);
        this.$router.push(`/billing/${bill._id}`);
      } catch (error) {
        console.error("Error fetching bill:", error);
      }
    },

    async processBill(item) {
      try {
        this.$router.push({
          name: "Payments",
          query: {
            billId: item._id,
            consumerId: item.consumerId,
            newConsumer: false,
          },
        });
      } catch (error) {
        console.error("Error processing bill:", error);
      }
    },

    async generateBills() {
      try {
        const container = this.$refs.billContainer;
        console.log("Container:", container); // Add this for debugging
        console.log("Bill Pairs:", this.billPairs); // Add this for debugging

        if (!container) {
          console.error("Bill container not found");
          return;
        }

        // Make sure container is visible before generating PDF
        container.style.display = "block";

        const success = await BillGenerator.generatePDF(container);

        // Hide container after generation
        container.style.display = "none";

        if (success) {
          console.log("PDF generated successfully");
        } else {
          console.error("Failed to generate PDF");
        }
      } catch (error) {
        console.error("Error in generateBills:", error);
      }
    },
    exportData() {
      const data = this.billingRecords;
    },
  },

  async created() {
    this.generateBillingPeriods();
    const date = moment
      .tz(this.billingPeriod, "MMMM YYYY", "Asia/Singapore")
      .startOf("month")
      .format("YYYY-MM-DD");

    await this.fetchBills({ to: date });
  },

  watch: {
    billingPeriod(newValue) {
      const date = moment
        .tz(newValue, "MMMM YYYY", "Asia/Singapore")
        .startOf("month")
        .format("YYYY-MM-DD");

      this.fetchBills({ to: date });
    },
  },
};
</script>

<style scoped>
.v-main {
  background-color: #f5f7fa;
}

.v-data-table ::v-deep th {
  font-weight: 600 !important;
}

.v-data-table ::v-deep td {
  font-size: 14px !important;
}

.bill-container {
  width: 8.5in;
  height: 11in;
  padding: 0;
  position: relative;
  background-color: white;
  page-break-after: always;
  break-after: page;
}

.bill-wrapper {
  height: 5.5in;
  position: relative;
}

.dash-separator {
  width: 100%;
  height: 0;
  border-top: 2px dashed #000;
  position: absolute;
  top: 5.5in;
  left: 0;
}

@page {
  size: letter portrait;
  margin: 0;
}

@media print {
  .bill-container {
    page-break-after: always;
  }
}
</style>
