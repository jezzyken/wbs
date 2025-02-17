<template>
  <v-app>
    <router-view></router-view>
    <div v-if="isLoading" class="global-loader">
      <div class="loader-spinner"></div>
    </div>
    <div 
      v-if="notification.show" 
      :class="['notification', `notification-${notification.type}`]"
    >
      {{ notification.message }}
      <button @click="closeNotification" class="notification-close">&times;</button>
    </div>
</v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      notification: {
        show: false,
        message: '',
        type: 'info', // info, success, error, warning
        timeout: null
      },
      isLoading: false
    };
  },

  computed: {
    ...mapState({
      isLoading: state => state.app.isLoading,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },

  created() {
    // Listen for global notifications
    this.$root.$on('show-notification', this.showNotification);
    
    // Check authentication status on app load
    this.checkAuth();
  },

  beforeDestroy() {
    this.$root.$off('show-notification', this.showNotification);
    if (this.notification.timeout) {
      clearTimeout(this.notification.timeout);
    }
  },

  methods: {
    async checkAuth() {
      try {
        // Check if there's a stored token
        const token = localStorage.getItem('token');
        if (token) {
          await this.$store.dispatch('auth/validateToken', token);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    },

    showNotification({ message, type = 'info', duration = 5000 }) {
      if (this.notification.timeout) {
        clearTimeout(this.notification.timeout);
      }
      
      this.notification = {
        show: true,
        message,
        type,
        timeout: setTimeout(() => {
          this.closeNotification();
        }, duration)
      };
    },

    closeNotification() {
      this.notification.show = false;
      if (this.notification.timeout) {
        clearTimeout(this.notification.timeout);
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #003875;
  color: white;
}

.btn-primary:hover {
  background-color: #002855;
}

.btn-outline {
  border: 1px solid #dee2e6;
  background-color: white;
  color: #333;
}

.btn-outline:hover {
  background-color: #f8f9fa;
}

/* Form styles */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
}

/* Card styles */
.card {
  background: white;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #f5f7fa;
  font-weight: 600;
  text-align: left;
  padding: 12px 20px;
  font-size: 14px;
  color: #333;
  border-bottom: 2px solid #dee2e6;
}

td {
  padding: 12px 20px;
  font-size: 14px;
  border-bottom: 1px solid #dee2e6;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.badge-success {
  background-color: #e6f4ea;
  color: #1e7e34;
}

.badge-warning {
  background-color: #fff3cd;
  color: #856404;
}

.badge-danger {
  background-color: #fde9e9;
  color: #dc3545;
}

/* Loading indicator */
.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #003875;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Notification component */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 40px 15px 20px;
  border-radius: 4px;
  color: white;
  z-index: 9999;
  animation: slideIn 0.3s ease-out;
}

.notification-info {
  background-color: #2196f3;
}

.notification-success {
  background-color: #4caf50;
}

.notification-warning {
  background-color: #ff9800;
}

.notification-error {
  background-color: #f44336;
}

.notification-close {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.7;
}

.notification-close:hover {
  opacity: 1;
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive utilities */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  .notification {
    left: 20px;
    right: 20px;
  }

  table {
    display: block;
    overflow-x: auto;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }

  body {
    background: white;
  }

  .container {
    max-width: none;
    padding: 0;
  }
}
</style>