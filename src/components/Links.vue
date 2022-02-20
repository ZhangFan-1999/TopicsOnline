<template>
  <div class="wrap animated fadeIn">
    <el-card class="box-card">
      <h1>相关链接推荐</h1>
      <li>1、免费开源项目,看看大佬们的代码是怎么写的:
      <span><a target="blank" href="http://www.github.com">http://www.github.com——github</a></span>
      </li>
      <li>2、超多免费的课程,你值得拥有:
      <span><a target="blank" href="https://www.bilibili.com/" >https://www.bilibili.com——哔哩哔哩</a></span>
      </li>
      <li>3、涵盖几乎所有与编程相关知识,总有一款适合你:
      <span><a target="blank" href="https://www.code-nav.cn/" >https://www.code-nav.cn/——编程导航</a></span>
      </li>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return{}
  },
  created(){
    // console.log(321);
  }
}
</script>
<style scoped>
h1{
  font-weight: lighter;
}
.wrap>>>.box-card{
  width: 60%;
  margin-top: 7%;
  /* height: 60%; */
  margin-left: 20%;
  box-shadow: 3px 3px 3px #ccc;
}
a{
  text-decoration: underline;
  color: #000;
}
.box-card li{
  margin: 30px 0px;
}
</style>