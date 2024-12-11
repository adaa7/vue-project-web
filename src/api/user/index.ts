import request from '@/utils/request';
enum API {
  LOGIN_URL = "/admin/login",
  REGISTER_URL = "/admin/register"
}
export const reqLogin = (data:any) => request.post(API.LOGIN_URL,data)
export const reqRegister = (data:any) => request.post(API.REGISTER_URL,data)
