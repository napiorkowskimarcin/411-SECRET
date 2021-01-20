<template>
  <div>
    <p>Player temp{{ currentHandPlayer }}</p>
    <p>Dealer temp{{ currentHandDealer }}</p>
    <p>Player{{ handPlayer }}</p>
    <p>Dealer{{ handDealer }}</p>
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
    currentHandPlayer() {
      return this.$store.getters.getCurrentCardsPlayer;
    },
    currentHandDealer() {
      return this.$store.getters.getCurrentCardsDealer;
    },
    handPlayer() {
      return this.$store.getters.getCardsPlayer;
    },
    handDealer() {
      return this.$store.getters.getCardsDealer;
    },
  },

  methods: {},
};
</script>
