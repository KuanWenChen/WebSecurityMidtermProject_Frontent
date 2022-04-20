<template>
  <div class="header toolList">
    <el-image
      class="logo"
      fit="scale-down"
      src="https://demo.swordgunblue.works/api/WebLogo.png"
      @click="redirect('/')"
    />

    <div
      :style="this.getUserInfoStyle()"
      class="userInfo"
      v-if="this.isLogin()"
    >
      <el-image class="icon" :src="this.getUserIcon()" />
      <el-link
        type="primary"
        class="toolText"
        @click="redirect('/UserSetting')"
        >{{ this.$store.getters.userName() }}</el-link
      >
      <el-link
        type="primary"
        class="toolText"
        @click="redirect('/admin')"
        v-if="this.isAdmin()"
        >管理介面</el-link
      >
      <el-link type="primary" class="toolText" @click="logout()">登出</el-link>
    </div>

    <div class="loginButtons" v-else>
      <el-link class="offset" @click="redirect('/login')" type="primary"
        >登入</el-link
      >
      <el-link
        class="offset"
        @click="redirect('/RegisterAccount')"
        type="primary"
        >註冊帳號</el-link
      >
    </div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";
import Qs from "qs";
import apiHelper from "@/util/apiHelper";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  created() {
    this.$store.commit("isLive");

    // axios.get("https://demo.swordgunblue.works/api/").then((res) => {
    //   console.log("hand shake:", res);
    // });
  },
  data() {
    return {
      icon_src: apiHelper.handshake + "/user_images/default_icon",
    };
  },
  methods: {
    redirect(url) {
      this.$router.push(url);
    },
    logout() {
      console.log("logout");
      axios
        .post(
          apiHelper.logout.post$,
          // Qs.stringify({
          //   cookie: this.cookies.get("login"),
          // }),
          { withCredentials: true }
        )
        .then((res) => {
          console.log("res: ", res);
          this.cookies.remove("login");
          this.redirect("/login");
        })
        .catch((err) => {
          // ElMessage.error(err.response.data);
          console.log("err: ", err.response.data);
          this.cookies.remove("login");
          this.redirect("/Login");
        });
    },
    isLogin() {
      var loginCookie = this.cookies.get("login");
      console.log("islogin cookie: ", loginCookie);
      return (
        loginCookie !== null && loginCookie !== undefined && loginCookie !== ""
      );
    },
    isAdmin() {
      return this.$store.getters.isAdmin();
    },
    getUserInfoStyle() {
      if (this.isAdmin()) {
        return "width: 260px";
      } else if (
        this.$store.getters.userName() !== undefined &&
        this.$store.getters.userName().length > 8
      ) {
        return "width: 210px";
      } else {
        return "width: 200px";
      }
    },
    getUserIcon() {
      axios
        .get(apiHelper.getUserImage.get$ + this.$store.getters.userName())
        .then((res) => {
          this.icon_src = apiHelper.handshake + "/" + res.data;
        });
      return this.icon_src;
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
