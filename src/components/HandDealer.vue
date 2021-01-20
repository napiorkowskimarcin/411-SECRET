<template>
  <p>DEALER POINTS: {{ dealersPoints }}</p>
  <div class="welcome" v-if="dealerImg.length === 0">
    <div>
      <img
        src="https://img2.pngio.com/blue-back41024x1024png-7291024-bicycle-cards-bicycle-bicycle-playing-cards-png-729_1024.png"
        alt=""
        srcset=""
      />
    </div>
  </div>
  <div class="game d-flex flex-row" v-if="dealerImg.length > 0">
    <div v-for="(img, index) in dealerImg" :key="index">
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
    dealersPoints() {
      return this.$store.getters.getDealersPoints;
    },
    dealerImg() {
      return this.$store.getters.getDealerImg;
    },
  },
};
</script>

<style scoped>
div > img {
  max-height: 20vh;
}
</style>
