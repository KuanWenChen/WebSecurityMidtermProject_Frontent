<template>
  <div class="page center">
    <el-image
      class="logo offset"
      src="https://demo.swordgunblue.works/api/WebLogo.png"
      @click="() => this.$router.push('/')"
    />
    <el-form
      class="form offset"
      ref="login_form"
      :model="loginData"
      :rules="loginRules"
    >
      <el-form-item prop="account">
        <template #label><label class="formLabel">帳號</label></template>
        <el-input v-model="loginData.account" />
      </el-form-item>
      <el-form-item prop="password">
        <template #label><label class="formLabel">密碼</label></template>
        <el-input
          v-model="loginData.password"
          type="password"
          placeholder="請輸入密碼"
          show-password
        />
      </el-form-item>
      <el-button plain type="primary" class="formButton" @click="login"
        >Login</el-button
      >
    </el-form>
    <el-link class="offset" @click="redirect('/RegisterAccount')" type="primary"
      >註冊帳號</el-link
    >
  </div>
</template>

<script>
import axios from "axios";
import apiHelper from "@/util/apiHelper";
import { ElMessage } from "element-plus";
import Qs from "qs";
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      loginData: {
        account: undefined,
        password: undefined,
      },
      loginRules: {
        account: [
          { required: true, message: "帳號不能為空", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "帳號長度必須介於1～12",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密碼不能為空", trigger: "blur" },
          {
            min: 6,
            max: 99,
            message: "密碼長度必須介於6～99",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      // console.log("send login: ", this.loginData);
      var form = this.$refs["login_form"];
      form.validate((valid) => {
        if (valid) {
          axios
            .post(
              apiHelper.login.post$,
              Qs.stringify({
                username: this.loginData.account,
                password: this.loginData.password,
              })
            )
            .then((res) => {
              var expireTime = new Date(Date.parse(res.data.cookie_time));
              this.cookies.set("login", res.data.cookie, expireTime);
              this.$store.commit("setUserData", {
                userId: res.data.id,
                userName: res.data.username,
                userLevel: res.data.user_level,
              });
              this.redirect("/");
            })
            .catch((err) => {
              this.cookies.remove("login");
              console.log(err.response.data);
              ElMessage.error(err.response.data);
            });
        }
      });
    },
    redirect(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}

.logo {
  cursor: pointer;
  width: 600px;
  position: relative;
  margin-bottom: 48px;
}

.form {
  width: 300px;
  margin-bottom: 10px;
}
.formButton {
  width: 300px;
}
.formLabel {
  font-size: 18px;
  font-weight: bold;
}
.center {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.offset {
  bottom: 56px;
  position: relative;
}
</style>
