<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title class="headline primary white--text">
        Review Receipt
      </v-card-title>
      
      <v-card-text class="pa-4">
        <div class="receipt-preview">
          <!-- Header -->
          <div class="text-center mb-4">
            <div class="text-h6 font-weight-bold">BASAK WATER DISTRICT</div>
            <div class="text-subtitle-1">Official Receipt</div>
            <div class="text-caption">
              {{ formatDate(payment.date) }}
            </div>
          </div>

          <!-- Consumer Info -->
          <v-card outlined class="mb-4 pa-3">
            <div><strong>Account No:</strong> {{ payment.consumer.accountNo }}</div>
            <div><strong>Consumer:</strong> {{ payment.consumer.name }}</div>
            <div><strong>Status:</strong> {{ payment.consumer.status }}</div>
          </v-card>

          <!-- Transaction Items -->
          <div class="text-subtitle-1 font-weight-medium mb-2">Payment Details</div>
          <v-card outlined class="mb-4">
            <v-list dense>
              <v-list-item v-for="(item, index) in payment.items" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ item.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="text-right">
                  ₱{{ item.amount.toFixed(2) }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- Payment Summary -->
          <v-card outlined class="mb-4">
            <v-list dense>
              <v-list-item>
                <v-list-item-content>Total Amount Due</v-list-item-content>
                <v-list-item-action class="font-weight-medium">
                  ₱{{ payment.totalAmount.toFixed(2) }}
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Amount Received</v-list-item-content>
                <v-list-item-action class="font-weight-medium">
                  ₱{{ payment.amountReceived.toFixed(2) }}
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>Change</v-list-item-content>
                <v-list-item-action class="success--text font-weight-bold">
                  ₱{{ payment.change.toFixed(2) }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- Footer -->
          <div class="text-center text-caption grey--text">
            <div>Thank you for your payment!</div>
            <div>Keep this receipt for future reference</div>
            <div>{{ generateReceiptNumber() }}</div>
          </div>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="close"
          :disabled="loading"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="print"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon left>mdi-printer</v-icon>
          Print
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Status Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="3000"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
export default {
  name: 'ReceiptPrintDialog',
  
  props: {
    value: {
      type: Boolean,
      default: false
    },
    payment: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    loading: false,
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'success'
  }),

  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },

    generateReceiptNumber() {
      const timestamp = new Date().getTime();
      return `Receipt #: ${timestamp}`;
    },


    async print() {
      this.loading = true;
      try {
        await this.$parent.printReceipt();
        this.snackbarText = 'Receipt printed successfully';
        this.snackbarColor = 'success';
        this.snackbar = true;
        
        
        // Short delay before closing and navigating
        setTimeout(() => {
          this.close();
          this.$router.push({ 
            name: 'Billing',
            params: { 
              refreshData: true // Optional: Use this to trigger data refresh in Billing page
            }
          });
        }, 1000);
      } catch (error) {
        console.error('Print failed:', error);
        this.snackbarText = 'Failed to print receipt';
        this.snackbarColor = 'error';
        this.snackbar = true;
      } finally {
        this.loading = false;
      }
    },

    close() {
      if (this.loading) return;
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.receipt-preview {
  font-family: 'Roboto Mono', monospace;
  white-space: pre-line;
}

.v-list-item {
  min-height: 40px !important;
}

.v-list-item__action {
  margin: 4px 0 !important;
}
</style>