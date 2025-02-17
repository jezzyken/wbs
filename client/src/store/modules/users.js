import api from '@/api/axios'

export default {
  namespaced: true,
  
  state: {
    users: [],
    currentUser: null,
    loading: false,
    error: null
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async fetchCurrentUser({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get('/users/me')
        commit('SET_CURRENT_USER', data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateCurrentUser({ commit }, userData) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.put('/users/me', userData)
        commit('SET_CURRENT_USER', data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchUsers({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get('/users')
        commit('SET_USERS', data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchUserById({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get(`/users/${id}`)
        commit('SET_CURRENT_USER', data)
        commit('SET_ERROR', null)
        return data
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createUser({ commit, dispatch }, userData) {
      commit('SET_LOADING', true)
      try {
        await api.post('/users', userData)
        await dispatch('fetchUsers')
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateUser({ commit, dispatch }, { id, userData }) {
      commit('SET_LOADING', true)
      try {
        await api.put(`/users/${id}`, userData)
        await dispatch('fetchUsers')
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async archiveUser({ commit, dispatch }, { id, reason }) {
      commit('SET_LOADING', true)
      try {
        await api.delete(`/users/${id}`, { data: { reason } })
        await dispatch('fetchUsers')
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async changePassword({ commit }, { currentPassword, newPassword }) {
      commit('SET_LOADING', true)
      try {
        await api.post('/users/change-password', { currentPassword, newPassword })
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async requestPasswordReset({ commit }, email) {
      commit('SET_LOADING', true)
      try {
        await api.post('/users/reset-password-request', { email })
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async resetPassword({ commit }, { token, newPassword }) {
      commit('SET_LOADING', true)
      try {
        await api.post('/users/reset-password', { token, newPassword })
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}