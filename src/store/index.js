import { createStore } from "vuex";

export default createStore({
  state: {
    accountValue: 1000,
    currentBet: 50,
    isGameRunning: false,
    dealerMoney: 0,
  },
  mutations: {
    setBetPlus(state) {
      state.currentBet += 50;
    },
    setBetMinus(state) {
      state.currentBet -= 50;
    },
    setDealerMoney(state, value) {
      state.dealerMoney = value;
      state.accountValue = state.accountValue - value;
      //state.isGameRunning = !state.isGameRunning;
      state.isGameRunning = true;
    },
    setDoubleDown(state) {
      state.accountValue -= state.dealerMoney;
      state.dealerMoney *= 2;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getCurrentBet: (state) => state.currentBet,
    getCurrentAccount: (state) => state.accountValue,
    getGameRunning: (state) => state.isGameRunning,
    getDealerMoney: (state) => state.dealerMoney,
  },
});
