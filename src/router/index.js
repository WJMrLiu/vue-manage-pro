import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import NotFound from "../views/404";
import Forbidden from "../views/403";
import findLast from "lodash/findLast";
// import { check, isLogin } from "../utils/auth";

Vue.use(Router);

const login = r =>require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r =>require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r =>require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r =>require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r =>require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r =>require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r =>require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const uploadImg = r =>require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r =>require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const info = r =>require.ensure([], () => r(require('@/views/Forms/stepform/step1')), 'form');
const confirm = r =>require.ensure([], () => r(require('@/views/Forms/stepform/step2')), 'form');
const result = r =>require.ensure([], () => r(require('@/views/Forms/stepform/step3')), 'form');
const sendMessage = r =>require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r =>require.ensure([], () => r(require('@/page/explain')), 'explain');
const exportExcel = r =>require.ensure([],() => r(require('@/views/excel/exportExcel')),'exportExcel');
const uploadExcel = r =>require.ensure([],() => r(require('@/views/excel/uploadExcel')),'uploadExcel');
const remoteSearch = r =>require.ensure([],() => r(require('@/page/remoteSearch')),'remoteSearch');
const router = new Router({
        // mode: 'history',
        strict: process.env.NODE_ENV !== 'production',
        routes: [
            {
                path: '/',
                component: login,
            },
            {
                path: '/manage',
                component: manage,
                name: '',
                children: [
                    {
                        path: '',
                        component: home,
                        meta: ['首页'],
                    },
                    {
                        path: '/addShop',
                        component: addShop,
                        meta: ['添加数据', '添加商铺'],
                    },
                    {
                        path: '/addGoods',
                        component: addGoods,
                        meta: ['添加数据', '添加商品'],
                    },
                    {
                        path: '/userList',
                        component: userList,
                        meta: ['数据管理', '用户列表'],
                    },
                    {
                        path: '/shopList',
                        component: shopList,
                        meta: ['数据管理', '商家列表'],
                    },
                    {
                        path: '/foodList',
                        component: foodList,
                        meta: ['数据管理', '商家列表'],
                    },
                    {
                        path: '/uploadImg',
                        component: uploadImg,
                        meta: ['文本编辑', 'MarkDown'],
                    },
                    {
                        path: '/vueEdit',
                        component: vueEdit,
                        meta: ['编辑', '文本编辑'],
                    },
                    {
                        path: '/info',
                        component: info,
                        meta: ['表单', '基本信息'],
                    },
                    {
                        path: '/confirm',
                        component: confirm,
                        meta: ['表单', '确认信息'],
                    },
                    {
                        path: '/result',
                        component: result,
                        meta: ['表单', '信息提交完成'],
                    },
                    {
                        path: '/sendMessage',
                        component: sendMessage,
                        meta: ['设置', '发送通知'],
                    },
                    {
                        path: '/explain',
                        component: explain,
                        meta: ['说明', '说明'],
                    },
                    {
                        path: '/exportExcel',
                        component: exportExcel,
                        meta: ['下载', '下载'],
                    },
                    {
                        path: '/uploadExcel',
                        component: uploadExcel,
                        meta: ['上传', '上传'],
                    },{
                        path:'/remoteSearch',
                        component: remoteSearch,
                        meta: ['远程搜索']
                    },
                ],
            },
            {
                path: "/403",
                name: "403",
                hideInMenu: true,
                component: Forbidden
              },
              {
                path: "*",
                name: "404",
                hideInMenu: true,
                component: NotFound
              }
        ],
    })

router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
        NProgress.start();
    }
    // const record = findLast(to.matched, record => record.meta.authority)
    // if(record && !check(record.meta.authority)){ // 没有权限
    //     if(!isLogin() && to.path !== '/login'){
    //         next({
    //             path:'/login'
    //         })
    //     } else if(to.path !== '/403'){
    //         this.$notify.error({
    //             title: '403',
    //             message: '你没有权限访问，请联系管理员咨询。'
    //           });
    //           next({
    //             path: "/403"
    //           });
    //     }
    //     NProgress.done();
    // }
    next();
});

router.afterEach(() => {
    NProgress.done();
});
export default router;
