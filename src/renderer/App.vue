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
        <a-spin tip="Loading..." :spinning="loading">
            <router-view></router-view>
        </a-spin>
        <guide :show="guide"/>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import store from 'store'
import Guide from '@/components/Guide'
export default {
    name: 'simple-note',
    components: { Guide },
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
        ...mapState(['loading', 'blur'])
    },
    mounted () {
        // this.init()
        this.changeBlur(true)
        this.changeLoading(true)
        if (!store.get('init')) {
            this.guide = true;
        } else {
            this.init()
        }
    }
}
</script>

<style>
/* CSS */
</style>
