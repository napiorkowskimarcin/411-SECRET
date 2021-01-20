<template>
  <div class="home">
    <div class="row ">
      <div class="col player">
        <HandPlayer />
      </div>
      <div class="col">
        <CurrentGame />
      </div>
      <div class="col player">
        <HandDealer />
      </div>
    </div>
    <div>
      <GameInterface />
    </div>
    <div>
      <History />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HandPlayer from "../components/HandPlayer";
import HandDealer from "../components/HandDealer";
import CurrentGame from "../components/CurrentGame";
import GameInterface from "../components/GameInterface";
import History from "../components/History";

export default {
  name: "Home",
  components: {
    HandPlayer,
    HandDealer,
    CurrentGame,
    GameInterface,
    History,
  },
};
</script>
<style scoped>
.player {
  max-width: 25vw;
}
</style>
