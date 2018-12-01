import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import Index from './views/index/Index.vue'

import Bussdet from './views/nav1/Bussdet.vue'
import Addbuss from './views/nav1/Addbuss.vue'
import Buscir from './views/nav1/Buscir.vue'
import Busaudit from './views/nav1/Busaudit.vue'

import Personlist from './views/person/Personlist.vue'
import Matterlist from './views/matter/Matterlist.vue'
import Undelmatter from './views/matter/Undelmatter.vue'
import Mattertotallist from './views/matter/Mattertotallist.vue'
import Leadermatterlist from './views/matter/Leadermatterlist.vue'
import Depmatterlist from './views/matter/Depmatterlist.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '内容管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },{
        path: '/',
        component: Home,
        name: '商家管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
//          { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '商家管理' },
            { path: '/buscir', component: Buscir, name: '商圈管理' },
            { path: '/Busaudit', component: Busaudit, name: '商家审核' },
            { path: '/Addbuss', component: Addbuss, name: '新增商家',hidden: true },
            { path: '/Bussdet', component: Bussdet, name: '商家详情',hidden: true },
            { path: '/Matterlist', component: Matterlist, name: '',hidden: true },
            { path: '/Undelmatter', component: Undelmatter, name: '',hidden: true },
            { path: '/Mattertotallist', component: Mattertotallist, name: '',hidden: true },
            { path: '/Leadermatterlist', component: Leadermatterlist, name: '领导关注事项',hidden: true },
            { path: '/Depmatterlist', component: Depmatterlist, name: '部门承办事项',hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '督查人员库',
        iconCls: 'el-icon-menu',//图标样式class
        children: [
            { path: '/Personlist', component: Personlist, name: '督查人员库' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '首页',
        hidden:true,
        children: [
            { path: '/Index', component: Index, name: '首页' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;