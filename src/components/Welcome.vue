<template>
  <div class="cardbox">
    <el-card :body-style="{ padding: '40px' }" shadow class="card">
      <img src="../assets/xiaoxin.jpg" class="image" />
      <div style="padding: 14px">
        <span>当前用户： admin</span>
        <div class="bottom clearfix">当前时间： {{ nowTime }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { formatDate } from "../time.js"
export default {
  data() {
    return {
      nowTime: "",
    };
  },
  created() {
    this.nowTime = formatDate(new Date());
    this.timeStart();
  },
  methods: {
    timeStart() {
      //设置定时器
      this.timer = setInterval(() => {
        this.nowTime = formatDate(new Date())
      }, 1000);
    }
  },

};
</script>

<style>
.image {
  width: 100%;
  display: block;
  border-radius: 50%;
}

.cardbox {
  height: 450px;
  width: 450px;
  margin: 0 auto;
}

</style>