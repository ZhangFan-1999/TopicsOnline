<template>
  <div class="wrap animated fadeIn">
    <div class="content">
      <div class="left"></div>
      <div class="center">
        <div class="topic" v-for="(item,index) of this.topics" :key="index">
          <img :src="item.avator_url"/>
          <span class="username">{{item.username}}</span>
          <span class="time">{{'发布于 '+item.create_time}}</span>
          <span class="text">{{item.content}}</span>
          <div class="opts">
            <span class="share el-icon-connection" title="点了也没用"></span>
            <span @click="showComment(index,item.topic_id)" title="点击查看/隐藏评论" class="comment el-icon-s-comment"></span>
            <span @click="liked(index,item.topic_id,item.content,item.username)" title="点击收藏/取消收藏" ref="star" class="stars el-icon-star-on"></span>
          </div>
          <div class="commentBox animated fadeIn" v-if="hasId(index)&&showCom">
            <div class="input_box">
              <el-input  @input="validate" placeholder="发布你的评论" v-model="input"></el-input>
              <el-button :disabled='disabled' @click="_addComment(item.topic_id)" type="primary" size="small" round>发布评论</el-button>
              <h1 class="info animated fadeIn" v-if="disabled">抱歉,请发布只包含文字的内容!</h1>
            </div>
            <!-- 评论区 -->
            <li class="tips" v-if="getComs(item.topic_id).length==0">暂无评论,快来抢占沙发吧(●'◡'●)</li>
            <li v-else v-for="(coms,num) of getComs(item.topic_id)" :key="num">
              <span class="com_name">{{coms.username}}</span>
              <span v-if="coms.username==item.username" class="badge">题主</span> : {{coms.content}}<span class="com_time">发布于: {{coms.create_time}}</span>
            </li>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
import {getTopic,addComment,getComments,addLiked,deleteLiked,getLikedTopic} from "@/api/index"
import {mapGetters,mapActions} from "vuex"
export default {
  data(){
    return{
      input:'',
      topics:[],
      showCom:false,
      showId:-1,
      openId:[],
      disabled:false
    }
  },
  computed:{
    ...mapGetters([
      'user',
      'comments'
    ]),
  },
  methods:{
    ...mapActions([
      'setComment'
    ]),
    // 过滤掉非文字内容
    validate(){
      var pattern = /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/gi
      if(pattern.test(this.input)){
        this.disabled=true
        return false
      }else{
        this.disabled=false
        return true
      }
    },
    // 点赞
    liked(index,topic_id,content,creator){
      if(this.user.username){
        addLiked(topic_id,this.user.user_id,this.user.username,content,creator).then((res)=>{
          if(res.code==0){
            // 点赞成功
            this.$refs.star[index].style.color="#ffb802"
            this.$notify({
                message: '收藏成功!',
                type: 'success',
                showClose:false,
                offset: 100,
                duration:800
              });
          }else{
            // 取消点赞
            deleteLiked(topic_id,this.user.user_id).then((res)=>{
            this.$notify({
              message: '已取消收藏!',
              type: 'warning',
              showClose:false,
              offset: 100,
              duration:800
              });
            })
            this.$refs.star[index].style.color="#808080"
          }
        })
      }else{
        this.$notify({
          title: '收藏失败',
          message: '请先登录!',
          type: 'error',
          offset: 100,
          duration:2000
        });
      }
    },
    // 获取所有评论
    _getComments(){
      getComments().then((res)=>{
        this.setComment(res.data)
      })
    },
    // 获取所有话题
    _getTopic(){
      getTopic().then(res=>{
        // 数组的逆序输出
        var newArr=[]
        if(res.data){
          for(var i=0;i<res.data.length;i++){
            newArr.unshift(res.data[i])
          }
        }
        this.topics=newArr
        if(this.topics.length!=0){
          this._getLikedTopic()
        }
      })
    },
    // 是否包含某元素
    hasId(index){
      var index=this.openId.indexOf(index)
      if(index==-1){
        return false
      }else{
        return true
      }
    },
    // 获取数组元素的索引
    getIndex(index){
      var index=this.openId.indexOf(index)
      return index
    },
    // 计算出每个话题对应的评论内容
    getComs(topic_id){
      var newArr=[]
      for(var i=0;i<this.comments.length;i++){
        if(this.comments[i].topic_id==topic_id){
          newArr.push(this.comments[i])
        }
      }
      var arr=newArr.reverse()
      return arr
    },
    // 控制评论的显示与隐藏
    showComment(index,topic_id){
      var flag=this.hasId(index)
      if(flag){
        var index=this.getIndex(index)
        this.openId.splice(index,1)
      }else{
        this.showCom=true
        this.openId.push(index)
        // 第一次展示评论区时
        getComments().then((res)=>{
          this.setComment(res.data)
        })
      }
    },
    // 添加评论
    _addComment(topic_id){
      var validator=Number(this.input)
      if(this.user.username){
        if(validator!==0&&this.validate()){
          addComment(topic_id,this.user.user_id,this.user.username,this.input).then(res=>{
            if(res.code==-2){
              this.$alert('您的登录信息已失效,需要重新登录', '错误', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push("/login")
              }
            });
            }else{
              this.$notify({
                title: '发布成功',
                message: res.msg,
                type: 'success',
                offset: 100,
                duration:2000
                });
                this.input=''
                // 在发布成功后需要更新一下this.comments
                getComments().then((res)=>{
                  this.setComment(res.data)
                })
              }
          })
        }else{
          this.$notify({
            title: '发布失败',
            message: '发布的内容不能为空!',
            type: 'error',
            offset: 100,
            duration:2000
          });
        }
      }else{
        this.$notify({
          title: '发布失败',
          message: '请先登录!',
          type: 'error',
          offset: 100,
          duration:2000
        });
      }
    },
    // 获取当前用户所有的点赞话题
    _getLikedTopic(){
      getLikedTopic(this.user.user_id).then((res)=>{
        console.log(res.data);
        // 利用双层for循环找到当前用户点赞的话题在话题池中的索引，
        // 这样就可以通过ref属性设置color属性了
        for(var i=0;i<res.data.length;i++){
          for(var j=0;j<this.topics.length;j++){
            if(res.data[i].topic_id==this.topics[j].topic_id){
              this.$refs.star[j].style.color='#ffb802'
            }
          }
        }
      })
    }
  },
  watch:{

  },
  created(){
    this._getTopic()
    this._getComments()
  }
}
</script>
<style scoped>
.info{
  font-size: 14px;
  font-weight: lighter;
  color: #f56c6c;
  text-indent: 40px;
}
.badge{
  height: 5px;
  width: 9px;
  border: 1px solid #48a2ff;
  border-radius: 5px;
  background-color: #48a2ff;
  color: #fff;
  font-size: 11px;
  padding: 0 2px;
}
.tips{
  text-align: center;
  font-size: 20px;
  color: #ccc;
}
.com_name{
  font-weight: bold;
  cursor: pointer;
}
.com_time{
  /* display: inline-block; */
  color: #ccc;
  float: right;
  margin-right: 10px;
  font-size: 14px;
}
.input_box>>>.el-input__inner{
  border-radius: 30px!important;
  height: 33px;
}
.input_box{
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
}
.commentBox{
  width: 100%;
  overflow:hidden;
}
.commentBox li{
  height: 30px;
  text-indent: 20px;
  line-height: 30px;
  margin: 10px 20px;
  word-wrap: break-word;
  padding: 15px 0px;
  border-bottom:1px solid #eee;
}
.input_box>>>.el-input{
  width: 80%;
  margin-left: 5%;
}
.input_box>>>.el-button{
  margin-left: 10px;
}
.refresh{
  color: #48a2ff;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
}
.opts{
  width: 100%;
  height: 50px;
}
.opts span{
  display: block;
  float: left;
  width: 33%;
  text-align: center;
  font-size: 15px;
  margin-top: 10px;
  line-height: 20px;
  color: #808080;
  cursor: pointer;
}
.el-icon-connection::before{
  font-size: 18px!important;
}
.el-icon-s-comment::before{
 font-size: 18px!important;  
}
.el-icon-star-on::before{
  font-size: 20px!important;
}
.username{
  font-weight: bolder;
  position: absolute;
  left: 55px;
  top: 16px;
  cursor: pointer;
}
/* .opts span:hover{
  color: #48a2ff!important;
} */
.text{
  display: block;
  text-indent: 32px;
  margin: 30px;
  font-size: 15px;
}
.time{
  position: absolute;
  top: 44px;
  left: 55px;
  color: #ccc;
  font-size: 14px;
}

.topic{
  position: relative;
  width: 100%;
  background-color: #fff;
  margin: 10px 0px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px #eee;
  overflow: hidden;
}
.topic img{
  width:35px;
  height:35px;
  border-radius: 50%;
  margin-top:10px;
  margin-left:10px;
  /* border: 1px solid rgb(226, 226, 226); */
  cursor: pointer;
}
/* .content div{
  float: left;
} */
.wrap{
  width: 100%;
  height: 100%;
}
.content{
  width: 100%;
  height: 100%;
  margin-top: 1%;
}
.left{
  width: 20%;
  position: fixed;
  left: 0;
  top: 60;
  /* background-color: chartreuse; */
}
.center{
  width: 60%;
  margin-left: 20%;
}
.right{
  width: 20%;
  position: fixed;
  top: 60;
  right: 0;
  /* background-color: cornflowerblue; */
}
</style>