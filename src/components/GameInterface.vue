<template>
  <div>
    <div class="row">
      <div class="col">
        <span>Wins: {{ gameStats.wins }}</span>
        <span>Losses: {{ gameStats.losses }}</span>
        <span>Draws: {{ gameStats.draws }}</span>
        <span>Games played: {{ gameStats.gamesPlayed }}/5</span>
      </div>
    </div>

    <div class="row">
      <div v-if="isGameRunning" class="col d-flex justify-content-around">
        <button class="btn btn-primary" @click="hitGame" v-if="!ifStandOn">
          HIT
        </button>
        <button class="btn btn-primary" @click="standOn" v-if="!ifStandOn">
          STAND
        </button>
        <button
          class="btn btn-primary"
          @click="doubleDown"
          v-if="!ifStandOn && canDoubleDown"
        >
          DOUBLE-DOWN
        </button>
        <button class="btn btn-primary" @click="dealerTurn" v-if="ifStandOn">
          CHECK DEALERS CARDS
        </button>
        <div class="btn btn-primary">Game value: {{ gameValue }}</div>
      </div>
    </div>
    <div class="row">
      <div v-if="!isGameRunning" class="col d-flex justify-content-around">
        <button class="btn btn-primary" @click="startGame">START</button>
        <div class="btn btn-primary">Account value: {{ accountValue }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameInterface",

  data() {
    return {};
  },
  computed: {
    isGameRunning() {
      return this.$store.getters.getGameRunning;
    },
    accountValue() {
      return this.$store.getters.getCurrentAccount;
    },
    gameValue() {
      return this.$store.getters.getDealerMoney;
    },
    gameStats() {
      return this.$store.getters.getGameStats;
    },
    ifStandOn() {
      return this.$store.getters.getIsStandOnMode;
    },
    canDoubleDown() {
      return this.$store.getters.getCanDoubleDown;
    },
    playerImg() {
      return this.$store.getters.getPlayerImg;
    },
    dealerImg() {
      return this.$store.getters.getDealerImg;
    },
  },

  methods: {
    async startGame() {
      //For the very first game
      if (!this.$store.getters.getGameStats.gamesPlayed) {
        //Set selected Bet as Dealer money, and deduct it from the account value.
        this.$store.commit("setDealerMoney", this.$store.state.currentBet);
        //get the deck id from the API:  https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6
        this.$store.dispatch("axiosNewDecks");
      } else if (0 <= this.$store.getters.getGameStats.gamesPlayed < 5) {
        //For the other games
        //Set selected Bet as Dealer money, and deduct it from the account value.
        this.$store.commit("setDealerMoney", this.$store.state.currentBet);
      } else if (this.$store.getters.getGameStats.gamesPlayed === 5) {
        console.log("end of the game");
      }
    },
    async hitGame() {
      //getting two cards from the deck - starting round.
      this.$store.dispatch("hitGame", this.$store.getters.getDeckId);
    },
    async dealerTurn() {
      //play for the dealer till it gets 17 points
      this.$store.dispatch("hitDealer", this.$store.getters.getDeckId);
    },

    doubleDown() {
      this.$store.commit("setDoubleDown");
    },
    standOn() {
      this.$store.commit("setStandOn");
    },
  },
};
</script>
