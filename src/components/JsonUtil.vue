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
// log模式下的json对象列表
var jsonObjList = ref([])
// 当前json字符串
var jsonStr = ref("")
// 是否展示转换后的字符串
var isShowJsonViewer = ref(true)
// 是否进行字符过滤，过滤斜杠和换行符等空格符号
var isFilterSpecialChar = ref(false)
var isShowJsonViewer = ref(false)
var isReadLog = ref(false)

/**
 * 判断字符串是否不为空
 * 
 * @param jsonStr 待判断字符串
 */
const isNotEmptyStr = (jsonStr) => {
  return !isEmpty(jsonStr);
}

/**
 * 判断字符串是否为空
 * 
 * @param jsonStr 待判断字符串
 */
const isEmptyStr = (jsonStr) => {
  return jsonStr.value.trim() == "";
}

/**
 * 将json字符串转换为json对象
 */
const parseJson = () => {
  // 字符串为空，不做处理
  if (isEmptyStr(jsonStr)) {
    data.jsonObj = {};
    return;
  }
  
  // // 判断是否为log模式
  // if (isReadLog) {
  //   // 使用换行符来分割JSON字符串
  //   var jsonUnits = jsonStrings.split(/\n+/);

  //   // 解析每个JSON字符串为JavaScript对象
  //   var jsonObjList = jsonUnits.map(json => {
  //     try {
  //       return JSON.parse(json);
  //     } catch (error) {
  //       console.error('Failed to parse JSON:', error);
  //       return [];
  //     }
  //   });
  // }

  // 字符串非空
  if (isFilterSpecialChar === true) {
    var tempJsonStr = jsonStr.value.replace(/[/|\\|\n|\r|\t"]*/g, "")
  } else {
    var tempJsonStr = jsonStr.value
  }
  console.log("after JsonStr replace:", tempJsonStr)
  data.jsonObj = JSON.parse(tempJsonStr)
}

/**
 * 判断jsonStr是否为空，如果为空，则不用放置json-viewer
 */
const judgeIsShowJsonViewer = () => {
  console.log("判断jsonStr是否为空, jsonStr", jsonStr)
  if (jsonStr.value === "" || jsonStr.value === '') {
    isShowJsonViewer = false;
  } else {
    isShowJsonViewer = true;
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
    <el-input type="textarea" v-model="jsonStr" placeholder="在这里输入json字符串 ~ ~ ~"
      input-style="width: 100%; height: 100vh; background-color: #eee;"></el-input>
    <div class="mid-bar">
      <el-button @click="parseJsonStr2Obj" size="small" type="primary" :icon="ArrowRight">parse</el-button>
      <br>
      <el-switch v-model="isFilterSpecialChar" size="large"
        active-text="filter" inactive-text="filter" inline-prompt></el-switch>
      <!-- <el-switch v-model="isReadLog" size="large"
        active-text="log" inactive-text="log" inline-prompt></el-switch> -->
      </div>
    <div class="json-view-area" v-show="isShowJsonViewer">
      <json-viewer :value="data.jsonObj" :expand-depth=5 :copyable="copyShowText" expanded="true"></json-viewer>
    </div>
    <div class="json-view-area" v-show="!isShowJsonViewer"></div>
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
    background-color: #fef8f0;
    display: flex;
    flex-direction: column;
    justify-content: center;  // 水平居中
    align-items: center; // 垂直居中
  }
}

.json-view-area {
  width: 98%;
  height: 100vh;
  overflow: auto;
}

</style>
