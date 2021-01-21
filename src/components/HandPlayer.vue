<template>
  <p>PLAYER POINTS: {{ playersPoints }}</p>
  <div>
    <div class="welcome" v-if="playerImg.length === 0">
      <img
        src="https://img2.pngio.com/blue-back41024x1024png-7291024-bicycle-cards-bicycle-bicycle-playing-cards-png-729_1024.png"
        alt=""
        srcset=""
      />
    </div>
  </div>
  <div class="game d-flex flex-row" v-if="playerImg.length > 0">
    <div v-for="(img, index) in playerImg" :key="index">
      <img :src="img" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HandPlayer",
  computed: {
    isGameRunning() {
      return this.$store.getters.getGameRunning;
    },
    playersPoints() {
      return this.$store.getters.getPlayersPoints;
    },
    playerImg() {
      return this.$store.getters.getPlayerImg;
    },
  },
};
</script>

<style scoped>
div > img {
  max-height: 30vh;
}
@media only screen and (min-width: 992px) {
  div > img {
    max-height: 20vh;
  }
}
</style>
