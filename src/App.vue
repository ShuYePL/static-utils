<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import JsonUtil from './components/JsonUtil.vue'
</script>

<template>
  <el-container>
    <!-- <el-header>Json Utils</el-header> -->
    <el-main>
      <JsonUtil></JsonUtil>
    </el-main>
  </el-container>

</template>

<style scoped>
.el-container {
  height: 100vh;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  font-size: 18px;
  line-height: 50px;
  height: 6%;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  /* background-color: #e9eef3; */
  color: #333;
  margin: 0;
  padding: 0;
}

.el-menu {
  background-color: #d3dce6;
}
</style>
