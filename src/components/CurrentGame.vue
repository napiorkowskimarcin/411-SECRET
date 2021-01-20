<template>
  <div v-if="areErrors" class="bg-danger text-white text-center">
    <p>TRY TO CONTINUE THE GAME: {{ areErrors }}</p>
  </div>
  <p class="text-center">
    Your account: <span>{{ accountValue }}</span
    >$
  </p>
  <p class="text-center" v-if="!isGameRunning">
    Set bet: <span>{{ currentBet }}</span
    >$
  </p>
  <div class="row d-flex justify-content-around" v-if="!isGameRunning">
    <button class="btn btn-primary" @click="increaseBet">+</button>
    <button class="btn btn-primary" @click="decreaseBet">-</button>
  </div>
  <!-- <div class="row d-flex justify-content-around" v-if="isGameRunning"></div> -->
  <div class="row">
    <div class="col games">
      <p class="text-center">Wins: {{ gameStats.wins }}</p>
      <p class="text-center">Losses: {{ gameStats.losses }}</p>
      <p class="text-center">Draws: {{ gameStats.draws }}</p>
      <p class="text-center">Games played: {{ gameStats.gamesPlayed }}/5</p>
    </div>
  </div>
</template>

<script>
//import { mapState, mapMutations } from "vuex";
export default {
  name: "CurrentGame",

  data() {
    return {};
  },
  computed: {
    currentBet() {
      return this.$store.getters.getCurrentBet;
    },
    accountValue() {
      return this.$store.getters.getCurrentAccount;
    },
    isGameRunning() {
      return this.$store.getters.getGameRunning;
    },
    areErrors() {
      let response = this.$store.getters.getErrors;
      return response.message;
    },
    ifStandOn() {
      return this.$store.getters.getIsStandOnMode;
    },
    gameStats() {
      return this.$store.getters.getGameStats;
    },
  },

  methods: {
    increaseBet() {
      if (this.currentBet < this.accountValue) {
        this.$store.commit("setBetPlus");
      }
    },
    decreaseBet() {
      if (this.currentBet > 50) {
        this.$store.commit("setBetMinus");
      }
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
</style>
