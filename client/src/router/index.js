import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Sales from '@/components/Sales'
import Buys from '@/components/Buys'
import UpdateUser from '@/components/UpdateUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/updateUser',
      name: 'UpdateUser',
      component: UpdateUser
    },
    {
      path: '/sales',
      name: 'Sales',
      component: Sales
    },
    {
      path: '/buys',
      name: 'Buys',
      component: Buys
    }
  ]
})
