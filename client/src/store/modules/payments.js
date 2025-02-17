import api from "@/api/axios";

export default {
  namespaced: true,

  state: {
    payments: [],
    currentPayment: null,
    loading: false,
    error: null,
  },

  mutations: {
    SET_PAYMENTS(state, payments) {
      state.payments = payments;
    },
    SET_CURRENT_PAYMENT(state, payment) {
      state.currentPayment = payment;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },

  actions: {
    async fetchPayments({ commit }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get("/payments");
        commit("SET_PAYMENTS", data);
        commit("SET_ERROR", null);
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchPaymentById({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get(`/payments/${id}`);
        commit("SET_CURRENT_PAYMENT", data);
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createPayment({ commit, dispatch }, paymentData) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.post("/payments", paymentData);
        await dispatch("fetchPayments");
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updatePayment({ commit, dispatch }, { id, payment }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.put(`/payments/${id}`, payment);
        await dispatch("fetchPayments");
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    clearCurrentPayment({ commit }) {
      commit("SET_CURRENT_PAYMENT", null);
    },

    clearError({ commit }) {
      commit("SET_ERROR", null);
    },
  },

  getters: {
    getPaymentsByType: (state) => (type) => {
      return state.payments.filter((payment) => payment.paymentType === type);
    },

    getPaymentsByConsumer: (state) => (consumerId) => {
      return state.payments.filter(
        (payment) => payment.consumerId === consumerId
      );
    },

    getTotalPayments: (state) => {
      return state.payments.reduce(
        (total, payment) => total + payment.amount,
        0
      );
    },

    getPendingPayments: (state) => {
      return state.payments.filter((payment) => payment.status === "pending");
    },

    getCompletedPayments: (state) => {
      return state.payments.filter((payment) => payment.status === "completed");
    },

    isProcessing: (state) => {
      return state.loading;
    },

    getCurrentPayment: (state) => {
      return state.currentPayment;
    },
  },
};
