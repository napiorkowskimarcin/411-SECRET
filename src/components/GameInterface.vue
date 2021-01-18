<template>
  <div>
    <div class="row">
      <div class="col">
        <span>Wins: {{ gameStats.wins }}</span>
        <span>Losses: {{ gameStats.losses }}</span>
        <span>Draws: {{ gameStats.draws }}</span>
      </div>
    </div>

    <div class="row">
      <div v-if="isGameRunning" class="col d-flex justify-content-around">
        <button class="btn btn-primary">HIT</button>
        <button class="btn btn-primary">STAND</button>
        <button class="btn btn-primary" @click="doubleDown">DOUBLE-DOWN</button>
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
  },

  methods: {
    startGame() {
      console.log(this.isGameRunning);
      this.$store.commit("setDealerMoney", this.$store.state.currentBet);
      console.log(this.isGameRunning);
    },
    doubleDown() {
      this.$store.commit("setDoubleDown");
    },
  },
};
</script>
