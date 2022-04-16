<template>
  <Header />
  <div class="page">
    <div class="headerPadding" />
    <Comment
      style="margin-top: 10px"
      :id="id"
      :account="account"
      :floorNumber="floorNumber"
      :BBcode="BBcode"
      @updateBBcode="updateBBcode"
    />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Comment from "@/components/Comment.vue";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    Header,
    Comment,
  },
  setup() {
    const route = useRoute();
    return {
      floorNumber: Number(route.params.id),
    };
  },
  data() {
    return {
      id: 123,
      account: "testAccount",
      BBcode:
        "[img]https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png[/img][color=#074edc][br][b][i][u]粗體[/b]斜體[/i]底線[/u]測試[br][color=red] cool color [/color][/color]",
    };
  },
  methods: {
    updateBBcode(newBBcode) {
      this.BBcode = newBBcode;
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
