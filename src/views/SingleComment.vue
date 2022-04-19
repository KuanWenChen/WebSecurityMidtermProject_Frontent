<template>
  <Header />
  <div class="page">
    <div class="headerPadding" />
    <Comment
      style="margin-top: 10px"
      :publisher="publisher"
      :floorNumber="floorNumber"
      :BBcode="BBcode"
      :publishTime="publishTime"
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
      BBcode: "",
      publishTime: "123",
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
          this.BBcode = res.data.content;
          this.publishTime = res.data.publish_time;
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
