<template>
  <Header />
  <div class="page">
    <div class="headerPadding" />
    <Comment
      style="margin-top: 10px"
      :publisher="publisher"
      :publishTime="publishTime"
      :floorNumber="floorNumber"
      :BBcode="content"
      :file_name="file_name"
      @updateBBcode="this.fetchComment()"
      @delete="this.fetchComment()"
      v-if="this.getSucceed"
    />
    <label v-else>Comment not exist</label>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Comment from "@/components/Comment.vue";

import axios from "axios";
import apiHelper from "@/util/apiHelper";
import { ElMessage } from "element-plus";

export default {
  components: {
    Header,
    Comment,
  },
  setup() {
    const route = useRoute();
    return {
      floorNumber: String(route.params.id),
    };
  },
  data() {
    return {
      getSucceed: false,
      publisher: undefined,
      content: "",
      publishTime: "123",
      file_name: undefined,
    };
  },
  created() {
    this.fetchComment();
  },
  methods: {
    fetchComment() {
      axios
        .get(apiHelper.getComments.get$ + String(this.floorNumber))
        .then((res) => {
          console.log("getComments: ", res.data);
          this.getSucceed = true;
          this.publisher = res.data.publisher;
          this.publishTime = res.data.publish_time;
          this.content = res.data.content;
          this.file_name = res.data.file_name;
        })
        .catch((err) => {
          ElMessage.error(err.response.data);
          this.getSucceed = false;
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
.headerPadding {
  height: var(--header-height);
}
</style>
