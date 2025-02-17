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

      <receipt-print-dialog v-model="showReceiptDialog" :payment="receiptData" />
    </v-container>
  </template>

  <script>
  import { mapState, mapActions } from "vuex";
  import ReceiptPrintDialog from "@/components/ReceiptPrintDialog.vue";

  export default {
    name: "PaymentPage",
    components: {
      ReceiptPrintDialog,
    },

    data: () => ({
      consumer: {
        accountNo: "",
        name: "",
        type: "",
        status: "",
      },
      fees: [
        {
          name: "Current Bill",
          amount: 0,
          selected: true,
          disabled: true,
          description: "Current water bill payment",
          paymentType: "BILL_PAYMENT",
        },
        {
          name: "Unpaid Balance",
          amount: 0,
          selected: true,
          disabled: true,
          description: "Unpaid balance",
          paymentType: "BILL_PAYMENT",
        },
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
          description: "Water reconnection service fee",
          paymentType: "RECONNECTION_FEE",
        },
      ],
      amountReceived: 0,
      loading: false,
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      printer: {
        device: null,
        characteristic: null,
        isConnected: false,
        loading: false,
      },
      showReceiptDialog: false,
      receiptData: null,
    }),

    computed: {
      ...mapState("consumers", ["currentConsumer"]),
      ...mapState("billings", ["currentBill"]),

      displayedFees() {
        if (this.$route.query.newConsumer === "true") {
          return this.fees.filter((fee) => fee.name === "Membership Fee");
        }

        let displayFees = this.fees.filter((fee) => fee.name === "Current Bill");

        const unpaidBalanceFee = this.fees.find(
          (f) => f.name === "Unpaid Balance"
        );
        if (unpaidBalanceFee && unpaidBalanceFee.amount > 0) {
          displayFees.push(unpaidBalanceFee);
        }

        if (this.consumer.status.toLowerCase() === "disconnected") {
          const reconnectionFee = this.fees.find(
            (f) => f.name === "Reconnection Fee"
          );
          if (reconnectionFee) {
            displayFees.push(reconnectionFee);
          }
        }

        return displayFees;
      },

      summaryItems() {
        return this.fees
          .filter((fee) => fee.selected)
          .map((fee) => ({
            name: fee.name,
            amount: fee.amount,
            description: fee.description,
            paymentType: fee.paymentType,
            billId: fee.billId,
            billIds: fee.billIds,
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

    async created() {
      await this.initializePaymentData();
    },

    methods: {
      ...mapActions("consumers", ["fetchConsumerById"]),
      ...mapActions("billings", [
        "fetchBillById",
        "fetchUnpaidBills",
        "updateBill",
      ]),

      async ensurePrinterConnection() {
        if (!this.printer.isConnected) {
          return this.initializePrinter();
        }
        return true;
      },

      async initializePrinter() {
        if (this.printer.isConnected) return true;

        try {
          const device = await navigator.bluetooth.requestDevice({
            filters: [
              { services: ["000018f0-0000-1000-8000-00805f9b34fb"] },
              { namePrefix: "POS" },
            ],
          });

          const server = await device.gatt.connect();
          const service = await server.getPrimaryService(
            "000018f0-0000-1000-8000-00805f9b34fb"
          );
          const characteristic = await service.getCharacteristic(
            "00002af1-0000-1000-8000-00805f9b34fb"
          );

          this.printer = {
            device,
            characteristic,
            isConnected: true,
            loading: false,
          };

          device.addEventListener("gattserverdisconnected", () => {
            this.printer.isConnected = false;
          });

          return true;
        } catch (error) {
          console.error("Printer initialization error:", error);
          this.printer.isConnected = false;
          return false;
        }
      },

      async initializePaymentData() {
        try {
          if (this.$route.query.new === "true") {
            const consumerData = this.$route.params.consumerData;

            this.consumer = {
              accountNo: consumerData.accountNo,
              name: `${consumerData.firstName} ${consumerData.lastName}`,
              type: consumerData.consumerType,
              status: consumerData.status,
            };

            this.fees = this.fees.filter((fee) => fee.name === "Membership Fee");
            const membershipFee = this.fees[0];
            if (membershipFee) {
              membershipFee.selected = true;
              membershipFee.disabled = true;
              this.amountReceived = membershipFee.amount;
            }
          } else {
            const bill = await this.fetchBillById(this.$route.query.billId);
            const consumer = await this.fetchConsumerById(
              this.$route.query.consumerId
            );

            this.consumer = {
              accountNo: consumer.accountNo,
              name: `${consumer.firstName} ${consumer.lastName}`,
              type: consumer.consumerType || "old",
              status: consumer.status,
            };

            const currentBillFee = this.fees.find(
              (f) => f.name === "Current Bill"
            );
            if (currentBillFee) {
              currentBillFee.amount = bill.amount;
              currentBillFee.billId = bill._id;
            }

            const unpaidBills = await this.fetchUnpaidBills(
              this.$route.query.consumerId
            );

            const previousBalanceBills = unpaidBills.filter(
              (b) => b._id !== bill._id
            );
            const previousBalance = previousBalanceBills.reduce(
              (total, b) => total + b.amount,
              0
            );

            const previousBalanceFee = this.fees.find(
              (f) => f.name === "Unpaid Balance"
            );
            if (previousBalanceFee) {
              previousBalanceFee.amount = previousBalance;
              previousBalanceFee.billIds = previousBalanceBills.map((b) => b._id);
            }

            if (consumer.status.toLowerCase() === "disconnected") {
              const reconnectionFee = this.fees.find(
                (f) => f.name === "Reconnection Fee"
              );
              if (reconnectionFee) {
                reconnectionFee.selected = true;
                reconnectionFee.disabled = false;
              }
            }
          }
        } catch (error) {
          this.snackbarText = "Error initializing payment data";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      },

      async processPayment() {
        if (!this.isValidPayment || this.amountReceivedError) return;

        this.loading = true;
        try {
          const billPayments = this.summaryItems.filter(
            (item) => item.paymentType === "BILL_PAYMENT"
          );

          const paymentData = {
            consumerId: this.$route.query.consumerId,
            amount: this.totalAmountDue,
            amountReceived: parseFloat(this.amountReceived),
            change: this.calculateChange,
            paymentType:
              billPayments.length > 0
                ? "BILL_PAYMENT"
                : this.summaryItems[0].paymentType,
            selectedFees: this.summaryItems,
            paymentMethod: "CASH",
            status: "completed",
            notes: `Payment for ${this.summaryItems
              .map((item) => item.name)
              .join(", ")}`,
          };

          const billUpdates = [];

          if (this.$route.query.billId) {
            billUpdates.push({
              id: this.$route.query.billId,
              amount: this.fees.find((f) => f.name === "Current Bill").amount,
            });
          }

          if (this.fees.find((f) => f.name === "Unpaid Balance")?.amount > 0) {
            const unpaidBills = await this.fetchUnpaidBills(
              this.$route.query.consumerId
            );
            unpaidBills.forEach((bill) => {
              if (bill._id !== this.$route.query.billId) {
                billUpdates.push({
                  id: bill._id,
                  amount: bill.amount,
                });
              }
            });
          }

          for (const billUpdate of billUpdates) {
            await this.updateBill({
              id: billUpdate.id,
              bill: {
                status: "paid",
                paidAmount: billUpdate.amount,
                paymentDate: new Date(),
              },
            });
          }

          await this.$store.dispatch("payments/createPayment", paymentData);

          this.receiptData = {
              consumer: this.consumer,
              items: this.summaryItems,
              totalAmount: this.totalAmountDue,
              amountReceived: parseFloat(this.amountReceived),
              change: this.calculateChange,
              date: new Date(),
            };

          this.showReceiptDialog = true;

          // await this.printReceipt();

          this.snackbarText = "Payment processed successfully";
          this.snackbarColor = "success";
          this.snackbar = true;
        } catch (error) {
          this.snackbarText = error.message || "Error processing payment";
          this.snackbarColor = "error";
          this.snackbar = true;
        } finally {
          this.loading = false;
        }
      },

      async printReceipt() {
        try {
          if (!this.printer.isConnected) {
            await this.initializePrinter();
          }

          const ESC = "\x1B";
          const GS = "\x1D";
          const CENTER = `${ESC}a1`;
          const LEFT = `${ESC}a0`;
          const BOLD = `${ESC}E1`;
          const NORMAL = `${ESC}E0`;
          const INIT = `${ESC}@`;
          const CUT = `${GS}V1`;

          const receiptContent = [
            INIT,
            CENTER,
            BOLD,
            "BASAK WATER DISTRICT\n",
            NORMAL,
            "Official Receipt\n",
            `${new Date().toLocaleDateString()}\n`,
            `${new Date().toLocaleTimeString()}\n`,
            "--------------------------------\n",

            LEFT,
            `Account No: ${this.consumer.accountNo}\n`,
            `Consumer : ${this.consumer.name}\n`,
            "--------------------------------\n",

            ...this.summaryItems.map(
              (item) =>
                `${item.name}\n` +
                `Amount:`.padEnd(24) +
                `P${item.amount.toFixed(2)}\n`
            ),
            "--------------------------------\n",

            BOLD,
            `Total Amount Due : P${this.totalAmountDue.toFixed(2)}\n`,
            `Amount Received  : P${this.amountReceived}\n`,
            `Change          : P${this.calculateChange.toFixed(2)}\n`,
            "--------------------------------\n",

            CENTER,
            NORMAL,
            "Thank you for your payment!\n\n",
            CENTER,
            "Keep this receipt for future reference\n",
            "\n\n\n",
            CUT,
          ].join("");

          const encoder = new TextEncoder();
          const data = encoder.encode(receiptContent);

          const CHUNK_SIZE = 50;
          for (let i = 0; i < data.length; i += CHUNK_SIZE) {
            const chunk = data.slice(i, i + CHUNK_SIZE);
            await this.printer.characteristic.writeValue(chunk);
            await new Promise((resolve) => setTimeout(resolve, 50));
          }

          return true;
        } catch (error) {
          console.error("Print error:", error);
          return false;
        }
      },

      cancel() {
        if (
          confirm(
            "Are you sure you want to cancel? Any unsaved changes will be lost."
          )
        ) {
          this.$router.push({
            name:
              this.$route.query.newConsumer === "true"
                ? "ConsumerRecords"
                : "Billing",
          });
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
