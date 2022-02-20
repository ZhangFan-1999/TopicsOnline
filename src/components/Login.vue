<template>
  <div class="wrap">
    <el-card class="box-card animated bounceInDown">
      <h2 style="text-align:center">Welcome To My Site</h2>
      <div class="content">
        <el-form :label-position="labelPosition">
          <el-form-item label="用户名">
            <el-input ref="username" placeholder="输入用户名" v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input  ref="password" placeholder="输入密码" v-model="password" show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button plain @click="_handleLogin">登录</el-button>
        <el-button plain @click="_handleRegister">注册</el-button>
      </div>
      <span class="goIndex" @click="goIndex">我先看看→</span>
    </el-card>
  </div>
</template>
<script>
import {handleLogin,handleRegister} from "@/api/index"
import {mapGetters,mapActions} from "vuex"
export default {
  data(){
    return{
      username:"",
      password:"",
      labelPosition:'top'
    } 
  },
  methods:{
     ...mapActions([
      'setCurrentUser',
      'setToken'
    ]),
    _handleLogin(){
      handleLogin(this.username,this.password).then((res)=>{
        if(res.code==0){
          this.setCurrentUser(res.data)
          this.setToken(res.data.token)
           this.$router.push("/home")
           this.$message({
            message: '登录成功!',
            type: 'success',
            duration:1000,
            offset:100
          });
        }else{
          this.$message({
            message: '账号或密码错误',
            type: 'error',
            duration:2000,
            offset:20
          });
        }
      })
    },
    _handleRegister(){
        handleRegister(this.username,this.password).then((res)=>{
        if(res.code==0){
           this.$message({
            message: res.msg,
            type: 'success',
            duration:'2000'
          });
        }else{
          this.$message({
            message: res.msg,
            type: 'error',
            duration:'2000'
          });
        }
      })
    },
    // 游客看看
    goIndex(){
      this.$router.push("/home/index")
    }
  },
}
</script>
<style scoped>
.goIndex{
  display:block;
  float: right;
  font-size: 14px;
  color: #409eff;
  margin-bottom: 20px;
  cursor: pointer;
}
.wrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f6f8fa;
}
.wrap>>>.box-card{
  width: 60%;
  margin-top: 90px;
  margin-left: 20%;
  border-radius: 0%;
}
.content{
  margin-top: 10%;
  border-radius:5px;
  margin-left: 50%; 
  transform: translateX(-50%);
}

</style>