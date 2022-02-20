<template>
  <div class="wrap animated fadeIn">
    <el-container>
      <el-header>
        <!-- 头部链接 -->
        <router-link class="title el-icon-share" to="/home/index" tag="li"></router-link>
        <router-link class="link" to="/home/index" tag="li">首页</router-link>
        <router-link class="link" to="/home/topics" tag="li">文字广场</router-link>
        <router-link class="link" to="/home/links" tag="li">相关链接</router-link>
        <router-link class="link" to="/home/more" tag="li">更多</router-link>
        <!-- 用户 -->
        <el-dropdown v-if="user.user_id" @command="handleCommand" trigger="click">
          <span class="el-dropdown-link"><img  class="avator" :src="user.avator_url" alt=""><i class="dropdown-caret"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >当前账号:{{user.username}}</el-dropdown-item>
            <el-dropdown-item command='/home/profile' divided icon="el-icon-user">账号信息</el-dropdown-item>
            <el-dropdown-item command='/home/edit' icon="el-icon-edit-outline">我发布的</el-dropdown-item>
            <el-dropdown-item command='/home/favorite' icon="el-icon-star-off">我收藏的</el-dropdown-item>
            <el-dropdown-item command='out' icon="el-icon-position">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="go_login" @click="goLogin" v-if="!user.user_id">登录/注册</span>
      </el-header>
      <!-- 子组件 -->
      <router-view/>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import Storage from "good-storage"
export default {
  data() {
    return {
      input3:"jjjj"
    };
  },
  computed:{
    ...mapGetters([
      'user'
    ])
  },
  created(){
  },
  methods:{
    ...mapActions([
      'delCurrentUser'
    ]),
    handleCommand(command){
      if(command=='out'){
        this.delCurrentUser()
        this.$router.push("/login")
      }else{
        this.$router.push(command)
      }
    },
    goLogin(){
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.avator{
  width: 30px;
  height: 30px;
  margin-top: 15px;
}
.go_login{
  font-size: 16px;
  cursor: pointer;
  font-weight: 10;
  position: absolute;
  right: 30px;
  line-height: 60px;
  color: #ccc
}
.go_login:hover{
  color: #fff;
}
.link{
  float: left;
  color: #ccc;
  line-height: 60px;
  padding: 0 10px;
  cursor: pointer;
  font-weight: 300;
}
.router-link-active{
  color: #fff;
}
.link:hover{
  color: #fff;
}
.search{
  width: 10%;
}
.icon{
  margin-top: 15px;
}
.title{
  font-size: 32px;
  float: left;
  color: #eee;
  line-height: 60px;
  margin-right: 20%;
  cursor: pointer;
  font-weight: 400;
}
.dropdown-caret{
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: "";
  border-style: solid;
  border-width: 4px 4px 0;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  margin-left: 8px;
  margin-bottom: 15px;
}
.wrap>>>.el-dropdown{
  position: absolute;
  right: 30px;
  line-height: 60px;
}
.wrap{
  width: 100%;
  height: 100%;
}
.wrap>>>.el-header{
  height: 60px;
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #24292f;
  z-index: 100;
}
.wrap>>>.el-container{
  width: 100%;
  height: 100%;
  margin-top: 61px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: 10;
  height: 60px;
  display: block;
  line-height: 60px;
}
.el-icon-arrow-down {
  font-size: 16px;
}
</style>
