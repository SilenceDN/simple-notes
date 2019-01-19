<style lang="less">
.setting-wrapper {
    position: absolute;
    left: 50%;
    top: 30px;
    height: 100%;
    z-index: 1000;
}
.setting-container {
    position: relative;
    left: -50%;
    top: 20%;
    background: rgba(255, 255, 255, 0.8);
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fff;
    height: 280px;
    width: 420px;
    padding: 12px;
    box-shadow: 0px 0px 20px rgba(204, 204, 204, 0.54);

    .close {
        cursor: pointer;
        position: absolute;
        right: 12px;
        top: 12px;
    }
    .title {
        opacity: 0.5;
        user-select: none;
        -moz-user-select: none;
    }
    .btn-list {
        width: 35%;
        margin: 6% auto;
        button {
            margin: 8px 0px;
        }

        .anticon {
            position: absolute;
            left: 10px;
            top: 8px;
        }
        .ant-progress {
            position: absolute;
            left: 10px;
            top: 3px;
        }
    }
}
</style>

<template>
    <div class="setting-wrapper" v-show="show">
        <div class="setting-container">
            <p class="title">设置</p>
            <a-icon type="close" class="close" @click="setting"/>

            <div class="btn-list">
                <a-button type="primary" icon="poweroff" block @click="exit">注销</a-button>
                <a-button block :icon="icon" @click="checkUpdate">
                    <a-progress v-if="!!percent" :width="20" type="circle" :percent="percent"/>
                    {{hasNewVersion ? '有新版本喔':'检查更新'}}
                </a-button>
                <a-button type="dashed" icon="smile" block @click="about">关于</a-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import store from 'store';
export default {
    props: {
        show: Boolean,
        tabPosition: 'top',
    },
    data () {
        return {
            $ipc: null,
            loading: false,
            token: '',
            step: 0,
            percent: 0

        }
    },
    computed: {
        ...mapState(['hasNewVersion']),
        icon () {
            return (this.percent == 0 || this.percent == 100) ? 'thunderbolt' : ''
        }
    },
    methods: {
        ...mapMutations(['changeLoading', 'setting']),
        ...mapActions(['init']),
        exit () {
            store.clearAll()
            alert('请重启应用');
            this.$ipc.send('exit')
        },
        about () {
            this.$ipc.send('about')
        },
        checkUpdate () {
            this.$ipc.send('checkForUpdate')
        },
        messageHandle (e, msg) {
            if (!msg) return;
            this.$notification.open({
                message: '更新提示',
                description: msg
            });
        }
    },
    created () {
        this.$ipc = this.$electron.ipcRenderer;
    },
    mounted () {
        let ctx = this;
        this.$ipc.on('update-message', this.messageHandle.bind(this))
        this.$ipc.on('isUpdateNow', () => {
            this.$confirm({
                zIndex: 10000,
                title: '更新提示',
                content: '新的更新已下载完成，是否立即安装?',
                onOk () {
                    ctx.$ipc.send('isUpdateNow')
                },
                onCancel () { },
            });
        })
        this.$ipc.on('downloadProgress', (e, progressObj) => {
            console.log(progressObj.percent)
            this.percent = progressObj.percent.toFixed()
        })
        this.$ipc.on('update-available', () => {
            this.newVesion()
        })
    },
    beforeDestroy () {
        this.$ipc.removeListener('update-message', this.messageHandle)
    }
}
</script>

