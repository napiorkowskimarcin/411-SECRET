<template>
  <div class="welcome" v-if="!isGameRunning">
    <img src="https://deckofcardsapi.com/static/img/KH.png" alt="" srcset="" />
  </div>
  <div class="game" v-if="isGameRunning">
    <img src="https://deckofcardsapi.com/static/img/QH.png" alt="" srcset="" />
  </div>
</template>

<script>
export default {
  name: "HandPlayer",
  computed: {
    isGameRunning() {
      return this.$store.getters.getGameRunning;
    },
  },
};
</script>

<style scoped>
div.welcome > img {
  max-height: 40vh;
}
div.game > img {
  max-height: 40vh;
}
</style>
