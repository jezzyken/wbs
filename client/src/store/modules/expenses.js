import api from "@/api/axios";

export default {
  namespaced: true,

  state: {
    expenses: [],
    currentExpense: null,
    loading: false,
    error: null,
  },

  mutations: {
    SET_EXPENSES(state, expenses) {
      state.expenses = expenses;
    },
    SET_CURRENT_EXPENSE(state, expense) {
      state.currentExpense = expense;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },

  actions: {
    async fetchExpenses({ commit }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get("/expenses");
        commit("SET_EXPENSES", data);
        commit("SET_ERROR", null);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchExpenseById({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.get(`/expenses/${id}`);
        commit("SET_CURRENT_EXPENSE", data);
        commit("SET_ERROR", null);
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createExpense({ commit, dispatch }, expense) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.post("/expenses", expense);
        await dispatch("fetchExpenses");
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateExpense({ commit, dispatch }, { id, expense }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.put(`/expenses/${id}`, expense);
        await dispatch("fetchExpenses");
        return data;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async deleteExpense({ commit, dispatch }, id) {
      if (!id) {
        console.error("No ID provided");
        return;
      }
      console.log("Deleting ID:", id);
      commit("SET_LOADING", true);
      try {
        await api.patch(`/expenses/${id}`);
        await dispatch("fetchExpenses");
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    }
  },

  getters: {
    totalExpenses: (state) => {
      return state.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
    },
    expensesByType: (state) => (type) => {
      return state.expenses.filter((expense) => expense.expenseType === type);
    },
  },
};
