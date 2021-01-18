<template>
  <div class="home">
    <div class="row">
      <div class="col">
        <HandPlayer />
      </div>
      <div class="col">
        <CurrentGame />
      </div>
      <div class="col">
        <HandDealer />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table">
          <tr>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
          </tr>
          <tr>
            <th>0</th>
            <th>0</th>
            <th>0</th>
          </tr>
        </table>
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
// @ is an alias to /src
import HandPlayer from "../components/HandPlayer";
import HandDealer from "../components/HandDealer";
import CurrentGame from "../components/CurrentGame";

export default {
  name: "Home",
  components: {
    HandPlayer,
    HandDealer,
    CurrentGame,
  },
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
<style scoped></style>
