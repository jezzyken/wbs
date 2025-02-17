import api from "@/api/axios";

export default {
  namespaced: true,

  state: {
    readings: [],
    currentReading: null,
    loading: false,
    error: null,
  },

  mutations: {
    SET_READINGS(state, readings) {
      state.readings = readings;
    },
    SET_CURRENT_READING(state, reading) {
      state.currentReading = reading;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    UPDATE_READING(state, updatedReading) {
      const index = state.readings.findIndex(
        (r) => r._id === updatedReading._id
      );
      if (index !== -1) {
        state.readings[index] = updatedReading;
      }
    },
  },

  actions: {
    async fetchReadings({ commit }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get("/meterreadings");
        commit("SET_READINGS", data);
        commit("SET_ERROR", null);
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchReading({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get(`/meterreadings/${id}`);
        commit("SET_CURRENT_READING", data);
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createReading({ commit, dispatch }, readingData) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.post("/meterreadings", {
          ...readingData,
          consumption: readingData.currentReading - readingData.previousReading,
        });
        await dispatch("fetchReadings");
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateReading({ commit, dispatch }, { id, readingData }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.put(`/meterreadings/${id}`, {
          ...readingData,
          consumption: readingData.currentReading - readingData.previousReading,
        });
        await dispatch("fetchReadings");
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async filterReadings({ commit }, { startDate, endDate }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get("/meterreadings", {
          params: {
            startDate,
            endDate,
          },
        });
        commit("SET_READINGS", data);
        commit("SET_ERROR", null);
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

  getters: {
    getReadingsByConsumer: (state) => (consumerId) => {
      return state.readings.filter(
        (reading) => reading.consumerId === consumerId
      );
    },

    getLatestReading: (state) => (consumerId) => {
      return state.readings
        .filter((reading) => reading.consumerId === consumerId)
        .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate))[0];
    },

    getReadingsByStatus: (state) => (status) => {
      return state.readings.filter((reading) => reading.status === status);
    },

    getTotalConsumption: (state) => {
      return state.readings.reduce(
        (total, reading) => total + reading.consumption,
        0
      );
    },
  },
};
