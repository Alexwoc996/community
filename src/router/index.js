import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/Index";
import Index2 from "@/components/Index2";
import PageOne from "@/components/PageOne";
import PageTwo from "@/components/PageTwo";
import PageThree from "@/components/PageThree";
import PageFour from "@/components/PageFour";
import Login from "@/components/Login";

import LoginForm from "@/components/user/LoginForm";
import RegisterForm from "@/components/user/RegisterForm";
import UserInfo from "@/components/user/UserInfo";
import UserIndex from "@/components/user/UserIndex";
import UserPaymentInfo from "@/components/user/UserPaymentInfo";
import UserComplaint from "@/components/user/UserComplaint";
import UserRepair from "@/components/user/UserRepair";

import UserList from "@/components/administrator/UserList";
import RegisterVerify from "@/components/administrator/RegisterVerify";
import HouseList from "@/components/administrator/HouseList";
import AdminIndex from "@/components/administrator/AdminIndex";
import AdminList from "@/components/administrator/AdminList";
import ComplaintManage from "@/components/administrator/ComplaintManage";
import RepairManage from "@/components/administrator/RepairManage";
import CostEntry from "@/components/administrator/CostEntry";
import ParkManage from "@/components/administrator/ParkManage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录界面',
      component: Login
    },
    {
      path: '/index',
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
        },
        {
          path: '/index/userComplaint',
          name: '投诉信息',
          component: UserComplaint
        },
        {
          path: '/index/userRepair',
          name: '报修信息',
          component: UserRepair
        }

      ]
    },
    {
      path: '/index2',
      name: '管理员界面',
      component: Index2,
      redirect:'/index2/adminIndex',
      children: [
        {
          path: '/index2/adminIndex',
          name: '管理员首页',
          component: AdminIndex
        },
        {
          path: '/index2/adminList',
          name: '管理员列表',
          component: AdminList
        },
        {
          path: '/index2/userList',
          name: '用户列表',
          component: UserList
        },
        {
          path: '/index2/registerVerify',
          name: '用户注册审核',
          component: RegisterVerify
        },
        {
          path: '/index2/costEntry',
          name: '费用录入',
          component: CostEntry
        },
        {
          path: '/index2/complaintManage',
          name: '投诉管理',
          component: ComplaintManage
        },
        {
          path: '/index2/repairManage',
          name: '报修管理',
          component: RepairManage
        },
        {
          path: '/index2/houseList',
          name: '楼栋管理',
          component: HouseList
        },
        {
          path: '/index2/parkManage',
          name: '停车位管理',
          component: ParkManage
        },
        {
          path: '/index2/page1',
          name: '页面1',
          component: PageOne
        },
        {
          path: '/index2/page2',
          name: '页面2',
          component: PageTwo
        },
        {
          path: '/index2/page3',
          name: '页面3',
          component: PageThree
        },
        {
          path: '/index2/page4',
          name: '页面4',
          component: PageFour
        }
      ]
    }
  ]
})
