import api from '@/api/axios'

export default {
  namespaced: true,
  
  state: {
    consumers: [],
    currentConsumer: null, 
    loading: false,
    error: null
  },

  mutations: {
    SET_CONSUMERS(state, consumers) {
      state.consumers = consumers
    },
    SET_CURRENT_CONSUMER(state, consumer) { 
      state.currentConsumer = consumer
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async fetchConsumers({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get('/consumers')
        commit('SET_CONSUMERS', data)
        commit('SET_ERROR', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchConsumerById({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const { data } = await api.get(`/consumers/${id}`)
        commit('SET_CURRENT_CONSUMER', data)
        commit('SET_ERROR', null)
        return data
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createConsumer({ commit, dispatch }, consumer) {
      commit('SET_LOADING', true)
      try {
        await api.post('/consumers', consumer)
        await dispatch('fetchConsumers')
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateConsumer({ commit, dispatch }, { id, consumer }) {
      commit('SET_LOADING', true)
      try {
        await api.put(`/consumers/${id}`, consumer)
        await dispatch('fetchConsumers')
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async archiveConsumer({ commit, dispatch }, { id, reason }) {
      commit('SET_LOADING', true)
      try {
        await api.delete(`/consumers/${id}`, { data: { reason } })
        await dispatch('fetchConsumers')
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}