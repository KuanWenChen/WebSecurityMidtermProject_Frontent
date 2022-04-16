<template>
  <div class="frame">
    <div class="title">
      <div class="info">
        <el-image class="icon" :src="icon"></el-image>
        <div class="idtime">
          <label class="timestamp">{{ this.timetamp2string() }}</label>
          <label class="account">{{ this.$props.account }}</label>
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
            style="padding-top: 10px; margin-right: 12px"
            @click="uploadFile"
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
      v-else
    />
  </div>
</template>

<script>
import bbCodeParser from "@/util/bbCodeParser_custom";
import xss from "@/util/xss_custom.js";

const DEFAULT_ICON = require("@/assets/default_icon.png");
const PARSE_LIMIT_TIME = 6;
export default {
  props: {
    id: {
      type: Number,
    },
    account: {
      type: String,
    },
    timestamp: {
      type: Date(),
    },
    floorNumber: {
      type: Number,
    },
    BBcode: {
      type: String,
    },
  },
  emits: ["updateBBcode"],
  setup() {},
  data() {
    return {
      icon: DEFAULT_ICON,
      editBBcode: "",
      editMode: false,
    };
  },
  create() {
    // console.log("Account: ", this.$props.Account);
  },
  methods: {
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
    timetamp2string() {
      return "2022-04-16 18:50";
    },
    isOwner() {
      return true;
    },
    isEditMode() {
      return this.editMode;
    },
    openComment(e) {
      e.stopPropagation();
      var newURL = "/comment/" + String(this.floorNumber);
      console.log("newURL: ", newURL);
      this.$router.push(newURL);
    },
    enterEditMode(e) {
      e.stopPropagation();
      this.editMode = true;
      this.editBBcode = this.$props.BBcode;
    },
    deleteComment(e) {
      e.stopPropagation();
      //####
      console.log("delete comment!");
    },
    confirmEdit(e) {
      e.stopPropagation();
      this.$emit("updateBBcode", this.editBBcode);
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
  },
};
</script>

<style scoped>
.frame {
  --hover-radius: 0.3em;
  --padding-UpDown: 8px;
  --frame-width: 98vw;
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
.account {
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
</style>
