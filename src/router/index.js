import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from "@/components/Login"
import Index from "@/components/Index"
import Topics from "@/components/Topics"
import Links from "@/components/Links"
import More from "@/components/More"
import Profile from "@/components/Profile"
import Edit from "@/components/Edit"
import Favorite from "@/components/Favorite"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/home',
      component:Home,
      redirect:'/home/index',
      children:[
        {
          path:'/home/index',
          component:Index
        },
        {
          path:'/home/topics',
          component:Topics
        },
        {
          path:'/home/links',
          component:Links
        },
        {
          path:'/home/more',
          component:More
        },
        {
          path:'/home/edit',
          component:Edit
        },
        {
          path:'/home/profile',
          component:Profile
        },
        {
          path:"/home/favorite",
          component:Favorite
        }
      ]
    }
  ]
})