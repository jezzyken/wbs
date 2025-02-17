<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Sitio Basac Water District Bill Inquiry</h1>
        <p>
          Check and manage your water bill online
        </p>
        <div class="hero-buttons">
          <button class="btn btn-primary" @click="goToCheckBill">
            Check your bill
          </button>
        </div>
      </div>
    </section>

    <!-- Bill Information Section -->
    <section class="bill-info-section">
      <div class="container">
        <div class="section-header">
          <h2>Important Billing Information</h2>
        </div>
        <div class="announcements-grid">
          <div class="announcement-card">
            <h3>Payment Due Date</h3>
            <p>Please ensure to pay your bills before the due date to avoid service interruption.</p>
          </div>
          <div class="announcement-card">
            <h3>Payment Methods</h3>
            <p>We accept cash payments only</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "BillInquiryPage",
  methods: {
    goToCheckBill() {
      this.$router.push("/bill-inquiry");
    },
  },
};
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0, 56, 117, 0.9), rgba(0, 56, 117, 0.9)),
    center/cover;
  color: white;
  padding: 100px 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.bill-info-section {
  padding: 60px 0;
  background-color: #f5f7fa;
}

.announcements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.announcement-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.announcement-card h3 {
  margin: 10px 0;
  color: #003875;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .section-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>