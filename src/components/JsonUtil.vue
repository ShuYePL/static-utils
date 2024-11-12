<script setup>
import { ref, reactive } from 'vue'

defineProps({
})

// 复制按钮展示的文本
var copyShowText = {copyText: '复制', copiedText: '已复制'}
// 当前json对象
var data = reactive({
  jsonObj: null
})
// 当前json字符串
var jsonStr = ref("")
// 是否展示转换后的字符串
var isShowJsonViewer = ref(true)

/**
 * 将json字符串转换为json对象
 */
const parseJson = () => {
  console.log("jsonStr:", jsonStr.value)
  if (jsonStr.value !== "" && jsonStr !== '') {
    jsonStr.value = jsonStr.value.replace(/[/|\\|*]*/g, "")
    console.log("after JsonStr replace:", jsonStr.value)
    data.jsonObj = JSON.parse(jsonStr.value)
    console.log("jsonObj parse")
  } else {
    data.jsonObj = null
    console.log("jsonObj not parse")
  }
  console.log("jsonObj:", data.jsonObj);
}

/**
 * 判断jsonStr是否为空，如果为空，则不用放置json-viewer
 */
 const judgeIsShowJsonViewer = () => {
  console.log("判断jsonStr是否为空, jsonStr", jsonStr)
  if (jsonStr.value === "" || jsonStr.value === '') {
    // isShowJsonViewer = false;
  } else {
    // isShowJsonViewer = true;
  }
  console.log("isShowJsonViewer:", isShowJsonViewer);
}

/**
 * 将json字符串转换为对象
 */
const parseJsonStr2Obj = () => {
  parseJson();
  judgeIsShowJsonViewer();
}

</script>
  
<template>    
  <div class="frame">
    <el-input type="textarea" rows=100 v-model="jsonStr" placeholder="在这里输入json字符串 ~ ~ ~"
      input-style="width: 100%; height: 100vh; background-color: #eee;"></el-input>
    <div class="mid-bar">
      <el-button @click="parseJsonStr2Obj" size="small" type="primary" :icon="ArrowRight">parse</el-button>
    </div>
    <div class="json-view-area">
      <json-viewer :value="data.jsonObj" :expand-depth=5 :copyable="copyShowText" expanded="true"></json-viewer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.frame {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;

  .mid-bar {
    width: 8%;
    background-color: #ffe4c4;
    display: flex;
    flex-direction: column;
    justify-content: center;  // 水平居中
    align-items: center; // 垂直居中
  }
}

.json-view-area {
  width: 98%;
  height: 100vh;
}

</style>
