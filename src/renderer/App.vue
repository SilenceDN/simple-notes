<style>
.spin-content {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
}
.ant-spin-nested-loading > div > .ant-spin {
    max-height: none !important;
}
</style>


<template>
    <div id="app">
        <tool-bar/>
        <a-spin tip="Loading..." :spinning="loading">
            <router-view></router-view>
        </a-spin>
        <guide :show.sync="guide"/>
        <setting :show="setting"/>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import store from 'store'
import Guide from '@/components/Guide'
import ToolBar from '@/components/ToolBar'
import Setting from '@/components/Setting'
export default {
    name: 'simple-note',
    components: { Guide, ToolBar, Setting },
    data () {
        return {
            guide: false
        }
    },
    methods: {
        ...mapActions(['init']),
        ...mapMutations(['changeBlur', 'changeLoading'])
    },
    computed: {
        ...mapState(['loading', 'blur', 'setting'])
    },
    mounted () {
        this.changeBlur(true)
        this.changeLoading(true)
        if (!store.get('init')) {
            this.guide = true;
            this.changeLoading(false)
        } else {
            this.init()
        }
    }
}
</script>

<style>
/* CSS */
</style>
