import './assets/main.css'
import 'element-plus/dist/index.css'      // 引入element-plus样式

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import JsonViewer from 'vue-json-viewer'  // json格式化展示工具
import ElementPlus from 'element-plus'    // element-plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  // element-plus icon

const app = createApp(App)
app.use(router).use(ElementPlus).use(JsonViewer)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')