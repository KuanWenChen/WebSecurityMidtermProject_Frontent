<template>
  <div class="header toolList">
    <el-image
      class="logo"
      fit="scale-down"
      :src="webLogo"
      @click="goHomePage"
    />
    <div class="userInfo" v-if="true">
      <el-image class="icon" :src="icon" />
      <el-link type="primary" class="toolText" href="./UserSetting"
        >個人設定</el-link
      >
      <el-link type="primary" class="toolText" @click="logout">登出</el-link>
    </div>
    <div class="loginButtons" v-else>
      <el-link class="offset" href="./Login" type="primary">登入</el-link>
      <el-link class="offset" href="./RegisterAccount" type="primary"
        >註冊帳號</el-link
      >
    </div>
  </div>
</template>

<script>
const DEFAULT_ICON = require("@/assets/default_icon.png");
const WEB_LOGO = require("@/assets/WebLogo.png");
export default {
  setup() {},
  data() {
    return {
      webLogo: WEB_LOGO,
      icon: DEFAULT_ICON,
    };
  },
  methods: {
    goHomePage() {
      this.$router.push("/");
    },
    logout() {
      console.log("logout");
    },
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background: white;
  border-bottom-style: ridge;
  z-index: 10;
}
.toolList {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon {
  --radius: 36px;
  border-radius: 999em;
  width: var(--radius);
  height: var(--radius);
}
.userInfo {
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  margin-right: 14px;
}
.loginButtons {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 14px;
}
.logo {
  /* transform: scale(0.8); */
  width: 300px;
  margin-left: 10px;
  cursor: pointer;
}
.toolText {
  font-size: 18px;
}
</style>
