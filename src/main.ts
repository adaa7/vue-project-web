import './assets/base.css'

import { createApp } from 'vue'
import pinia from '@/stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import gloalComponent from '@/components';
import router from './router'
const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.use(gloalComponent)
app.config.warnHandler = (msg, ctx) => {
  // 在这里可以选择性地处理警告，或者完全忽略它们
  if (msg.includes('Invalid prop')) {
    return; // 忽略特定的警告
  }
  // 默认处理
  console.warn(msg);
};
app.mount('#app')
