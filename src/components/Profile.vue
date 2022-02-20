<template>
  <div class="wrap animated fadeIn">
    <div class="content">
      <el-form ref="form" label-width="80px">
        <el-form-item label="昵称" class="name">
          <el-input v-model="form.username" placeholder='修改昵称'></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="保密" value="保密"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="form.xueli" placeholder="请选择教育层次">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="专科" value="专科"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="邮箱" class="name">
          <el-input v-model="form.email" placeholder="填写您的邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-checkbox-group v-model="form.hobby">
            <el-checkbox label="游戏" name="type"></el-checkbox>
            <el-checkbox label="运动" name="type"></el-checkbox>
            <el-checkbox label="音乐" name="type"></el-checkbox>
            <el-checkbox label="电影" name="type"></el-checkbox>
            <el-checkbox label="阅读" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="个人宣言">
          <el-input type="textarea" v-model="form.introduce"></el-input>
        </el-form-item>
        <span class="info">头像为随机生成暂不支持修改!</span>
        <el-form-item>
          <el-button type="primary" @click="save">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {editProfile,getUserInfo} from "@/api/index"
export default {
  data(){
    return{
      form: {
        user_id:'',
        username: '',
        xueli: '',
        sex:'',
        hobby: [],
        introduce: '',
        email:'',
        avator_url:''
      }
    }
  },
  created(){
    getUserInfo(this.user.user_id).then(res=>{
      if(res.code!==-2){
        var userInfo=res.data[0]
        this.form.user_id=userInfo.user_id
        this.form.avator_url=userInfo.avator_url
        this.form.xueli=userInfo.user_xueli
        this.form.sex=userInfo.user_sex
        this.form.username=userInfo.username
        this.form.email=userInfo.user_email
        this.form.hobby=userInfo.user_hobby.split(',')
        this.form.introduce=userInfo.user_introduce
      }else{
        this.$alert('您的登录信息已失效,需要重新登录', '错误', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push("/login")
        }
      });
      }
    })
  },
  computed:{
    ...mapGetters([
      'user'
    ])
  },
  methods:{
      ...mapActions(['setCurrentUser']),
    save(){
      if(this.user.username){
        editProfile(
          this.user.user_id,
          this.form.username,
          this.form.email,
          this.form.sex,
          this.form.xueli,
          this.form.introduce,
          this.form.hobby).then(res=>{
            if(res.code==-2){
                this.$alert('您的登录信息已失效,需要重新登录', '错误', {
                confirmButtonText: '确定',
                callback:action=>{
                  this.$router.push("/login")
                }
              });
            }else{
              this.setCurrentUser(this.form) 
              this.$notify({
                title: '成功',
                message: res.msg,
                type: 'success',
                offset: 100,
                duration:1000
              });
            }
          })
      }else{
        this.$alert('您已退出登录无法修改信息', '错误', {
          confirmButtonText: '确定',
          callback:action=>{
            this.$router.push("/login")
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.info{
  display: block;
  width: 100%;
  color: #ccc;
  margin-bottom: 4%;
  font-size: 14px;
  text-indent: 30px;
}
.name>>>.el-input{
  width: auto;
}
.content{
  width: 60%;
  margin-left: 22%;
  margin-top: 4%;
  background-color: #fff;
  border-radius: 15px;
  padding:2%
}

</style>