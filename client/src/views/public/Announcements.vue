<template>
  <div class="announcements-page">
    <div class="page-header">
      <div class="container">
        <h1>Announcements & Updates</h1>
        <div class="filter-section">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search announcements..."
              @input="filterAnnouncements"
            >
          </div>
          <select v-model="filterType" @change="filterAnnouncements">
            <option value="all">All Types</option>
            <option value="maintenance">Maintenance</option>
            <option value="advisory">Advisory</option>
            <option value="notice">Notice</option>
          </select>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="announcements-list">
        <div v-for="announcement in filteredAnnouncements" 
             :key="announcement.id" 
             class="announcement-card">
          <div class="announcement-header">
            <span :class="['type-badge', announcement.type]">{{ announcement.type }}</span>
            <span class="date">{{ formatDate(announcement.date) }}</span>
          </div>
          <h2>{{ announcement.title }}</h2>
          <p>{{ announcement.content }}</p>
          <div class="announcement-footer">
            <button 
              class="btn btn-outline"
              @click="showAnnouncementDetails(announcement)"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="btn btn-outline"
        >
          Previous
        </button>
        <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="btn btn-outline"
        >
          Next
        </button>
      </div>
    </div>

    <div v-if="selectedAnnouncement" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ selectedAnnouncement.title }}</h2>
          <button class="close-btn" @click="selectedAnnouncement = null">&times;</button>
        </div>
        <div class="modal-body">
          <div class="announcement-meta">
            <span :class="['type-badge', selectedAnnouncement.type]">
              {{ selectedAnnouncement.type }}
            </span>
            <span class="date">{{ formatDate(selectedAnnouncement.date) }}</span>
          </div>
          <p>{{ selectedAnnouncement.content }}</p>
          <div v-if="selectedAnnouncement.affectedAreas">
            <h3>Affected Areas:</h3>
            <ul>
              <li v-for="area in selectedAnnouncement.affectedAreas" 
                  :key="area">{{ area }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnouncementsPage',
  
  data() {
    return {
      announcements: [
        {
          id: 1,
          type: 'maintenance',
          date: '2025-02-15',
          title: 'Scheduled Water Service Interruption',
          content: 'Due to necessary system maintenance and repairs, water service will be interrupted on February 15, 2025 from 10:00 AM to 2:00 PM.',
          affectedAreas: ['Sitio Basac', 'Lower Malandag', 'Upper Malandag']
        },
        {
          id: 2,
          type: 'advisory',
          date: '2025-02-10',
          title: 'Bill Payment Reminder',
          content: 'Please be reminded to settle your water bills before the due date to avoid service interruption.'
        },
      ],
      searchQuery: '',
      filterType: 'all',
      currentPage: 1,
      itemsPerPage: 5,
      selectedAnnouncement: null
    }
  },

  computed: {
    filteredAnnouncements() {
      let filtered = this.announcements.filter(announcement => {
        const matchesSearch = announcement.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            announcement.content.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesType = this.filterType === 'all' || announcement.type === this.filterType
        return matchesSearch && matchesType
      })

      // Pagination
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return filtered.slice(start, end)
    },

    totalPages() {
      return Math.ceil(this.announcements.length / this.itemsPerPage)
    }
  },

  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    filterAnnouncements() {
      this.currentPage = 1
    },

    changePage(page) {
      this.currentPage = page
    },

    showAnnouncementDetails(announcement) {
      this.selectedAnnouncement = announcement
    }
  }
}
</script>

<style scoped>
.announcements-page {
  padding-bottom: 60px;
}

.page-header {
  background: #f5f7fa;
  padding: 40px 0;
  margin-bottom: 40px;
}

.page-header h1 {
  color: #003875;
  margin-bottom: 20px;
}

.filter-section {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.search-box {
  flex: 1;
}

.search-box input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

select {
  padding: 10px 15px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  min-width: 150px;
}

.announcements-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.announcement-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.type-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.maintenance {
  background-color: #fff3cd;
  color: #856404;
}

.advisory {
  background-color: #cce5ff;
  color: #004085;
}

.notice {
  background-color: #d4edda;
  color: #155724;
}

.date {
  color: #666;
  font-size: 14px;
}

.announcement-card h2 {
  color: #003875;
  margin-bottom: 10px;
  font-size: 1.25rem;
}

.announcement-footer {
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.page-info {
  color: #666;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 20px;
}

.announcement-meta {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
  }

  .pagination {
    flex-direction: column;
    gap: 10px;
  }
}
</style>