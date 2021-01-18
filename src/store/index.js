import { createStore } from "vuex";

export default createStore({
  state: {
    accountValue: 1000,
    currentBet: 50,
  },
  mutations: {
    setBetPlus(state) {
      state.currentBet += 50;
    },
    setBetMinus(state) {
      state.currentBet -= 50;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getCurrentBet: (state) => state.currentBet,
    getCurrentAccount: (state) => state.accountValue,
  },
});
