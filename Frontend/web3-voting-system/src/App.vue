<script setup>
import { ref } from "vue";
const active = ref(0);
</script>

<template>
  <div class="whole">
      <nav class="header">V o l l e y</nav>
      <main>
        <router-view></router-view>
      </main>
      <van-tabbar v-model="active" active-color="#A3D1DD" route="true">
        <van-tabbar-item to="/account" icon="user">My Account</van-tabbar-item>
        <van-tabbar-item to="/" icon="good-job">Voting</van-tabbar-item>
        <van-tabbar-item to="/board" icon="notes">Board</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
.header {
  height: 50px;
  background-color: #A3D1DD;
  color: white;
  text-align: center;
  line-height: 50px;
  font-size: xx-large;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>

<style lang="less">
html, 
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
