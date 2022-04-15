<template>
  <Header />
  <div class="page center">
    <div class="userInfo">
      <el-upload
        class="avatar-uploader"
        ref="upload"
        method="post"
        action="request"
        :show-file-list="false"
        :auto-upload="true"
      >
        <img v-if="imageSrc" :src="imageSrc" class="avatar" fit="scale-down" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <div class="textInfo">
        <label class="id">{{ userId }}</label>
        <label class="account">{{ userAccount }}</label>
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

export default {
  setup() {},
  //   inheritAttrs: false,
  components: {
    Header,
    Plus,
  },
  data() {
    return {
      userId: "12345",
      userAccount: "123456789012",
      uploadUrl: "",
      imageSrc: undefined,
    };
  },
  methods: {
    uploadByURL() {
      console.log("upload by: ", this.uploadUrl);
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
