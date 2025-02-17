<template>
  <div class="bill-half">
    <div class="bill-header">
      <div class="org-name">BASAK WATER CONSUMER'S ORGANIZATION</div>
      <div class="org-subtitle">WATER BILLING STATEMENT</div>
      <div class="org-address">
        Sitio Basak Malandag Malungon Sarangani Province
      </div>
    </div>

    <div class="info-section">
      <table class="info-table">
        <tr>
          <td class="label">Consumer Name:</td>
          <td class="value">{{ bill.name }}</td>
        </tr>
        <tr>
          <td class="label">Billing Period:</td>
          <td class="value">{{ bill.billingDate }}</td>
          <td class="label">Due Date:</td>
          <td class="value">{{ bill.dueDate }}</td>
        </tr>
      </table>
    </div>

    <div class="section-title">METER READING DETAILS</div>
    <table class="details-table">
      <thead>
        <tr>
          <th>Reading Date</th>
          <th>Previous Reading</th>
          <th>Present Reading</th>
          <th>Consumption (m³)</th>
          <th>Read Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ bill.presentDate }}</td>
          <td>{{ bill.previousRead }}</td>
          <td>{{ bill.presentRead }}</td>
          <td>{{ bill.consumption }}</td>
          <td>{{ bill.readType }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Charges Summary -->
    <div class="section-title">BILLING SUMMARY</div>
    <table class="summary-table">
      <tr>
        <td class="charge-label">Current Charges:</td>
        <td class="charge-value">{{ bill.presentBill }}</td>
      </tr>
      <tr>
        <td class="charge-label">Previous Balance:</td>
        <td class="charge-value">{{ bill.previousBalance }}</td>
      </tr>
      <tr>
        <td class="charge-label">Other Charges:</td>
        <td class="charge-value">{{ bill.otherCharges }}</td>
      </tr>
      <tr class="total-row">
        <td class="charge-label">TOTAL AMOUNT DUE:</td>
        <td class="charge-value">{{ bill.totalBill }}</td>
      </tr>
    </table>

    <!-- Important Notice -->
    <div class="notice-box">
      <div class="notice-title">IMPORTANT NOTICE</div>
      <ul class="notice-list">
        <li>This bill is due within ten (10) days upon receipt.</li>
        <li>Late payment may result in service disconnection.</li>
        <li>Please pay only to authorized personnel.</li>
        <li>Keep this bill for future reference.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "BillTemplate",
  props: {
    bill: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.bill-half {
  padding: 0.25in;
  font-family: Arial, sans-serif;
  position: relative;
  height: 5.5in;
  box-sizing: border-box;
}

.bill-header {
  text-align: center;
  margin-bottom: 0.15in;
  padding-bottom: 0.05in;
  border-bottom: 1px solid #000;
}

.logo {
  width: 1in;
  margin-bottom: 0.05in;
}

.org-name {
  font-size: 12pt;
  font-weight: bold;
  margin-bottom: 0.05in;
}

.org-subtitle {
  font-size: 10pt;
  font-weight: bold;
  margin-bottom: 0.05in;
  color: #2c5282;
}

.org-address {
  font-size: 8pt;
}

/* Info Section */
.info-section {
  margin-bottom: 0.15in;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 8pt;
}

.info-table td {
  padding: 0.03in;
}

.label {
  font-weight: bold;
  width: 20%;
}

/* Tables */
.section-title {
  font-size: 9pt;
  font-weight: bold;
  margin-bottom: 0.05in;
  color: #2c5282;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0.15in;
  font-size: 8pt;
}

.details-table th,
.details-table td {
  border: 1px solid #000;
  padding: 0.04in;
  text-align: center;
}

.details-table th {
  background-color: #e2e8f0;
  font-weight: bold;
}

/* Summary Table */
.summary-table {
  width: 60%;
  margin-left: auto;
  border-collapse: collapse;
  margin-bottom: 0.15in;
  font-size: 8pt;
}

.charge-label {
  padding: 0.03in;
  font-weight: bold;
}

.charge-value {
  padding: 0.03in;
  text-align: right;
  border: 1px solid #000;
}

.total-row {
  background-color: #e2e8f0;
  font-weight: bold;
  font-size: 9pt;
}

.notice-box {
  border: 1px solid #2c5282;
  padding: 0.08in;
  background-color: #ebf8ff;
}

.notice-title {
  font-size: 8pt;
  font-weight: bold;
  color: #2c5282;
  margin-bottom: 0.03in;
}

.notice-list {
  list-style-type: none;
  font-size: 7pt;
  margin: 0;
  padding: 0;
  line-height: 1.2;
}

.notice-list li {
  margin-bottom: 0.02in;
  position: relative;
  padding-left: 0.12in;
}

.notice-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #2c5282;
}

.org-name {
  font-size: 11pt;
  font-weight: bold;
  margin-bottom: 0.05in;
}

.org-subtitle {
  font-size: 9pt;
  font-weight: bold;
  margin-bottom: 0.05in;
  color: #2c5282;
}

.org-address {
  font-size: 7pt;
}

.info-section {
  margin-bottom: 0.1in;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 7pt;
}

.section-title {
  font-size: 8pt;
  font-weight: bold;
  margin-bottom: 0.05in;
  color: #2c5282;
}

.details-table {
  margin-bottom: 0.1in;
  font-size: 7pt;
}

.details-table th,
.details-table td {
  padding: 0.03in;
}

/* Summary Table */
.summary-table {
  margin-bottom: 0.1in;
  font-size: 7pt;
}

.charge-label,
.charge-value {
  padding: 0.02in;
}

.total-row {
  font-size: 8pt;
}

/* Notice Box */
.notice-box {
  padding: 0.05in;
}

.notice-title {
  font-size: 7pt;
  margin-bottom: 0.02in;
}

.notice-list {
  font-size: 6pt;
  line-height: 1.1;
}

.notice-list li {
  margin-bottom: 0.01in;
}
</style>
