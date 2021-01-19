<template>
  <p>DEALER POINTS: {{ dealersPoints }}</p>
  <div class="welcome" v-if="!isGameRunning">
    <img
      src="https://img2.pngio.com/blue-back41024x1024png-7291024-bicycle-cards-bicycle-bicycle-playing-cards-png-729_1024.png"
      alt=""
      srcset=""
    />
  </div>
  <div class="game" v-if="isGameRunning">
    <img
      src="https://img2.pngio.com/blue-back41024x1024png-7291024-bicycle-cards-bicycle-bicycle-playing-cards-png-729_1024.png"
      alt=""
      srcset=""
    />
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
