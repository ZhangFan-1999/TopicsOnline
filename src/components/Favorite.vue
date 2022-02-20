<template>
  <div class="wrap animated fadeIn">
    <el-card class="box-card">
      <h1>你收藏的</h1>
      <li class="myTopic" v-for="(item,index) of this.favorite" :key="index">
        <span class="content">{{index+1}}、{{item.content}}</span>
        <span class="time">添加时间 {{item.add_time}}</span>
        <span class="time">作者 {{item.creator}}</span>
        <el-tooltip class="item" effect="dark" content="删除后无法恢复" placement="right">
          <span class="opts" @click="delFavorite(item.topic_id)">删除</span>
        </el-tooltip>
      </li>
      <li v-if="this.favorite.length==0" class="myTopic" style="color:#ccc">你还为收藏任何内容!</li>
    </el-card>
  </div>
</template>
<script>
import {getLikedTopic,deleteLiked} from "@/api/index"
import {mapGetters,mapActions} from "vuex"
export default {
  data(){
    return{
      favorite:[]
    }
  },
  computed:{
    ...mapGetters([
      'user'
    ]),
  },
  methods:{
    _getLikedTopic(){
      getLikedTopic(this.user.user_id).then((res)=>{
        this.favorite=res.data
      })
    },
    // 删除指定话题
    delFavorite(topic_id){
      deleteLiked(topic_id,this.user.user_id).then((res)=>{
        if(res.code==0){
        // 删除成功后重新获取一下个人话题列表 
        getLikedTopic(this.user.user_id).then((res)=>{
          this.favorite=res.data
          })
        }
      })
    }
  },
  created(){
    this._getLikedTopic()
  }
}
</script>
<style scoped>
.time{
  display: block;
  float: left;
  font-size: 14px;
  color: #ccc;
}
.myTopic{
  text-indent: 20px;
  padding: 20px 0px;
  clear: both;
}
.content{
  width: 50%;
  display: block;
  float: left;
  overflow:hidden;
  word-break:keep-all;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.opts{
  display: block;
  float: right;
  margin-right: 30px;
  font-size: 14px;
  color: #f56c6c;
  cursor: pointer;
  text-decoration: underline;
}
.wrap>>>.box-card{
  width: 80%;
  margin-top: 3%;
  /* height: 60%; */
  margin-left: 50%;
  transform: translateX(-50%);
}
h1{
  font-weight: lighter;
}
</style>