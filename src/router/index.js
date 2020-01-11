import Vue from 'vue'
import VueRouter from 'vue-router'
import $axios from '../util/axios'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'commonRooms',
    component: ()=>import('../components/roomlist')
  },
  {
    path: '/commonRooms',
    name: 'commonRooms',
    component: ()=>import('../components/roomlist')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/roomChat',
    name: 'roomChat',
    component: () => import('../components/roomChat.vue'),
    beforeEnter(to, from, next){
      var token = JSON.parse(localStorage.getItem('chatUser'))
      //不能获取this,手动调用$axios
      if (to.name == 'roomChat') {
        $axios({
          method: 'post',
          url: '/api/status',
          data: {
            token: token
          }
        }).then(res => {
          console.log(res)
          if (res.data.status != 'success') {
            next({
              name: 'register'
            })
          } else {
            next()
          }
          })
      } else {
        next()
      }
  }
},
{
  path: '/register',
    name: 'register',
      component: () => import('../views/register.vue')
},
{
  path: '/personRooms',
  name: 'personRooms',
  component: ()=>import('../components/roomlist.vue')
}
]

const router = new VueRouter({
  routes
})

export default router
