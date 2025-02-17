import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#003875',    // Main blue color
        secondary: '#1a4c7c',  // Darker blue for nav
        accent: '#c8102e',     // Red accent
        success: '#28a745',    // Green for success states
        warning: '#ffc107',    // Yellow for warnings
        danger: '#dc3545',     // Red for danger/error states
        background: '#f5f7fa', // Light background
        border: '#dee2e6'      // Border color
      }
    },
    options: {
      customProperties: true // Enables CSS variable generation
    }
  }
});