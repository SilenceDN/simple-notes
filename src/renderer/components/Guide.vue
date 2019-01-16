<style>
.guide-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
.guide-wrapper img {
    width: 100%;
}
.guide-wrapper h3 {
    text-align: center;
}
.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fff;
    min-height: 200px;
    padding: 12px;
    display: flex;
    flex-direction: column;
}
.steps-action {
    margin-top: 24px;
    text-align: center;
}
</style>

<template>
    <div class="guide-wrapper" v-show="show">
        <a-steps :current="step" size="small">
            <a-step title="欢迎使用 :) "/>
            <a-step title="获取token"/>
            <a-step title="设置token"/>
        </a-steps>
        <div class="steps-content">
            <template v-if="step==0">
                <h3>欢迎使用SimpleNotes</h3>
                <div style="text-align:center">
                    <img style="width:60%" src="~@/assets/guide-hello.png" alt srcset>
                </div>
            </template>
            <template v-if="step==1">
                <h3>获取token步骤如下</h3>
                <span>
                    1.打开
                    <a @click="open">token生成页</a>
                </span>
                2.勾选如下选项
                <span>
                    <img src="~@/assets/guide-1-1.png" alt>
                    <img src="~@/assets/guide-1-2.png" alt>
                </span>
                3.复制生成的token
                <span>
                    <img src="~@/assets/guide-1-3.png" alt srcset>
                </span>
            </template>
            <template v-if="step==2">
                <div style="margin-top:60px">
                    <a-input placeholder="请填写token" v-model="token">
                        <a-icon slot="addonBefore" type="key"/>
                    </a-input>
                </div>
            </template>
        </div>
        <div class="steps-action">
            <a-button v-show="step > 0" @click="next(-1)" :disabled="loading">上一步</a-button>
            <a-button v-show="step < 2" type="primary" @click="next(1)" :disabled="loading">下一步</a-button>
            <a-button v-show="step == 2" type="primary" @click="done" :loading="loading">GO!</a-button>
        </div>
    </div>
</template>

<script>
import { setToken, initGist } from '@/lib/data'
import { mapActions } from 'vuex';
export default {
    props: {
        show: Boolean
    },
    data () {
        return {
            loading: false,
            token: '',
            step: 0
        }
    },
    methods: {
        ...mapActions(['init']),
        open () {
            this.$electron.shell.openExternal('https://github.com/settings/tokens/new')
        },
        next (increment = 1) {
            this.step += increment;
        },
        done () {
            setToken(this.token.trim())
            this.loading = true;
            initGist(() => {
                this.$message.success("初始化成功")
                this.loading = false;
                this.$emit('update:show', false)
                this.init()
            })
        }
    }
}
</script>

