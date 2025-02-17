<template>
  <v-container fluid class="pa-0">
    <!-- Page Header -->
    <v-card flat class="mb-4">
      <v-card-text>
        <div class="text-caption grey--text mb-1">
          Home / Payments / New Payment
        </div>
        <div class="text-h5 primary--text font-weight-bold">New Payment</div>
      </v-card-text>
    </v-card>

    <v-container>
      <v-row>
        <!-- Payment Form Section -->
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="grey lighten-4"
              >Payment Processing</v-card-title
            >

            <v-card-text>
              <!-- Consumer Information -->
              <v-row class="grey lighten-5 pa-4 mb-4">
                <v-col cols="12" sm="6" md="3">
                  <div class="caption grey--text">Account No.</div>
                  <div class="body-1 font-weight-medium">
                    {{ consumer.accountNo }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="caption grey--text">Consumer Name</div>
                  <div class="body-1 font-weight-medium">
                    {{ consumer.name }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="caption grey--text">Consumer Type</div>
                  <v-chip x-small color="warning" label>{{
                    consumer.type
                  }}</v-chip>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="caption grey--text">Status</div>
                  <div class="body-1 font-weight-medium">
                    {{ consumer.status }}
                  </div>
                </v-col>
              </v-row>

              <!-- Transaction Selection -->
              <div class="mb-6">
                <div
                  class="text-subtitle-1 primary--text font-weight-medium mb-3"
                >
                  Select Transactions
                </div>
                <v-card outlined>
                  <v-list>
                    <v-list-item
                      v-for="(fee, index) in displayedFees"
                      :key="index"
                    >
                      <v-list-item-action>
                        <v-checkbox
                          v-model="fee.selected"
                          :disabled="fee.disabled"
                        ></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>{{ fee.name }}</v-list-item-title>
                        <v-list-item-subtitle class="text-caption">
                          {{ fee.description }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action
                        >₱{{ fee.amount.toFixed(2) }}</v-list-item-action
                      >
                    </v-list-item>
                  </v-list>
                </v-card>
              </div>

              <!-- Payment Details -->
              <div class="mb-6">
                <div
                  class="text-subtitle-1 primary--text font-weight-medium mb-3"
                >
                  Payment Details
                </div>
                <v-text-field
                  v-model="amountReceived"
                  label="Amount Received"
                  prefix="₱"
                  type="number"
                  outlined
                  dense
                  :error-messages="amountReceivedError"
                  min="0"
                  step="0.01"
                ></v-text-field>

                <!-- Payment Calculation -->
                <v-card outlined class="grey lighten-5 mb-4">
                  <v-list-item>
                    <v-list-item-content>Amount Received</v-list-item-content>
                    <v-list-item-action
                      >₱{{ amountReceived }}</v-list-item-action
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Total Amount Due</v-list-item-content>
                    <v-list-item-action
                      >₱{{ totalAmountDue.toFixed(2) }}</v-list-item-action
                    >
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item>
                    <v-list-item-content>Change</v-list-item-content>
                    <v-list-item-action class="success--text font-weight-bold">
                      ₱{{ calculateChange.toFixed(2) }}
                    </v-list-item-action>
                  </v-list-item>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="primary white--text"
              >Transaction Summary</v-card-title
            >
            <v-card-text class="pt-4">
              <v-list-item v-for="(item, index) in summaryItems" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action
                  >₱{{ item.amount.toFixed(2) }}</v-list-item-action
                >
              </v-list-item>

              <v-divider class="my-4"></v-divider>

              <v-list-item class="font-weight-bold">
                <v-list-item-content>
                  <v-list-item-title>Total Amount Due</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action
                  >₱{{ totalAmountDue.toFixed(2) }}</v-list-item-action
                >
              </v-list-item>

              <v-btn
                color="primary"
                block
                class="mt-6"
                @click="processPayment"
                :disabled="!isValidPayment || !!amountReceivedError"
                :loading="loading"
              >
                {{ loading ? "Processing..." : "Process Payment" }}
              </v-btn>

              <v-btn
                block
                text
                class="mt-2"
                @click="cancel"
                :disabled="loading"
              >
                Cancel
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "PaymentPage",

  props: {
    newConsumer: {
      type: Boolean,
      default: false,
    },
    consumerData: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    consumer: {
      accountNo: "",
      name: "",
      type: "",
      status: "",
    },
    bills: [], 
    currentBill: null,
    previousBalance: 0,
    fees: [
      {
        name: "Membership Fee",
        amount: 300.0,
        selected: false,
        disabled: false,
        description: "One-time membership fee for new consumers",
        paymentType: "MEMBERSHIP_FEE",
      },
      {
        name: "Reconnection Fee",
        amount: 50.0,
        selected: false,
        disabled: false,
        description: "Water connection service fee",
        paymentType: "RECONECTION_FEE",
      },
    ],
    paymentDate: new Date().toISOString().substr(0, 10),
    amountReceived: 0,
    loading: false,
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",
  }),


  computed: {
    displayedFees() {
      if (this.newConsumer) {
        return this.fees.filter((fee) => fee.name === "Membership Fee");
      }
      return this.fees;
    },

    summaryItems() {
      return this.fees
        .filter((fee) => fee.selected)
        .map((fee) => ({
          name: fee.name,
          amount: fee.amount,
          description: fee.description,
          paymentType: fee.paymentType,
        }));
    },
    totalAmountDue() {
      return this.summaryItems.reduce((total, item) => total + item.amount, 0);
    },
    calculateChange() {
      return this.amountReceived - this.totalAmountDue;
    },
    isValidPayment() {
      return (
        this.amountReceived >= this.totalAmountDue && this.totalAmountDue > 0
      );
    },
    amountReceivedError() {
      if (this.amountReceived < this.totalAmountDue) {
        return "Amount received must be greater than or equal to total amount due";
      }
      return "";
    },
  },

  watch: {
    amountReceived(val) {
      const amount = parseFloat(val);
      if (amount < 0) {
        this.amountReceived = 0;
      } else {
        this.amountReceived = amount;
      }
    },
  },

  created() {
  if (this.newConsumer && this.consumerData) {
    this.consumer = {
      accountNo: this.consumerData.accountNo,
      name: `${this.consumerData.firstName} ${this.consumerData.lastName}`,
      type: this.consumerData.consumerType,
      status: this.consumerData.status,
    };

    this.fees.forEach(fee => {
      fee.selected = false;
      fee.disabled = false;
    });

    const membershipFee = this.fees.find(fee => fee.name === "Membership Fee");
    if (membershipFee) {
      membershipFee.selected = true;
      membershipFee.disabled = true;
    }

    this.amountReceived = membershipFee ? membershipFee.amount : 0;
  }
},

  methods: {
    async processPayment() {
      if (!this.isValidPayment || this.amountReceivedError) return;

      this.loading = true;
      try {
        const selectedFee = this.summaryItems[0];

        const paymentData = {
          isNewConsumer: this.newConsumer,
          consumerData: this.newConsumer ? this.consumerData : null,
          consumerId: this.newConsumer ? null : this.consumer._id,
          amount: this.totalAmountDue,
          amountReceived: parseFloat(this.amountReceived),
          change: this.calculateChange,
          paymentType: selectedFee.paymentType,
          selectedFees: this.summaryItems.map((fee) => ({
            name: fee.name,
            amount: fee.amount,
            description: fee.description,
          })),
          paymentMethod: "CASH",
          status: "completed",
          notes: `${selectedFee.name} payment`,
        };

        const { data } = await this.$store.dispatch(
          "payments/createPayment",
          paymentData
        );

        this.snackbarText = this.newConsumer
          ? "Consumer registration and payment processed successfully"
          : `${selectedFee.name} processed successfully`;
        this.snackbarColor = "success";
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push({ name: "ConsumerRecords" });
        }, 2000);
      } catch (error) {
        this.snackbarText = error.message || "Error processing payment";
        this.snackbarColor = "error";
        this.snackbar = true;
      } finally {
        this.loading = false;
      }
    },

    cancel() {
      if (
        confirm(
          "Are you sure you want to cancel? Any unsaved changes will be lost."
        )
      ) {
        this.$router.push({ name: "ConsumerRecords" });
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>
