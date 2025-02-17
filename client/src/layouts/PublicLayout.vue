<template>
  <div class="public-layout">
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
        <nav class="public-nav">
          <ul class="nav-links">
            <li v-for="item in menuItems" :key="item.text">
              <router-link
                :to="item.link"
                :class="{ active: isActiveRoute(item.link) }"
              >
                {{ item.text }}
              </router-link>
            </li>
          </ul>
          <button class="btn btn-primary" @click="handleAuthButton">
            {{ isAuthenticated ? "Dashboard" : "Login" }}
          </button>
        </nav>
      </div>
    </header>

    <main class="public-main">
      <router-view></router-view>
    </main>

    <footer class="public-footer">
      <div class="footer-content">
        <div class="footer-grid">
          <div class="footer-section">
            <h3>Contact Us</h3>
            <p>Sitio Basac, Malandag</p>
            <p>Malungon, Sarangani Province</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@sitiobasacwd.gov.ph</p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <router-link to="/bill-inquiry">Bill Inquiry</router-link>
              </li>
              <!-- <li><router-link to="/services">Our Services</router-link></li> -->
              <!-- <li><router-link to="/announcements">Announcements</router-link></li> -->
              <!-- <li><router-link to="/contact">Contact</router-link></li> -->
            </ul>
          </div>
          <div class="footer-section">
            <h3>Office Hours</h3>
            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
            <p>Saturday: 8:00 AM - 12:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>
            &copy; {{ currentYear }} Sitio Basac Water District. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "PublicLayout",

  data() {
    return {
      menuItems: [
        { text: "Home", link: "/" },
        { text: "Bill Inquiry", link: "/bill-inquiry" },
        // { text: 'Services', link: '/services' },
        // { text: 'Announcements', link: '/announcements' },
        // { text: 'Contact', link: '/contact' }
      ],
      localDate: "",
      localTime: "",
      timer: null,
    };
  },

  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapState("auth", ["user"]),

    currentYear() {
      return new Date().getFullYear();
    },
  },

  created() {
    this.updateDateTime();
    this.timer = setInterval(this.updateDateTime, 1000);
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  methods: {
    updateDateTime() {
      const now = new Date();
      this.localDate = now.toLocaleDateString("en-PH", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      this.localTime = now.toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    },

    isActiveRoute(link) {
      return this.$route.path === link;
    },

    navigateToLogin() {
      this.$router.push("/login");
    },

    handleAuthButton() {
      if (this.isAuthenticated) {
        const dashboardRoutes = {
          admin: "/admin/dashboard",
          meter_reader: "/meter-reader/dashboard",
          collection_officer: "/collection/dashboard",
        };
        const route = dashboardRoutes[this.user?.role] || "/admin/dashboard";
        this.$router.push(route);
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.public-nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 10px;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active {
  background-color: #f5f7fa;
  color: #003875;
}

.public-main {
  flex: 1;
  background-color: #ffffff;
}

.public-footer {
  background: #1a4c7c;
  color: white;
  padding: 60px 0 20px;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #ffffff;
}

.footer-section p {
  margin-bottom: 10px;
  font-size: 14px;
  color: #e0e0e0;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #e0e0e0;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #ffffff;
}

.footer-bottom {
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 12px;
  color: #e0e0e0;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
  }

  .public-nav {
    flex-direction: column;
    width: 100%;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-section {
    text-align: center;
  }
}
</style>
