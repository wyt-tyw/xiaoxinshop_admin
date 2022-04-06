import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'

Vue.use(VueRouter)

const routes = [
  // redirect表示重定向，如果用户访问斜线，重定向到/login地址
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home', 
    component: Home, 
    //重定向，如果访问了/home，则重定向到/welcome子路由地址
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights},
      { path: '/roles', component: Roles},
      { path: '/categories', component: Cate},
      { path: '/params', component: Params}
    ]
  }

]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 代表将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //放行有两种方式： next()放行 next('/login') 强制跳转
  //如果用户访问的登录页，直接放行
  if (to.path === '/login') return next();
  //从sessionStorage中获取到保存的token值
  const tokenStr = window.sessionStorage.getItem('token');
  //没有token，强制跳转到登录页
  if (!tokenStr) return next('/login');
  next();
})

export default router
