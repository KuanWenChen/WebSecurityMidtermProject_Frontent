<template>
  <Header />
  <div class="page">
    <div class="headerPadding" />
    <div class="title">{{ this.title }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
export default {
  name: "Home",
  components: {
    Header,
  },
  inheritAttrs: false,
  data() {
    return {
      title: "網頁安全-留言板",
    };
  },
};
</script>

<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
}
.title {
  font-size: 36px;
  font-weight: bold;
}
.headerPadding {
  height: var(--header-height);
}
</style>
