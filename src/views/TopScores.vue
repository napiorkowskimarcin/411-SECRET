<template>
  <div>
    <!-- <p>Total history: {{ totalHistory.length }}</p> -->

    <div class="col">
      <table>
        <thead>
          <tr>
            <th scope="col">NO:</th>
            <th scope="col">SCORE:</th>
            <th scope="col">DATE:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in totalHistory" :key="index">
            <td scope="row">{{ game.index }}</td>
            <td>{{ game.score }} $</td>
            <td>{{ game.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
//import { mapState, mapMutations } from "vuex";
export default {
  name: "TopScores",

  data() {
    return {
      tempData: "",
      totalHistory: "",
    };
  },
  mounted() {
    let tempData = localStorage.getItem("totalHistory");
    if (tempData !== null) {
      this.totalHistory = JSON.parse(tempData);
    }
  },
  computed: {},

  methods: {},
};
</script>
