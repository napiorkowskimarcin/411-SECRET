import { createStore } from "vuex";
import axios from "axios";

//I DID NOT FIND A NICE WAY TO SHORTCUT FOR THIS - PROBABLY I WILL TRY TO MAKE THAT FUNCTIONS AND RESTARTING GAMES/ROUNDS A LITTLE BIT NICER
//I ALSO CAN MAKE FUNCTIONS WRITTEN A LITTLE BIT BETTER - TO DO ACCORDINGLY TO THE TIME
//BAD WAY - LOOK FOR ENDROUND MUTATION - I WOULD LIKE TO HAVE THEM INSIDE THE STATE, NOT OUTSIDE THE OBJECT OF STATE - NEED SKGT GUYS TO ADVISE ;)
function Reset(state) {
  state.cardPlayer.push(state.currentCardPlayer);
  state.cardDealer.push(state.currentCardDealer);
  state.stats.gamesPlayed++;
  state.isStandOn = false;
  state.canDoubleDown = true;
  state.isGameRunning = false;
  state.errors = "";
  state.imgPlayer = [];
  state.imgDealer = [];
  state.currentCardPlayer = [];
  state.currentCardDealer = [];
}
function ResetPoints(state) {
  state.playerpoint = 0;
  state.dealerPoint = 0;
}
function CheckEndGame(state) {
  if (state.stats.gamesPlayed === 5 || state.accountValue <= 0) {
    let today = new Date()
      .toString()
      .split(" ")
      .splice(1, 4)
      .join(" ");
    state.stats.gamesPlayed = 0;
    state.cardPlayer = [];
    state.cardDealer = [];
    state.currentCardPlayer = [];
    state.currentCardDealer = [];
    state.stats.wins = 0;
    state.stats.losses = 0;
    state.stats.draws = 0;
    //
    let localHistory = localStorage.getItem("totalHistory");
    if (localHistory !== null) {
      state.totalHistory = JSON.parse(localHistory);
    }
    //
    let savingTotalHistory = state.totalHistory;
    state.totalHistory.push({ date: today, score: state.accountValue });
    savingTotalHistory = JSON.stringify(savingTotalHistory);
    localStorage.setItem("totalHistory", savingTotalHistory);
  }
}

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
    imgPlayer: [],
    imgDealer: [],
    //PART FOUR - TOTAL HISTORY:
    currentCardPlayer: [],
    currentCardDealer: [],
    cardPlayer: [],
    cardDealer: [],
    //TotalHistory:
    totalHistory: [],
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
      state.canDoubleDown = !state.canDoubleDown;
    },

    //PART TWO - API OPERATIONS
    setDeckId(state, value) {
      state.deckId = value;
    },
    setStandOn(state) {
      state.isStandOn = true;
    },
    //TO ASK - HOW TO IMPLEMENT IT INSIDE OF THE STATE
    // endround(state) {
    //   state.stats.gamesPlayed++;
    //   state.isStandOn = false;
    //   state.canDoubleDown = true;
    //   state.isGameRunning = false;
    //   state.playerpoint = 0;
    //   state.dealerPoint = 0;
    //   state.errors = "";
    //   return alert("over21 - lost game becouse of special");
    // },
    //ADD A VALUE FROM THE CARD TO CURRENT POINTS - PLAYER
    increasePlayerPoints(state, value) {
      if (value === "ACE") {
        if (state.playerpoint < 11) {
          return (state.playerpoint += 10);
        }
        return (state.playerpoint += 1);
      }

      if (value === "QUEEN" || value === "KING" || value === "JACK") {
        state.playerpoint += 10;
        if (state.playerpoint <= 21) return state.playerpoint;
        else {
          state.stats.losses++;
          Reset(state);
          ResetPoints(state);
          CheckEndGame(state);

          return alert("LOSS");
        }
      }
      state.playerpoint += parseInt(value);
      //
      if (state.playerpoint <= 21) return state.playerpoint;
      else {
        state.stats.losses++;
        Reset(state);
        ResetPoints(state);
        CheckEndGame(state);
        return alert("LOSS");
      }
    },
    //ADD A VALUE FROM THE CARD TO CURRENT POINTS - DEALER
    increaseDealerPoints(state, value) {
      if (value === "ACE") {
        if (state.dealerPoint < 11) {
          return (state.dealerPoint += 10);
        }
        return (state.dealerPoint += 1);
      }

      if (value === "QUEEN" || value === "KING" || value === "JACK") {
        state.dealerPoint += 10;
        if (state.dealerPoint <= 21) return state.dealerPoint;
        else {
          state.accountValue = state.accountValue + 2.5 * state.currentBet;
          state.stats.wins++;
          Reset(state);
          ResetPoints(state);
          CheckEndGame(state);
          return alert("WIN!");
        }
      }
      state.dealerPoint += parseInt(value);
      if (state.playerpoint <= 21) return state.dealerPoint;
      else {
        state.accountValue = state.accountValue + 2.5 * state.currentBet;
        state.stats.wins++;
        Reset(state);
        ResetPoints(state);
        CheckEndGame(state);
        return alert("WIN!");
      }
    },
    addImgPlayer(state, value) {
      state.imgPlayer.push(value);
    },
    addImgDealer(state, value) {
      state.imgDealer.push(value);
    },
    checkResult(state) {
      if (state.playerpoint > state.dealerPoint && state.playerpoint > 0) {
        state.accountValue = state.accountValue + 2.5 * state.currentBet;
        state.stats.wins++;
        Reset(state);
        ResetPoints(state);
        setTimeout(alert("WIN!"), 1000);
        return CheckEndGame(state);
      }
      if (state.playerpoint < state.dealerPoint && state.playerpoint > 0) {
        state.stats.losses++;
        Reset(state);
        ResetPoints(state);
        CheckEndGame(state);
        setTimeout(alert("LOSS!"), 1000);
        return CheckEndGame(state);
      }
      if (state.playerpoint === state.dealerPoint && state.playerpoint > 0) {
        state.accountValue = state.accountValue + state.currentBet;
        state.stats.draws++;
        Reset(state);
        ResetPoints(state);
        CheckEndGame(state);
        setTimeout(alert("DRAW!"), 1000);
        return CheckEndGame(state);
      }
    },
    //PART FOUR - CARD HISTORY
    addCardPlayer(state, value) {
      state.currentCardPlayer.push(value);
    },
    addCardDealer(state, value) {
      state.currentCardDealer.push(value);
    },
    addRoundToCardHistory(state) {
      state.cardPlayer.push(state.currentCardPlayer);
      state.cardDealer.push(state.currentCardDealer);
    },
    addState(state, value) {
      //PART ONE - APP INFO
      state.accountValue = value.accountValue;
      state.currentBet = 50;
      state.isGameRunning = false;
      state.dealerMoney = 0;
      state.stats = value.stats;
      state.canDoubleDown = true;
      //PART TWO - API INFO
      state.deckId = value.deckId;
      //PART THREE - GAME VARIABLES AND FLAGS
      state.playerpoint = value.playerpoint;
      state.dealerPoint = value.dealerPoint;
      state.imgPlayer = [];
      state.imgDealer = [];
      //PART FOUR - TOTAL HISTORY:
      state.currentCardPlayer = [];
      state.currentCardDealer = [];
      state.cardPlayer = value.cardPlayer;
      state.cardDealer = value.cardDealer;
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
        let isStandOn = state.getters.getIsStandOnMode;

        if (!playerPoints) {
          //CASE FIRST CARDS:

          let response = await axios.get(
            `https://deckofcardsapi.com/api/deck/${value}/draw/?count=2`
          );
          response = response.data.cards;
          state.commit("addImgPlayer", response[0].image);
          state.commit("addImgDealer", response[1].image);
          state.commit("addCardPlayer", response[0].image);
          state.commit("increasePlayerPoints", response[0].value);
          state.commit("increaseDealerPoints", response[1].value);
          state.commit("addCardDealer", response[1].image);
        } else if (!isStandOn) {
          //CASE  CARD FOR THE PLAYER ONLY - BEFORE STAND IS PUSHED:
          let response = await axios.get(
            `https://deckofcardsapi.com/api/deck/${value}/draw/?count=1`
          );
          response = response.data.cards[0];
          state.commit("addImgPlayer", response.image);
          state.commit("increasePlayerPoints", response.value);
          state.commit("addCardPlayer", response.image);
        }
      } catch (err) {
        state.commit("addError", err);
      }
    },
    async hitDealer(state, value) {
      //CASE USER PRESSED STAND ON AND WANTS TO SEE DEALERS CARDS:
      let isStandOn = state.getters.getIsStandOnMode;

      if (isStandOn)
        try {
          let dealersPoints = state.getters.getDealersPoints;
          while (dealersPoints < 16) {
            let response = await axios.get(
              `https://deckofcardsapi.com/api/deck/${value}/draw/?count=1`
            );
            response = response.data.cards[0];
            state.commit("increaseDealerPoints", response.value);
            state.commit("addImgDealer", response.image);
            state.commit("addCardDealer", response.image);

            dealersPoints = state.getters.getDealersPoints;
          }
          return state.commit("checkResult");
        } catch (err) {
          state.commit("addError", err);
        }
    },
    async setStore(state, value) {
      try {
        console.log(value);
        state.commit("addState", value);
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
    getIsStandOnMode: (state) => state.isStandOn,
    getCanDoubleDown: (state) => state.canDoubleDown,
    getPlayerImg: (state) => state.imgPlayer,
    getDealerImg: (state) => state.imgDealer,
    //PART FOUR - CURRENT HAND
    getCurrentCardsPlayer: (state) => state.currentCardPlayer,
    getCurrentCardsDealer: (state) => state.currentCardDealer,
    getCardsPlayer: (state) => state.cardPlayer,
    getCardsDealer: (state) => state.cardDealer,
    //PART FIVE - TOTAL HISTORY
    getTotalHistory: (state) => state.totalHistory,
    //PART SIX - GET STATE
    getState: (state) => state,
  },
});
