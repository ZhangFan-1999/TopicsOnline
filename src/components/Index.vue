<template>
  <div class="wrap animated fadeIn">
    <el-container>
      <el-main>
        <div class="input_box">
          <span class="p" style="margin-bottom:8px">Believe In The Power Of Words</span>
          <span class="p" style="font-size:22px;margin:8px 0px 20px 0px;">发布最近你遇到的那些值得分享的文字吧</span>
          <el-input validate-event @input="validate" placeholder="请输入内容" v-model="input"></el-input>
          <el-button :disabled='disabled' @click="_addTopic" type="primary" plain>发布</el-button>
          <h1 class="info animated fadeIn" v-if="disabled">抱歉,请发布只包含文字的内容!</h1>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {addTopic} from "@/api/index"
import {mapGetters,mapActions} from "vuex"
export default {
  data(){ 
    return{
      input:'',
      disabled:false
    }
  },
  computed:{
    ...mapGetters([
      'user'
    ])
  },
  methods:{
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
    ...mapActions([]),
    _addTopic(){
      // 如果发送的内容为空就不调用api发送请求
      var validator=Number(this.input)
      if(this.user.username){
        if(validator!==0&&this.validate()){
          console.log("api");
          addTopic(this.user.user_id,this.user.username,this.input,this.user.avator_url).then(res=>{
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
    }
  }
}
</script>
<style scoped>
.info{
  font-size: 14px;
  font-weight: lighter;
  color: #f56c6c;
}
.input_box>>>.el-input{
  width: 85%;
}
.p{
  display: block;
  margin: 40px 0;
  text-align: center;
  font-size: 32px;
  color: rgb(194, 193, 193);
  font-weight: 80;
}
.input_box{
  width: 700px;
  height: 220px;
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translateX(-50%);
}
.wrap{
  width: 100%;
  height: 100%;
}
</style>