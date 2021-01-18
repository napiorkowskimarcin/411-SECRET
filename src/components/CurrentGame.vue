<template>
  <div>
    Your account: <span>{{ accountValue }}</span
    >$
  </div>
  <div v-if="!isGameRunning">
    Set bet: <span>{{ currentBet }}</span
    >$
  </div>
  <div class="row d-flex justify-content-around" v-if="!isGameRunning">
    <button class="btn btn-primary" @click="increaseBet">+</button>
    <button class="btn btn-primary" @click="decreaseBet">-</button>
  </div>
</template>

<script>
//import { mapState, mapMutations } from "vuex";
export default {
  name: "CurrentGame",
  // computed: {
  //   // ...mapState({ accountValue: "accountValue" }),
  //   // ...mapState({ currentBet: "currentBet" }),
  //   // ...mapMutations(["setBetPlus", "setBetMinus"]),
  // },
  data() {
    return {
      // currentBet: 0,
      // accountValue: 0,
      //isGameRunning: 0,
    };
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

<style></style>
