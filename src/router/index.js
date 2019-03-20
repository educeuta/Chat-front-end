import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Chats from '@/components/Chats'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/chats',
      name: 'Chats',
      component: Chats
    },
    {
      path: '/chat/:id',
      name: 'Chat',
      component: Chat
    }
  ],
  linkActiveClass: 'active',
  mode: 'history'
})
