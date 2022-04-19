<template>
  <Header />
  <div class="page">
    <div class="headerPadding" />
    <template v-if="this.isAdmin()">
      <label>輸入新title</label><br />
      <el-input
        style="width: 30vw; margin-right: 12px"
        v-model="newTitle"
        :min="1"
        :max="30"
      />
      <el-button type="primary" plain @click="setNewTitle">送出</el-button>
    </template>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import apiHelper from "@/util/apiHelper";
import { ElMessage } from "element-plus";
import Qs from "qs";

export default {
  setup() {},
  components: {
    Header,
  },
  data() {
    return {
      newTitle: "",
    };
  },
  methods: {
    isAdmin() {
      if (this.$store.getters.isAdmin()) {
        return true;
      } else {
        this.$router.push("/");
        return false;
      }
    },
    setNewTitle() {
      if (this.newTitle.length < 1 || this.newTitle.length > 30) {
        ElMessage.error("title長度需介於1~30");
        return;
      }
      axios
        .get(apiHelper.getToken.get, { withCredentials: true })
        .then((res) => {
          var data = {
            token: res.data.token,
            title: this.newTitle,
          };
          axios
            .post(apiHelper.setTitle.post$, Qs.stringify(data))
            .then((res) => {
              ElMessage.success(res.data);
            })
            .catch((err) => {
              ElMessage.error(err.response.data);
            });
        })
        .catch((err) => {
          ElMessage.error(err.response.data);
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
.headerPadding {
  height: var(--header-height);
}
</style>
