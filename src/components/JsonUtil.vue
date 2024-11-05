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
 * 当输入框失去焦点触发事件
 */
const inputBlurEvent = () => {
  parseJson();
  judgeIsShowJsonViewer();
}

</script>
  
<template>    
  <div class="frame">
    <dev class="json-util-item">
      <el-input type="textarea" rows=24 v-model="jsonStr" placeholder="在这里输入json字符串 ~ ~ ~" @blur="inputBlurEvent"
        input-style="width: 98%; height: 100vh; background-color: #eee;"></el-input>
      <div class="json-view-area">
        <json-viewer :value="data.jsonObj" :expand-depth=5 :copyable="copyShowText" expanded="true"></json-viewer>
      </div>
    </dev>
  </div>
</template>

<style scoped lang="scss">
.frame {
  width: 100%;
  height: 100vh;
}

.json-util-item {
  display: flex;
  flex-direction: row;
}

.json-view-area {
  width: 98%;
  height: 100vh;
}

</style>
