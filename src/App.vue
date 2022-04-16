<template>
  <router-view />
</template>

<script>
export default {
  setup() {},
  created() {
    document.title = "網頁安全";
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 100vw;
  min-height: 100vh;
}
html {
  min-width: 100vw;
  min-height: 100vh;
  --header-height: 48px;
}
body {
  margin: 0px;
  padding: 0px;
  min-width: 100vw;
  min-height: 100vh;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.routerContain {
  min-width: 100vh;
  min-height: 100vh;
}
</style>
