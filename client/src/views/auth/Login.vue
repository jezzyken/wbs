<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <img :src="require('@/assets/blogo.png')" alt="Logo" height="80" />
        <h1>SITIO BASAC WATER DISTRICT</h1>
        <p>Administrative Portal Login</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username or Email</label>
          <input
            id="username"
            v-model="credentials.username"
            type="text"
            required
            :disabled="isLoading"
            placeholder="Enter your username"
          >
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input
              id="password"
              v-model="credentials.password"
              :type="showPassword ? 'text' : 'password'"
              required
              :disabled="isLoading"
              placeholder="Enter your password"
            >
            <button 
              type="button" 
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '🔓' : '🔒' }}
            </button>
          </div>
        </div>


        <div class="error-message" v-if="error">
          {{ error }}
        </div>

        <button 
          type="submit" 
          class="btn btn-primary login-btn" 
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loader"></span>
          <span :style="{ color: 'white' }">{{ isLoading ? 'Logging in...' : 'Login' }}</span>
        </button>
      </form>

      <div class="login-footer">
        <p>© {{ currentYear }} Sitio Basac Water District</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      error: null
    }
  },

  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },

  methods: {
    async handleLogin() {
  try {
    // Wait for login and token storage to complete
    await this.$store.dispatch('auth/login', {
      ...this.credentials,
      rememberMe: this.rememberMe
    })
    
    // Get the redirect path from query params or use default
    const redirectPath = this.$route.query.redirect || '/admin/dashboard'
    this.$router.push(redirectPath)
  } catch (error) {
    this.error = error.message || 'Login failed'
  }
},

    handleForgotPassword() {
      // Implement forgot password logic
      console.log('Forgot password clicked')
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #003875 0%, #1a4c7c 100%);
  padding: 20px;
}

.login-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  color: #003875;
  font-size: 1.5rem;
  margin: 15px 0 5px;
}

.login-header p {
  color: #666;
  font-size: 0.9rem;
}

.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #003875;
  outline: none;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.remember-me {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.forgot-password {
  color: #003875;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.error-message {
  background: #fde9e9;
  color: #dc3545;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.login-footer {
  text-align: center;
  color: #666;
  font-size: 12px;
}

.login-footer p {
  margin-bottom: 5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .login-container {
    padding: 30px 20px;
  }

  .login-header h1 {
    font-size: 1.2rem;
  }

  .remember-me {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>