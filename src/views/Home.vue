<template>
  <Header />
  <div class="page">
    <div class="headerPadding" />
    <div class="title">{{ this.title }}</div>
    <template v-for="(comment, index) in this.commentList" :key="index">
      <Comment
        class="comment"
        :floorNumber="comment.id"
        :publishTime="comment.publish_time"
        :publisher="comment.publisher"
        :BBcode="comment.content"
        @click="openComment(comment.id)"
        @updateBBcode="fetchComment()"
        @delete="fetchComment()"
      />
    </template>
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
        v-model="writeingContent"
        style="width: 87%; height: 100%; font-size: 24px; resize: none"
        :maxlength="2000"
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
import axios from "axios";
import Qs from "qs";
import apiHelper from "@/util/apiHelper";
import { ElMessage } from "element-plus";
import { useCookies } from "vue3-cookies";

export default {
  name: "Home",
  components: {
    Header,
    Comment,
    Edit,
  },
  inheritAttrs: false,
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      commentList: [],
      title: "網頁安全-留言板",
      isWriting: false,
      writeingContent: "",
    };
  },
  created() {
    this.fetchComment();
    // var str = "[img]jav ascript:alert('XSS');[/img] <div>123</div> [i]good[/i]";
    // var str = "[img]http://localhost:3000/login[/img] <div>123</div> [b][i]good[/b][/i]";
    // var str = '[img]"><script' + ">alert(1)<" + "/script>\\[/img]";
    // var str = "[size=24]文字[/size]	";
  },
  methods: {
    updateBBcode(data) {
      console.log("index: ", data.floorNumber, "\nnewBBcode: ", data.content);
    },
    writeComment() {
      if (this.cookies.get("login")) {
        this.isWriting = true;
      } else {
        ElMessage.error("請先登入");
      }
    },
    sendComment() {
      this.isWriting = false;
      axios
        .get(apiHelper.getToken.get, { withCredentials: true })
        .then((res) => {
          var token = res.data.token;
          axios
            .post(
              apiHelper.publish.post$,
              Qs.stringify({
                token: token,
                content: this.writeingContent,
              })
            )
            .then((res) => {
              ElMessage.success(res.data);
              this.fetchComment();
              this.writeingContent = "";
            })
            .catch((err) => {
              ElMessage.error(err.response.data);
              this.isWriting = true;
            });
        })
        .catch((err) => {
          ElMessage.error(err.response.data);
          this.isWriting = true;
        });
    },
    openComment(floorNumber) {
      var newURL = "/comment/" + String(floorNumber);
      console.log("newURL: ", newURL);
      this.$router.push(newURL);
    },
    fetchComment() {
      axios.get(apiHelper.getTitle.get).then((res) => {
        console.log("res: ", res);
        this.title = res.data.title;
      });
      axios.get(apiHelper.getComments.get).then((res) => {
        console.log("getComments: ", res.data);
        this.commentList = res.data;
      });
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
