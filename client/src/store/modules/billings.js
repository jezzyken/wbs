import api from "@/api/axios";

export default {
  namespaced: true,

  state: {
    bills: [],
    currentBill: null,
    loading: false,
    error: null,
    billTemplate: null,
  },

  mutations: {
    SET_BILLS(state, bills) {
      state.bills = bills;
    },
    SET_CURRENT_BILL(state, bill) {
      state.currentBill = bill;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_BILL_TEMPLATE(state, template) {
      state.billTemplate = template;
    },
  },

  actions: {
    async fetchBills({ commit }, billingPeriod) {
      commit("SET_LOADING", true);
      try {
        let url = "/bills";
        if (billingPeriod?.to) {
          url += `?to=${billingPeriod.to}`;
        }
        const { data } = await api.get(url);
        commit("SET_BILLS", data);
        commit("SET_ERROR", null);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchUnpaidBills({ commit }, consumerId) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get(
          `/bills?consumerId=${consumerId}&status=unpaid`
        );
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchBillById({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get(`/bills/${id}`);
        commit("SET_CURRENT_BILL", data);
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchBillByAccountNo({ commit }, accountNo) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get(`/bills/inquiry/${accountNo}`);
        commit("SET_CURRENT_BILL", data);
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.message || error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createBill({ commit, dispatch }, bill) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.post("/bills", bill);
        await dispatch("fetchBills");
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateBill({ commit, dispatch }, { id, bill }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.put(`/bills/${id}`, bill);
        await dispatch("fetchBills");
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchBillTemplate({ commit }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get("/bills/template/html");
        commit("SET_BILL_TEMPLATE", data);
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

  getters: {
    getBillById: (state) => (id) => {
      return state.bills.find((bill) => bill._id === id);
    },
    sortedBills: (state) => {
      return [...state.bills].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
  },
};
