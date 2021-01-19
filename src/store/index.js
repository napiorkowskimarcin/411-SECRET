import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    //PART 0 - PASSING ERROR
    errors: "",
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
    //PART THREE - GAME VARIABLES AND FLAGS
    playerpoint: 0,
    dealerPoint: 0,
    isStandOn: false,
  },
  mutations: {
    //PART 0 - ERROR ARRAY
    addError(state, err) {
      state.errors = err;
    },
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
      if (value === "ACE") {
        if (state.playerpoint < 11) {
          return (state.playerpoint += 10);
        }
        return (state.playerpoint += 1);
      }

      if (value === "QUEEN" || value === "KING" || value === "JACK") {
        return (state.playerpoint += 10);
      }
      return (state.playerpoint += parseInt(value));
    },
    increaseDealerPoints(state, value) {
      if (value === "ACE") {
        if (state.dealerPoint < 11) {
          return (state.dealerPoint += 10);
        }
        return (state.dealerPoint += 1);
      }

      if (value === "QUEEN" || value === "KING" || value === "JACK") {
        return (state.dealerPoint += 10);
      }
      return (state.dealerPoint += parseInt(value));
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
        state.commit("addError", err);
      }
    },
    async hitGame(state, value) {
      try {
        const playerPoints = state.getters.getPlayersPoints;
        if (!playerPoints) {
          //CASE FIRST CARDS:
          console.log("first run");
          let response = await axios.get(
            `https://deckofcardsapi.com/api/deck/${value}/draw/?count=2`
          );
          response = response.data.cards;
          state.commit("increasePlayerPoints", response[0].value);
          state.commit("increaseDealerPoints", response[1].value);
        } else {
          //CASE  CARD FOR THE PLAYER ONLY:
          let response = await axios.get(
            `https://deckofcardsapi.com/api/deck/${value}/draw/?count=1`
          );
          response = response.data.cards[0];
          console.log(response);
          state.commit("increasePlayerPoints", response.value);
        }
      } catch (err) {
        state.commit("addError", err);
      }
    },
  },
  modules: {},
  getters: {
    //PART ZERO - ERROR ARRAY:
    getErrors: (state) => state.errors,
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
