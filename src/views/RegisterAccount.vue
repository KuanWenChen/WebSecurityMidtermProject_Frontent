<template>
  <div class="page center">
    <el-form class="form" ref="form" :model="loginData" :rules="loginRules">
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
      <el-button type="primary" class="form" @click="register"
        >註冊帳號</el-button
      >
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import apiHelper from "@/util/apiHelper";
import { ElMessage } from "element-plus";

export default {
  setup() {},
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
    redirect(url) {
      this.$router.push(url);
    },
    register() {
      var form = this.$refs["form"];
      form.validate((valid) => {
        if (valid) {
          axios
            .post(
              apiHelper.register.post$,
              Qs.stringify({
                username: this.loginData.account,
                password: this.loginData.password,
              })
            )
            .then((res) => {
              ElMessage.success("註冊成功");
              this.redirect("/login");
            })
            .catch((err) => {
              // console.log(err.response.data);
              ElMessage.error(err.response.data);
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.center {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.form {
  width: 300px;
}
.formLabel {
  font-size: 18px;
  font-weight: bold;
}
</style>
