import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/Index";
import PageOne from "@/components/PageOne";
import PageTwo from "@/components/PageTwo";
import PageThree from "@/components/PageThree";
import PageFour from "@/components/PageFour";
import LoginForm from "@/components/user/LoginForm";
import RegisterForm from "@/components/user/RegisterForm";
import UserInfo from "@/components/user/UserInfo";
import UserIndex from "@/components/user/UserIndex";
import UserList from "@/components/administrator/UserList";
import HouseList from "@/components/administrator/HouseList";
import UserPaymentInfo from "@/components/user/UserPaymentInfo";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '普通用户界面',
      component: Index,
      redirect:'/index/userIndex',
      children: [
        {
          path:'/index/userIndex',
          name:'用户首页',
          component: UserIndex
        },
        {
          path:'/index/loginform',
          name:'登录表单',
          component:LoginForm
        },
        {
          path:'/index/registerform',
          name:'注册表单',
          component: RegisterForm
        },
        {
          path: "/index/userInfo",
          name:'用户个人信息',
          component: UserInfo
        },
        {
          path: '/index/userPaymentInfo',
          name: '缴费信息',
          component: UserPaymentInfo
        }
      ]
    },
    {
      path: '/navigation',
      name: '管理员界面',
      component: Index,
      children: [
        {
          path: '/index/userList',
          name: '用户列表',
          component: UserList
        },
        {
          path: '/index/houseList',
          name: '楼栋管理',
          component: HouseList
        },
        {
          path: '/index/page1',
          name: '页面1',
          component: PageOne
        },
        {
          path: '/index/page2',
          name: '页面2',
          component: PageTwo
        },
        {
          path: '/index/page3',
          name: '页面3',
          component: PageThree
        },
        {
          path: '/index/page4',
          name: '页面4',
          component: PageFour
        }
      ]
    }
  ]
})
