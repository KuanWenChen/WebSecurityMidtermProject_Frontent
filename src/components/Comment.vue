<template>
  <div class="frame">
    <div class="title">
      <div class="info">
        <el-image class="icon" :src="this.getUserIcon()"></el-image>
        <div class="idtime">
          <label class="timestamp">{{ this.timestamp2string() }}</label>
          <label class="publisher">{{ this.$props.publisher }}</label>
        </div>
      </div>
      <div class="toolbar">
        <template v-if="this.isOwner() && !this.isEditMode()">
          <el-button class="textButton" type="text" @click="enterEditMode"
            >編輯</el-button
          >
          <el-button class="textButton" type="text" @click="deleteComment"
            >刪除</el-button
          >
        </template>
        <template v-else-if="this.isEditMode()">
          <el-upload
            style="margin-right: 12px"
            ref="upload"
            @click="uploadFile"
            :autoupload="false"
            :data="uploadParam"
            :action="uploadApi"
            :before-upload="uploadFilePreset"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="errorHandler"
          >
            <el-button class="textButton" type="text"
              >附加檔案</el-button
            ></el-upload
          >
          <el-button class="textButton" type="text" @click="confirmEdit"
            >確認</el-button
          >
          <el-button class="textButton" type="text" @click="cancelEdit"
            >取消</el-button
          >
        </template>
        <el-button
          class="textButton floorNumber"
          type="text"
          @click="openComment"
          >#{{ this.$props.floorNumber }}</el-button
        >
      </div>
    </div>
    <div v-if="this.$props.file_name" class="fileLink" @click="openLink">
      <el-button class="fileTextButton" type="text">附加檔案（打開）</el-button>
    </div>
    <div
      class="content"
      v-html="this.BBcode2HTML(this.$props.BBcode)"
      v-if="!this.isEditMode()"
    />
    <el-input
      ref="textinput"
      class="contentInput"
      type="textarea"
      v-model="editBBcode"
      :autosize="{ minRows: 5, maxRow: 10 }"
      autofocus
      @keydown.tab.prevent="typeTab"
      @click="($e) => $e.stopPropagation()"
      v-else
    />
  </div>
</template>

<script>
import bbCodeParser from "@/util/bbCodeParser_custom";
import xss from "@/util/xss_custom.js";

import axios from "axios";
import apiHelper from "@/util/apiHelper";
import { ElMessage } from "element-plus";
import Qs from "qs";

const PARSE_LIMIT_TIME = 6;
export default {
  props: {
    publisher: {
      type: String,
    },
    publishTime: {
      type: String,
    },
    floorNumber: {
      type: String,
    },
    BBcode: {
      type: String,
    },
    file_name: {
      type: String,
    },
  },
  emits: ["updateBBcode", "delete"],
  setup() {},
  data() {
    return {
      icon_src: apiHelper.user_images + "default_icon",
      editBBcode: "",
      editMode: false,
      uploadApi: apiHelper.uploadCommentFile.post$,
      uploadParam: undefined,
      startUpload: undefined,
    };
  },
  create() {
    // console.log("publisher: ", this.$props.publisher);
  },
  methods: {
    getUserIcon() {
      axios
        .get(apiHelper.getUserImage.get$ + this.$props.publisher)
        .then((res) => {
          this.icon_src = apiHelper.handshake + "/" + res.data;
          // console.log("this.icon_src: ", this.icon_src);
        });
      return this.icon_src;
    },
    BBcode2HTML() {
      var count = 1;
      var lastHTML = this.$props.BBcode;
      var dirtyHTML = bbCodeParser.parse(this.$props.BBcode);
      while (count < PARSE_LIMIT_TIME && lastHTML !== dirtyHTML) {
        count++;
        lastHTML = dirtyHTML;
        dirtyHTML = bbCodeParser.parse(lastHTML);
      }

      var cleanHTML = xss.process(dirtyHTML);
      // console.log("dirtyHTML: ", dirtyHTML);
      // console.log("cleanHTML: ", cleanHTML);
      return cleanHTML;
    },
    typeTab(input) {
      var textArea = input.target;
      var start = textArea.selectionStart;
      var end = textArea.selectionEnd;
      var newStr1 = textArea.value.substr(0, start);
      var newStr2 = "\t";
      var newStr3 = textArea.value.substr(end);
      textArea.value = newStr1 + newStr2;
      start = textArea.value.length;
      textArea.value = textArea.value + newStr3;
      textArea.selectionStart = start;
      textArea.selectionEnd = start;
    },
    timestamp2string() {
      // return "2022-04-16 18:50";
      // publishTime: yyyy-mm-dd hh:mm:ss
      if (
        this.$props.publishTime !== undefined &&
        this.$props.publishTime.length > 3
      ) {
        return this.$props.publishTime.substring(
          0,
          this.$props.publishTime.length - 3
        );
      } else {
        return "UNKNOW";
      }
    },
    isOwner() {
      return this.$props.publisher === this.$store.getters.userName();
    },
    isEditMode() {
      return this.editMode;
    },
    openComment(e) {
      e.stopPropagation();
      var newURL = "/comment/" + String(this.$props.floorNumber);
      // console.log("newURL: ", newURL);
      this.$router.push(newURL);
    },
    enterEditMode(e) {
      e.stopPropagation();
      this.editMode = true;
      this.editBBcode = this.$props.BBcode;
    },
    deleteComment(e) {
      e.stopPropagation();
      axios
        .get(apiHelper.getToken.get, { withCredentials: true })
        .then((res) => {
          var deleteData = {
            token: res.data.token,
            id: this.$props.floorNumber,
          };
          // console.log("deleteData: ", deleteData);
          axios
            .post(apiHelper.delete.post$, Qs.stringify(deleteData))
            .then((res) => {
              ElMessage.success(res.data);
              // console.log("delete: ", res.data);
              this.$emit("delete");
            })
            .catch((err) => {
              ElMessage.error(err.response.data);
            });
        })
        .catch((err) => {
          ElMessage.error(err.response.data);
        });
    },
    confirmEdit(e) {
      e.stopPropagation();
      const uploader = this.$refs["upload"];
      axios
        .get(apiHelper.getToken.get, { withCredentials: true })
        .then((res) => {
          var republishData = {
            token: res.data.token,
            id: this.$props.floorNumber,
            content: this.editBBcode,
          };
          axios
            .post(apiHelper.republish.post$, Qs.stringify(republishData))
            .then((res) => {
              ElMessage.success(res.data);
              this.$emit("updateBBcode");
              // this.uploader.submit();
            })
            .catch((err) => {
              ElMessage.error(err.response.data);
            });
        })
        .catch((err) => {
          ElMessage.error(err.response.data);
        });

      this.editMode = false;
    },
    cancelEdit(e) {
      e.stopPropagation();
      this.editMode = false;
      this.editBBcode = this.$props.BBcode;
    },
    uploadFile(e) {
      e.stopPropagation();
    },

    uploadFilePreset(file) {
      // console.log("fd: ", file);
      if (file.size > 5120) {
        ElMessage.error("檔案過大，請小於5MB內");
        return false;
      }
      return new Promise((reslove, reject) => {
        axios
          .get(apiHelper.getToken.get, { withCredentials: true })
          .then((res) => {
            this.uploadParam = {
              token: res.data.token,
              id: this.$props.floorNumber,
            };
            ElMessage.info("上傳中...");
            reslove(true);
          })
          .catch((err) => {
            ElMessage.error(err.response.data);
            reject(false);
          });
      });
    },

    uploadSuccess(res) {
      // console.log("uploadSuccess: ", res);
      ElMessage.success("上傳成功!");
    },
    errorHandler(err) {
      // console.log("upload err: ", err);
      ElMessage.error(err.response.data);
    },
    openLink(e) {
      e.stopPropagation();
      window.open(apiHelper.comment_files + this.$props.file_name, "_blank");
    },
  },
};
</script>

<style scoped>
.frame {
  --hover-radius: 0.3em;
  --padding-UpDown: 8px;
  --frame-width: 97vw;
  display: inline-block;
  width: var(--frame-width);
  background-color: white;
}

.title {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-top: var(--padding-UpDown);
}
.toolbar {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  width: 150px;
}
.textButton {
  margin: 0px;
}

.floorNumber {
  font-size: 18;
  color: #909399;
  margin-left: 12px;
  margin-right: 4px;
}

.icon {
  --radius: 36px;
  border-radius: 999em;
  width: var(--radius);
  height: var(--radius);
}
.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 200px;
  height: 100%;
  margin-left: 10px;
}
.idtime {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 8px;
}
.timestamp {
  font-size: 12px;
  color: #909399;
}
.publisher {
  font-size: 18px;
  font-weight: bold;
}
.content {
  font-size: 16px;
  padding-top: 12px;
  padding-left: 14px;
  padding-bottom: var(--padding-UpDown);
  text-align: left;
  border-bottom: 1px solid rgb(149, 149, 149);
}
.contentInput {
  font-size: 12px;
  /* padding-top: 12px; */
  /* padding-left: 14px; */
  padding-bottom: var(--padding-UpDown);
  margin-top: 4px;
  width: calc(var(--frame-width));
}

.frame:hover .title {
  background-color: rgb(214, 214, 214);
  border-radius: var(--hover-radius) var(--hover-radius) 0em 0em;
}
.frame:hover .content {
  background-color: rgb(214, 214, 214);
  border-radius: 0em 0em var(--hover-radius) var(--hover-radius);
}
.fileLink {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.fileTextButton {
  font-size: 20px;
  margin-left: 40px;
}
</style>
