import api from "@/api/axios";

export default {
  namespaced: true,

  state: {
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
      }
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },

  actions: {
    async login({ commit }, credentials) {
      commit("SET_LOADING", true);
      try {
        const { data } = await api.post("/auths/login", credentials);
        commit("SET_USER", data.user);
        commit("SET_TOKEN", data.token);
        commit("SET_ERROR", null);
        return data.user;
      } catch (error) {
        commit("SET_ERROR", error.response?.data?.error || "Login failed");
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async verifyToken({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const { data } = await api.post("/auths/verify-token");
        commit("SET_USER", data.user);
        commit("SET_TOKEN", token);
        return data.user;
      } catch (error) {
        commit("SET_USER", null);
        commit("SET_TOKEN", null);
        throw error;
      }
    },

    logout({ commit }) {
      commit("SET_USER", null);
      commit("SET_TOKEN", null);
    },
  },

  getters: {
    isAuthenticated: state => {
      return !!state.token && !!state.user;
    },
    userRole: (state) => state.user?.role,
  },
};
