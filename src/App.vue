<template>
  <nav class="navbar navbar-light bg-light mb-2 justify-content-center">
    <p class="text-center">SECRET HOMEWORK</p>
    <router-link to="/">Home</router-link>
    <router-link to="/history">Top Scores</router-link>
    <a href="/">Restart Game</a>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<style>
body {
  /* background-color: rgb(116, 206, 108); */
  background-image: url("https://lh3.googleusercontent.com/proxy/gAnOPVAP_MhbeRqluP-YBOidyN5E9wGGKCxWzmSEo3NyJfZkNQwo7U5SztJNi7TdKoyrQPLV-5hFaLE6bXnD_GvDin-nKBuHaglVlDyNwD3PGxH8tgHp9kAAaq-aGgqt-a53EqMWhn-grFdw4PDHTR5Pxsk3x-dyhnehJg");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  font-size: 1.1rem;
}
nav p {
  margin-bottom: 0;
  color: black;
}
nav > * {
  margin-right: 70px;
}
</style>
