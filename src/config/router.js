import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import Charts from '../components/admin/ChartsPages'

Vue.use(VueRouter)

const rotas = [{
    name: 'home',    
    path: '/', 
    //component: Home --'removida temporariamente'
    component: Home,
    //meta: { requiresAdmin: false }
},
{
    name: 'charts',
    path: '/charts',
    component: Charts,
}]

const router =  new VueRouter({
    mode: 'history',
    routes: rotas
})



export default router