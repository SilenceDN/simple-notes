import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'ant-design-vue/dist/antd.css'
import '@/assets/icon/iconfont.css'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/highlightjs/styles/github.min.css'
import '@/assets/main.css'
import store from './store'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(mavonEditor)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

/* eslint-disable no-new */
new Vue({
    components: {
        App
    },
    store,
    router,
    template: '<App/>'
}).$mount('#app')
