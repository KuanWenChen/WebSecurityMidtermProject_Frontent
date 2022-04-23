import { createStore } from "vuex";
import axios from "axios";
import apiHelper from "@/util/apiHelper";
import { useCookies } from "vue3-cookies";
import { ElMessage } from "element-plus";

export default createStore({
  state: {
    userId: undefined,
    userName: undefined,
    userLevel: 1,
  },
  getters: {
    userId: (state) => () => {
      return state.userId;
    },
    userName: (state) => () => {
      return state.userName;
    },
    userLevel: (state) => () => {
      return state.userLevel;
    },
    isAdmin: (state) => () => {
      if (String(state.userLevel) === "763254") {
        return true;
      } else {
        return false;
      }
    },
  },
  mutations: {
    setUserData(state, userInfo) {
      // console.log("set user data: ", userInfo);
      state.userId = userInfo.id;
      state.userName = userInfo.username;
      state.userLevel = userInfo.user_level;
      // console.log("update account info");
    },
    isLive(state) {
      const { cookies } = useCookies();
      axios
        .get(
          // "https://demo.swordgunblue.works/api/isLive.php?cookie=" +
          //   cookies.get("login"),
          apiHelper.isLive.get,
          { withCredentials: true }
        )
        .then((res) => {
          // console.log("isLive res: ", res);
          state.userId = res.data.id;
          state.userName = res.data.username;
          state.userLevel = res.data.user_level;
        })
        .catch((err) => {
          // console.log("isLive err: ", err.response);
          // ElMessage.error(err.response.data);
          cookies.remove("login");
          state.userId = undefined;
          state.userName = undefined;
          state.userLevel = 1;
        });
    },
  },
  actions: {},
  modules: {},
});
