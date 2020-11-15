<template>
  <div id="app">
    <div id="nav">
      <header-vue />
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    </div>
    <router-view />
  </div>
</template>
<script>
import HeaderVue from "./components/Header.vue";

export default {
  components: {
    HeaderVue,
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
</style>
