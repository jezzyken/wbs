<template>
  <div class="admin-layout">
    <header class="gov-header">
      <span>{{ localDate }}</span> • <span>{{ localTime }}</span>
    </header>
    
    <header class="main-header">
      <div class="header-content">
        <div class="logo-section">
          <img :src="require('@/assets/blogo.png')" alt="Logo" height="80" />
          <div>
            <div class="logo-text">SITIO BASAC WATER DISTRICT</div>
            <div class="logo-subtext">Malandag Malungon Sarangani Province</div>
          </div>
        </div>
      </div>
    </header>

    <nav class="nav-bar">
      <div class="nav-content">
        <ul class="nav-links">
          <li v-for="item in menuItems" :key="item.text">
            <router-link :to="item.link" :class="{ active: isActiveRoute(item.link) }">
              {{ item.text }}
            </router-link>
          </li>
        </ul>
        <div class="user-section">
          <span>Welcome, {{ userName }}</span>
          <button class="btn btn-outline" @click="handleLogout">Logout</button>
        </div>
      </div>
    </nav>

    <main class="main-container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  
  data() {
    return {
      menuItems: [
        { text: 'Dashboard', link: '/admin/dashboard' },
        { 
    text: 'Consumer Records', 
    link: '/admin/consumers',
    children: [
      { text: 'Add Consumer', link: '/admin/consumers/add' },
      { text: 'View Consumers', link: '/admin/consumers/view' },
      { text: 'Consumer Categories', link: '/admin/consumers/categories' }
    ]
  },
        { text: 'Billing', link: '/admin/billing' },
        // { text: 'Payments', link: '/admin/payments' },
        { text: 'Readings', link: '/admin/readings' },
        { text: 'Expenses', link: '/admin/expenses' },
        { text: 'Users', link: '/admin/users' },
        { text: 'Reports', link: '/admin/reports' },
        // { text: 'Settings', link: '/admin/settings' }
      ],
      localDate: '',
      localTime: '',
      timer: null,
      userName: 'Administrator' 
    }
  },

  created() {
    this.updateDateTime()
    this.timer = setInterval(this.updateDateTime, 1000)
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },

  methods: {
    updateDateTime() {
      const now = new Date()
      this.localDate = now.toLocaleDateString('en-PH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      this.localTime = now.toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
    },

    isActiveRoute(link) {
      return this.$route.path === link
    },

    async handleLogout() {
      try {
        await this.$store.dispatch('auth/logout')
        this.$router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }
  }
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.gov-header {
  background: #003875;
  color: white;
  padding: 8px 20px;
  font-size: 12px;
  text-align: center;
}

.main-header {
  background: white;
  padding: 15px 30px;
  border-bottom: 2px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #003875;
}

.logo-subtext {
  font-size: 12px;
  color: #333;
}

.nav-bar {
  background: #1a4c7c;
  padding: 0 30px;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 15px 20px;
  display: block;
  font-size: 14px;
  transition: background-color 0.3s;
}

.nav-links a:hover,
.nav-links a.active {
  background-color: #003875;
}

.user-section {
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.main-container {
  max-width: 1400px;
  margin: 30px auto;
  padding: 0 30px;
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    padding: 10px 0;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .user-section {
    margin-top: 10px;
  }

  .main-container {
    padding: 0 15px;
  }
}
</style>