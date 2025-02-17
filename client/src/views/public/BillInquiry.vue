<template>
  <div class="bill-inquiry">
    <div class="container">
      <div class="inquiry-section">
        <form @submit.prevent="handleInquiry" class="search-form">
          <div class="form-group">
            <input 
              type="text" 
              id="accountNumber"
              v-model="accountNumber"
              placeholder="Enter Account Number"
              :disabled="loading"
              required
            >
            <button 
              type="submit" 
              class="btn-search btn-primary"
              :disabled="loading"
            >
              {{ loading ? 'Searching...' : 'Search' }}
            </button>
          </div>
        </form>
      </div>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-if="billData" class="billing-statement">
        <div class="statement-header">
          <h1>BILLING STATEMENT</h1>
        </div>

        <div class="bill-content">
          <div class="customer-info">
            <table>
              <tr>
                <th>Account Number:</th>
                <td>{{ billData.consumerId.accountNo }}</td>
              </tr>
              <tr>
                <th>Customer Name:</th>
                <td>{{ billData.consumerId.fullName }}</td>
              </tr>
              <tr>
                <th>Billing Period:</th>
                <td>{{ formatDate(billData.billingPeriod.from) }} - {{ formatDate(billData.billingPeriod.to) }}</td>
              </tr>
              <tr>
                <th>Due Date:</th>
                <td>{{ formatDate(billData.dueDate) }}</td>
              </tr>
            </table>
          </div>

          <div class="charges-summary">
            <table>
              <tr>
                <th>Consumption:</th>
                <td>{{ billData.consumption }} m³</td>
              </tr>
              <tr>
                <th>Current Charges:</th>
                <td>₱{{ formatAmount(billData.amount) }}</td>
              </tr>
              <tr>
                <th>Previous Balance:</th>
                <td>₱{{ formatAmount(billData.previousBalance) }}</td>
              </tr>
              <tr class="total">
                <th>Total Amount Due:</th>
                <td>₱{{ formatAmount(billData.totalAmountDue) }}</td>
              </tr>
            </table>
          </div>

          <div class="payment-status">
            <div :class="['status-badge', `status-${billData.status}`]">
              {{ billData.status.toUpperCase() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bill-inquiry {
  padding: 2rem;
  background: #f8f9fa;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.search-form {
  max-width: 500px;
  margin: 0 auto 2rem;
}

.form-group {
  display: flex;
}

input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.btn-search {
  padding: 0.75rem 1.5rem;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.billing-statement {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.statement-header {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #0056b3;
  padding-bottom: 1rem;
}

.statement-header h1 {
  color: #0056b3;
  margin: 0;
}

table {
  width: 100%;
  margin-bottom: 1.5rem;
}

th {
  text-align: left;
  padding: 0.75rem;
  width: 40%;
  color: #444;
}

td {
  padding: 0.75rem;
  color: #333;
}

.total {
  font-weight: bold;
  font-size: 1.1rem;
  background: #f8f9fa;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
}

.status-paid {
  background: #d4edda;
  color: #155724;
}

.status-unpaid {
  background: #f8d7da;
  color: #721c24;
}

.status-overdue {
  background: #fff3cd;
  color: #856404;
}

.alert-danger {
  background-color: #f8d7da;
  padding: 1rem;
  border-radius: 4px;
  color: #721c24;
  margin-bottom: 1rem;
}
</style>

<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'BillInquiry',
  
  data() {
    return {
      accountNumber: '',
      error: null
    }
  },

  computed: {
    ...mapState('billings', ['currentBill', 'loading']),
    
    billData() {
      return this.currentBill;
    }
  },

  methods: {
    ...mapActions('billings', ['fetchBillByAccountNo']),

    formatAmount(amount) {
      return amount.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },

    formatDate(date) {
      return moment(date).format('MMMM D, YYYY');
    },

    async handleInquiry() {
      this.error = null;
      try {
        if (!this.accountNumber) {
          throw new Error('Please enter an account number');
        }
        await this.fetchBillByAccountNo(this.accountNumber);
      } catch (err) {
        this.error = err.message || 'Failed to fetch bill details. Please try again.';
      }
    }
  }
}
</script>