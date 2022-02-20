<template>
  <div class="wrap animated fadeIn">
    <el-card class="box-card">
      <h1>我发布的</h1>
      <li class="myTopic" v-for="(item,index) of this.mytopics" :key="index">
       <span class="content">{{index+1}}、{{item.content}}</span>
       <span class="time">创建于 {{item.create_time}}</span>
       <el-tooltip class="item" effect="dark" content="删除后无法恢复" placement="right">
        <span class="opts" @click="delTopic(item.topic_id)">删除</span>
       </el-tooltip>
      </li>
      <li v-if="this.mytopics.length==0" class="myTopic" style="color:#ccc">你还未创建任何话题!</li>
    </el-card>
  </div>
</template>
<script>
import {getMyTopics,delMyTopic} from "@/api/index"
import {mapGetters,mapActions} from "vuex"
export default {
  data(){
    return{
      mytopics:[]
    }
  },
  computed:{
    ...mapGetters([
      'user'
    ]),
  },
  methods:{
    _getMyTopics(){
      getMyTopics(this.user.user_id).then((res)=>{
        this.mytopics=res.data
      })
    },
    // 删除指定话题
    delTopic(topic_id){
      delMyTopic(topic_id).then((res)=>{
        if(res.code==0){
        // 删除成功后重新获取一下个人话题列表 
        getMyTopics(this.user.user_id).then((res)=>{
          this.mytopics=res.data
          })
        }
      })
    }
  },
  created(){
    this._getMyTopics()
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
  width: 70%;
  display: block;
  float: left;
  overflow:hidden;
  word-break:keep-all;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.opts{
  display: block;
  float: left;
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