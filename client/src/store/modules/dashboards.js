import api from '@/api/axios'

export default {
  namespaced: true,
  
  state: {
    summary: {
      totalConsumers: 0,
      activeConsumers: 0,
      totalUnpaidBills: 0,
      totalOverdueBills: 0,
      currentMonthReadings: 0,
      monthlyExpenses: 0
    },
    collections: [],
    consumerStatus: [],
    expenseSummary: [],
    recentActivities: {
      recentBills: [],
      recentReadings: []
    },
    loading: false,
    error: null
  },

  mutations: {
    SET_SUMMARY(state, summary) {
      state.summary = summary
    },
    SET_COLLECTIONS(state, collections) {
      state.collections = collections
    },
    SET_CONSUMER_STATUS(state, status) {
      state.consumerStatus = status
    },
    SET_EXPENSE_SUMMARY(state, expenses) {
      state.expenseSummary = expenses
    },
    SET_RECENT_ACTIVITIES(state, activities) {
      state.recentActivities = activities
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async fetchDashboardSummary({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get('/dashboards/summary')
        commit('SET_SUMMARY', data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchCollections({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get('/dashboards/collections')
        commit('SET_COLLECTIONS', data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchConsumerStatus({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get('/dashboards/consumer-status')
        commit('SET_CONSUMER_STATUS', data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchExpenseSummary({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get('/dashboards/expenses')
        commit('SET_EXPENSE_SUMMARY', data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchRecentActivities({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get('/dashboards/recent-activities')
        commit('SET_RECENT_ACTIVITIES', data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchAllDashboardData({ dispatch }) {
      try {
        await Promise.all([
          dispatch('fetchDashboardSummary'),
          dispatch('fetchCollections'),
          dispatch('fetchConsumerStatus'),
          dispatch('fetchExpenseSummary'),
          dispatch('fetchRecentActivities')
        ])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }
  },

  getters: {
    getSummary: state => state.summary,
    getCollections: state => state.collections,
    getConsumerStatus: state => state.consumerStatus,
    getExpenseSummary: state => state.expenseSummary,
    getRecentActivities: state => state.recentActivities,
    isLoading: state => state.loading,
    getError: state => state.error
  }
}