import api from '@/api/axios'

const state = {
  collections: {
    data: [],
    summary: null,
    loading: false,
    error: null
  },
  expenses: {
    data: [],
    summary: null,
    loading: false,
    error: null
  },
  annualSummary: {
    data: null,
    loading: false,
    error: null
  },
  dateRange: {
    startDate: null,
    endDate: null
  },
  currentPeriod: {
    type: 'daily', 
    date: null,
    month: null,
    year: null
  }
}

const mutations = {
  SET_COLLECTIONS(state, { data, summary }) {
    state.collections.data = data
    state.collections.summary = summary
  },
  SET_EXPENSES(state, { data, summary }) {
    state.expenses.data = data
    state.expenses.summary = summary
  },
  SET_ANNUAL_SUMMARY(state, data) {
    state.annualSummary.data = data
  },
  SET_COLLECTIONS_LOADING(state, status) {
    state.collections.loading = status
  },
  SET_EXPENSES_LOADING(state, status) {
    state.expenses.loading = status
  },
  SET_ANNUAL_SUMMARY_LOADING(state, status) {
    state.annualSummary.loading = status
  },
  SET_COLLECTIONS_ERROR(state, error) {
    state.collections.error = error
  },
  SET_EXPENSES_ERROR(state, error) {
    state.expenses.error = error
  },
  SET_ANNUAL_SUMMARY_ERROR(state, error) {
    state.annualSummary.error = error
  },
  SET_DATE_RANGE(state, { startDate, endDate }) {
    state.dateRange = { startDate, endDate }
  },
  SET_CURRENT_PERIOD(state, period) {
    state.currentPeriod = { ...state.currentPeriod, ...period }
  }
}

const actions = {
  async fetchDailyCollections({ commit }, date) {
    try {
      commit('SET_COLLECTIONS_LOADING', true)
      const response = await api.get('/reports/collections/daily', {
        params: { date }
      })
      commit('SET_COLLECTIONS', {
        data: response.data.collections,
        summary: response.data.summary
      })
      commit('SET_CURRENT_PERIOD', { type: 'daily', date })
    } catch (error) {
      commit('SET_COLLECTIONS_ERROR', error.message)
      throw error
    } finally {
      commit('SET_COLLECTIONS_LOADING', false)
    }
  },

  async fetchMonthlyCollections({ commit }, { month, year }) {
    try {
      commit('SET_COLLECTIONS_LOADING', true)
      const response = await api.get('/reports/collections/monthly', {
        params: { month, year }
      })
      commit('SET_COLLECTIONS', {
        data: response.data.collections,
        summary: response.data.summary
      })
      commit('SET_CURRENT_PERIOD', { type: 'monthly', month, year })
    } catch (error) {
      commit('SET_COLLECTIONS_ERROR', error.message)
      throw error
    } finally {
      commit('SET_COLLECTIONS_LOADING', false)
    }
  },

  async fetchDailyExpenses({ commit }, date) {
    try {
      commit('SET_EXPENSES_LOADING', true)
      const response = await api.get('/reports/expenses/daily', {
        params: { date }
      })
      commit('SET_EXPENSES', {
        data: response.data.expenses,
        summary: response.data.summary
      })
      commit('SET_CURRENT_PERIOD', { type: 'daily', date })
    } catch (error) {
      commit('SET_EXPENSES_ERROR', error.message)
      throw error
    } finally {
      commit('SET_EXPENSES_LOADING', false)
    }
  },

  async fetchMonthlyExpenses({ commit }, { month, year }) {
    try {
      commit('SET_EXPENSES_LOADING', true)
      const response = await api.get('/reports/expenses/monthly', {
        params: { month, year }
      })
      commit('SET_EXPENSES', {
        data: response.data.expenses,
        summary: response.data.summary
      })
      commit('SET_CURRENT_PERIOD', { type: 'monthly', month, year })
    } catch (error) {
      commit('SET_EXPENSES_ERROR', error.message)
      throw error
    } finally {
      commit('SET_EXPENSES_LOADING', false)
    }
  },

  async fetchAnnualSummary({ commit }, year) {
    try {
      commit('SET_ANNUAL_SUMMARY_LOADING', true)
      const response = await api.get('/reports/annual-summary', {
        params: { year }
      })
      commit('SET_ANNUAL_SUMMARY', response.data.summary)
      commit('SET_CURRENT_PERIOD', { type: 'annual', year })
    } catch (error) {
      commit('SET_ANNUAL_SUMMARY_ERROR', error.message)
      throw error
    } finally {
      commit('SET_ANNUAL_SUMMARY_LOADING', false)
    }
  }
}

const getters = {
  collectionsSummary: state => state.collections.summary,
  expensesSummary: state => state.expenses.summary,
  annualSummaryData: state => state.annualSummary.data,
  
  totalCollections: state => state.collections.summary?.totalAmount || 0,
  totalExpenses: state => state.expenses.summary?.totalAmount || 0,
  totalReceived: state => state.collections.summary?.totalReceived || 0,
  totalChange: state => state.collections.summary?.totalChange || 0,
  
  netIncome: (state, getters) => getters.totalCollections - getters.totalExpenses,
  
  collectionsByPaymentMethod: state => state.collections.summary?.byPaymentMethod || {},
  collectionsByPaymentType: state => state.collections.summary?.byPaymentType || {},
  expensesByType: state => state.expenses.summary?.byExpenseType || {},
  dailyCollectionsSummary: state => state.collections.summary?.dailySummary || {},
  dailyExpensesSummary: state => state.expenses.summary?.dailySummary || {},
  
  isLoadingCollections: state => state.collections.loading,
  isLoadingExpenses: state => state.expenses.loading,
  isLoadingAnnualSummary: state => state.annualSummary.loading,
  
  hasCollectionsError: state => !!state.collections.error,
  hasExpensesError: state => !!state.expenses.error,
  hasAnnualSummaryError: state => !!state.annualSummary.error,
  
  collectionsError: state => state.collections.error,
  expensesError: state => state.expenses.error,
  annualSummaryError: state => state.annualSummary.error,
  
  currentPeriodInfo: state => state.currentPeriod,
  
  totalTransactions: (state) => ({
    collections: state.collections.summary?.totalTransactions || 0,
    expenses: state.expenses.summary?.totalTransactions || 0
  }),
  
  monthlyStats: state => state.annualSummary.data?.monthlySummary || [],
  
  yearlyTotals: state => ({
    collections: state.annualSummary.data?.totalCollections || 0,
    expenses: state.annualSummary.data?.totalExpenses || 0,
    netIncome: state.annualSummary.data?.netIncome || 0
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}