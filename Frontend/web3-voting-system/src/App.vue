<script setup>
import { ref } from "vue";
const active = ref(0);
</script>

<template>
  <div>
      <nav class="header">V o l l e y</nav>
      <main>voting</main>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="user">My Account</van-tabbar-item>
        <van-tabbar-item icon="good-job">Voting</van-tabbar-item>
        <van-tabbar-item icon="notes">Board</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
.header {
  height: 50px;
  background-color: rgb(185, 225, 243);
  color: white;
  text-align: center;
  line-height: 50px;
  font-size: larger;
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
