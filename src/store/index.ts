import { createStore } from "vuex";

export default createStore({
  state: {
    loading: false,
    loadingList: [] as any,
    stationData: null
  },
  mutations: {
    setStationData(state, payload) {
      state.stationData = payload;
    },
    showLoading(state) {
      state.loadingList.push("show");
      if (state.loadingList.length <= 1) {
        state.loading = true;
      }
    },
    hideLoading(state) {
      state.loadingList.pop();
      if (state.loadingList.length <= 0) {
        state.loading = false;
      }
    }
  },
  actions: {},
  modules: {}
});
