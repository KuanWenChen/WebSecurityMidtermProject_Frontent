<template>
  <Header />
  <div class="page">
    <div class="headerPadding" />
    <div class="title">{{ this.title }}</div>
    <Comment
      class="comment"
      :id="123"
      :floorNumber="2"
      :account="'0123456789012'"
      :BBcode="testBBcode"
      @updateBBcode="updateBBcode"
    />
  </div>

  <el-button class="fixedButton" type="primary" circle @click="writeComment">
    <el-icon><Edit /></el-icon>
  </el-button>
  <el-drawer
    v-model="isWriting"
    :with-header="false"
    direction="btt"
    size="40%"
  >
    <div class="writeCommentPannel">
      <textarea
        v-model="test"
        style="width: 87%; height: 100%; font-size: 24px; resize: none"
      />
      <div class="buttonArea">
        <el-button
          style="width: 100%; height: 80%"
          type="primary"
          @click="sendComment"
          >送出</el-button
        >
        <el-upload> <el-button type="text">附加檔案</el-button></el-upload>
      </div>
    </div>
  </el-drawer>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Comment from "@/components/Comment.vue";
import { Edit } from "@element-plus/icons-vue";

export default {
  name: "Home",
  components: {
    Header,
    Comment,
    Edit,
  },
  inheritAttrs: false,
  data() {
    return {
      title: "網頁安全-留言板",
      isWriting: false,
      html: "<script>alert(1)</" + "script>",
      test: "13",
      testBBcode:
        "[img]https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png[/img][color=#074edc][br][b][i][u]粗體[/b]斜體[/i]底線[/u]測試[br][color=red] cool color [/color][/color]",
    };
  },
  created() {
    // var str = "[img]jav ascript:alert('XSS');[/img] <div>123</div> [i]good[/i]";
    // var str = "[img]http://localhost:3000/login[/img] <div>123</div> [b][i]good[/b][/i]";
    // var str = '[img]"><script' + ">alert(1)<" + "/script>\\[/img]";
    // var str = "[size=24]文字[/size]	";
  },
  methods: {
    updateBBcode(newBBcode) {
      this.testBBcode = newBBcode;
    },
    writeComment() {
      this.isWriting = true;
    },
    sendComment() {
      console.log("send comment");
    },
    openComment(floor) {
      var newURL = "/comment/" + String(floor);
      console.log("newURL: ", newURL);
      this.$router.push(newURL);
    },
  },
};
</script>

<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
}
.title {
  font-size: 36px;
  font-weight: bold;
}
.headerPadding {
  height: var(--header-height);
}
.fixedButton {
  position: fixed;
  z-index: 2;
  bottom: 20px;
  right: 20px;
}
.writeCommentPannel {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.buttonArea {
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.comment {
  cursor: pointer;
}
</style>
