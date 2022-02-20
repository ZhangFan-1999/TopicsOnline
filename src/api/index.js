//线上接口地址： http://120.79.146.174:3000

import axios from "axios"
axios.defaults.baseURL = "www.zfanstudy.xyz"
// 登录
export function handleLogin(username,password){
  return axios.post("/login",{
    username:username,
    password:password
  })
}

// 注册
export function handleRegister(username,password){
  return axios.post("/register",{
    username:username,
    password:password
  })
}

// 添加话题
export function addTopic(id,username,content,avator){
  return axios.post("/addtopic",{
    user_id:id,
    username:username,
    content:content,
    avator_url:avator
  })
}
// 获取全部话题
export function getTopic(){
  return axios.get("/gettopics")
}

// 修改用户信息
export function editProfile(id,username,email,sex,xueli,introduce,hobby){
  return axios.post("/editprofile",{
    user_id:id,
    username:username,
    user_email:email,
    user_sex:sex,
    user_xueli:xueli,
    user_hobby:hobby,
    user_introduce:introduce
  })
}

// 获取用户信息
export function getUserInfo(id){
  return axios.post("/userinfo",{
    user_id:id
  })
}

// 添加话题评论
export function addComment(topic_id,user_id,username,content){
  return axios.post("/addcomment",{
    topic_id:topic_id,
    user_id:user_id,
    username:username,
    content:content
  })
}

// 获取话题评论
export function getComments(){
  return axios.post("/getcomments")
}

// 获取个人全部话题
export function getMyTopics(user_id){
 return axios.post("/getmytopics",{
   user_id:user_id
 })
}

// 删除指定话题
export function delMyTopic(topic_id){
  return axios.post("/delmytopic",{
    topic_id:topic_id
  })
}

// 添加点赞记录
export function addLiked(topic_id,user_id,username,content,creator){
  return axios.post("/addliked",{
    topic_id:topic_id,
    user_id:user_id,
    username:username,
    content:content,
    creator:creator
  })
}

// 删除点赞记录
export function deleteLiked(topic_id,user_id){
  return axios.post("/deleteliked",{
    topic_id:topic_id,
    user_id:user_id
  })
}

// 获取当前用户所有点赞记录
export function getLikedTopic(user_id){
  return axios.post("/getlikedtopic",{
    user_id:user_id
  })
}
