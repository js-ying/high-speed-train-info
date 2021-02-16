import { createStore } from "vuex";

export default createStore({
  state: {
    loading: false,
    stationData: null
  },
  mutations: {
    setStationData(state, payload) {
      state.stationData = payload;
    },
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    }
  },
  actions: {},
  modules: {}
});
