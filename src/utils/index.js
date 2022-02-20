import Storage from "good-storage"
var USER_TOKEN='user_Token'
//保存用户信息
export function saveUserInfo(data){
  Storage.set("userInfo",data);
  return data
}
// 加载用户信息
export function loadUserInfo(){
  return Storage.get("userInfo",{})
}
// 删除用户信息（退出登录）
export function clearUserInfo(){
  Storage.remove("userInfo")
  return {}
}
// 设置token
export function setUserToken(data){
  Storage.get(USER_TOKEN||'')
  Storage.set(USER_TOKEN,data)
  return Storage.get(USER_TOKEN,'')
}

// 加载token
export function loadToken(){
  return Storage.get(USER_TOKEN,'')
}