<template>
  <div class="page center">
    <el-image
      class="logo offset"
      :src="webLogo"
      @click="() => this.$router.push('/')"
    />
    <el-form class="form offset" :model="loginData" :rules="loginRules">
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
    <el-link class="offset" href="./RegisterAccount" type="primary"
      >註冊帳號</el-link
    >
  </div>
</template>

<script>
const WEB_LOGO = require("../assets/WebLogo.png");

export default {
  setup() {},
  data() {
    return {
      webLogo: WEB_LOGO,
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
      console.log("login");
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
