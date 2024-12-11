import axios from 'axios';
import { ElNotification } from 'element-plus'
import useUserStore from '@/stores/modules/user';
import router from '@/router';
let request = axios.create({
  baseURL: '/api',
  timeout: 50000
})
request.interceptors.request.use((config) => {
  let userStore = useUserStore();
  if(userStore.token) {
    config.headers.Authorization=userStore.token;
  }
  return config;
})
request.interceptors.response.use((response)=>{
  if(response.data.code == 0) {
    let message = response.data.msg;
    ElNotification({
      type: 'error',
      message
    });
  }
  if(response.headers['content-disposition']!=null){
    return response;
  }
  return response.data;
},(error)=>{
  let message = '';
  let status = error.response.status
  switch(status) {
    case 401:
      message = 'Token已过期'
      
      break;
    case 403:
      message = '无权访问'
      break;
    case 404:
      message = '地址错误'
      break;
    case 500:
      message = '服务器出现错误'
      break;
    default: 
      message = '网络错误'
      break;
  }
  ElNotification({
    type: 'error',
    message
  });
  router.push({ path: '/login' }); 
  return Promise.reject(error)
})

export default request;