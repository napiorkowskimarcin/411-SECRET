<template>
  <div>
    <div class="row ">
      <div class="col" v-if="handPlayer.length > 0">
        <p>Players hands:</p>
        <table>
          <thead>
            <tr>
              <th>ROUNDS:</th>
              <th>CARDS:</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(round, index) in handPlayer" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td class=" row">
                <div
                  v-for="(img, index) in round"
                  :key="index"
                  class="game col"
                >
                  <img :src="img" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col" v-if="handDealer.length > 0">
        <p>Dealer hands:</p>
        <table>
          <thead>
            <tr>
              <th>CARDS:</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(round, index) in handDealer" :key="index">
              <td class=" row">
                <div
                  v-for="(img, index) in round"
                  :key="index"
                  class="game col"
                >
                  <img :src="img" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapState, mapMutations } from "vuex";
export default {
  name: "History",

  data() {
    return {};
  },

  computed: {
    handPlayer() {
      return this.$store.getters.getCardsPlayer;
    },
    handDealer() {
      return this.$store.getters.getCardsDealer;
    },
    totalHistory() {
      return this.$store.getters.getTotalHistory;
    },
  },

  methods: {},
};
</script>

<style scoped>
div > img {
  max-height: 10vh;
}
</style>
