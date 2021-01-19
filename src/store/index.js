import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    //PART 0 - PASSING ERROR
    errors: ["oneerror"],
    //PART ONE - APP INFO
    accountValue: 1000,
    currentBet: 50,
    isGameRunning: false,
    dealerMoney: 0,
    stats: {
      wins: 0,
      losses: 0,
      draws: 0,
      gamesPlayed: 0,
    },
    canDoubleDown: true,
    //PART TWO - API INFO
    deckId: "",
    //PART THREE - GAME VARIABLES
    playerpoint: 0,
    dealerPoint: 0,
  },
  mutations: {
    //PART ONE - APP OPERATIONS
    setBetPlus(state) {
      state.currentBet += 25;
    },
    setBetMinus(state) {
      state.currentBet -= 25;
    },
    setDealerMoney(state, value) {
      state.dealerMoney = value;
      state.accountValue = state.accountValue - value;
      state.isGameRunning = true;
    },
    setDoubleDown(state) {
      state.accountValue -= state.dealerMoney;
      state.dealerMoney *= 2;
    },
    setDoubleDownOpposite(state) {
      state.canDoubleDown = !state.canDoubleDown;
    },
    //PART TWO - API OPERATIONS
    setDeckId(state, value) {
      state.deckId = value;
    },
    increasePlayerPoints(state, value) {
      console.log(`Player0: ${state.playerpoint}`);
      state.playerpoint += parseFloat(value);
      console.log(`Player1: ${state.playerpoint}`);
    },
    increaseDealerPoints(state, value) {
      console.log(`Dealer0: ${state.dealerPoint}`);
      if (value === "ACE") {
        if (state.dealerPoint < 11) {
          return (state.dealerPoint += 10);
        }
        return (state.dealerPoint += 1);
      }

      if (value === "QUEEN" || value === "KING" || value === "JACK") {
        return (state.dealerPoint += 10);
      }
      state.playerpoint += parseFloat(value);
    },
  },
  actions: {
    //PART TWO - API OPERATIONS
    async axiosNewDecks(state) {
      try {
        let response = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
        );
        response = response.data.deck_id;
        state.commit("setDeckId", response);
      } catch (err) {
        state.errors.push(err);
      }
    },
    async hitGame(state, value) {
      try {
        let response = await axios.get(
          `https://deckofcardsapi.com/api/deck/${value}/draw/?count=2`
        );

        response = response.data.cards;
        console.log(response[0]);
        console.log(response[1]);
        if (!state.playerpoint) {
          state.commit("increasePlayerPoints", response[0].value);
          state.commit("increaseDealerPoints", response[1].value);
        }
      } catch (err) {
        state.errors.push(err);
      }
    },
  },
  modules: {},
  getters: {
    //PART ONE - APP VARIABLES
    getCurrentBet: (state) => state.currentBet,
    getCurrentAccount: (state) => state.accountValue,
    getGameRunning: (state) => state.isGameRunning,
    getDealerMoney: (state) => state.dealerMoney,
    getGameStats: (state) => state.stats,
    //PART TWO - DECK VARIABLES
    getDeckId: (state) => state.deckId,
    getPlayersPoints: (state) => state.playerpoint,
    getDealersPoints: (state) => state.dealerPoint,
  },
});
