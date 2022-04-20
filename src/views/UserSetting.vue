<template>
  <Header />
  <div class="page center">
    <div class="userInfo" v-if="this.isLogin()">
      <el-upload
        class="avatar-uploader"
        accept="image/jpeg,image/gif,image/png"
        :data="uploadParam"
        ref="upload"
        :action="api"
        :before-upload="uploadFilePreset"
        :show-file-list="false"
        :auto-upload="true"
        :on-success="uploadSuccess"
        :on-error="errorHandler"
      >
        <img
          v-if="this.getUserIcon()"
          :src="this.getUserIcon()"
          class="avatar"
          fit="scale-down"
        />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <div class="textInfo">
        <label class="id">{{
          String(this.$store.getters.userId()).padStart(5, "0")
        }}</label>
        <label class="account">{{ this.$store.getters.userName() }}</label>
        <div style="margin-top: 12px">
          <el-input class="urlInput" v-model="uploadUrl" />
          <el-button class="urlUploadButton" type="primary" @click="uploadByURL"
            >網址上傳</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { Plus } from "@element-plus/icons-vue";
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
  //   inheritAttrs: false,
  components: {
    Header,
    Plus,
  },
  data() {
    return {
      api: apiHelper.uploadUserImage.post$,
      uploadParam: undefined,
      uploadUrl: "",
      imageSrc: undefined,
    };
  },
  methods: {
    uploadByURL() {
      axios
        .get(apiHelper.getToken.get, { withCredentials: true })
        .then((res) => {
          var data = {
            token: res.data.token,
            url: this.uploadUrl,
          };
          axios
            .post(apiHelper.uploadUserImage_url.post$, Qs.stringify(data))
            .then((res) => {
              // console.log("res: ", res);
              ElMessage.success(res.data);
              this.$router.go(0);
            })
            .catch((err) => {
              // console.log("err: ", err.response.data);
              ElMessage.error(err.response.data);
            });
        })
        .catch((err) => {
          ElMessage.error(err.response.data);
        });
    },
    uploadFilePreset(file) {
      // console.log("fd: ", file);
      if (file.size > 5120) {
        ElMessage.error("檔案過大，請小於5MB內");
        return false;
      }
      if ("image/jpeg,image/gif,image/png".indexOf(file.type) < 0) {
        ElMessage.error("只接受png, jpge, gif");
        return false;
      }
      return new Promise((reslove, reject) => {
        axios
          .get(apiHelper.getToken.get, { withCredentials: true })
          .then((res) => {
            this.uploadParam = {
              token: res.data.token,
            };
            reslove(true);
          })
          .catch((err) => {
            ElMessage.error(err.response.data);
            reject(false);
          });
      });
    },
    isLogin() {
      if (this.cookies.get("login")) {
        this.$store.commit("isLive");
        return true;
      } else {
        this.$router.replace("/Login");
        ElMessage.error("請先登入");
        return false;
      }
    },
    errorHandler(err) {
      // console.log("upload err: ", err);
      ElMessage.error(err.response.data);
    },
    uploadSuccess(res) {
      // console.log("uploadSuccess: ", res);
      ElMessage.success("上傳成功!");
      this.$router.go(0);
    },
    getUserIcon() {
      axios
        .get(apiHelper.getUserImage.get$ + this.$store.getters.userName())
        .then((res) => {
          this.imageSrc = apiHelper.handshake + "/" + res.data;
        });
      return this.imageSrc;
    },
  },
};
</script>

<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  --upload-width: 120px;
  --upload-height: 120px;
}
.center {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.userInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.urlInput {
  width: 65%;
  margin-right: 5%;
}
.urlUploadButton {
  width: 30%;
}
.textInfo {
  margin-left: 18px;
  width: calc(var(--upload-width) * 1.8);
  height: var(--upload-height);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.id {
  font-size: 22px;
  margin-bottom: 2px;
  color: #909399;
}
.account {
  font-size: 28px;
  font-weight: bold;
}
.avatar {
  width: var(--upload-width);
  height: var(--upload-height);
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fafafa;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader:hover {
  border-color: var(--el-color-primary);
  background-color: #cdd1d6;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: var(--upload-width);
  height: var(--upload-height);
  text-align: center;
  z-index: 99;
}
</style>
