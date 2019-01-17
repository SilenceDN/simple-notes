<style>
.guide-wrapper {
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    z-index: 9999;
}
.guide-wrapper img {
    width: 100%;
}
.guide-wrapper h3 {
    text-align: center;
}
.guide-container {
    position: relative;
    left: -55%;
    top: 20%;
}
.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fff;
    height: 280px;
    width: 520px;
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
        <div class="guide-container">
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
                        1.打开token生成页
                        <a @click="open">[点我打开]</a>
                    </span>
                    2.填写描述并勾选如下选项
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
                    <h3>填写页面生成的toekn</h3>
                    <div style="margin-top:15%">
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
    </div>
</template>

<script>
import { setToken, initGist } from '@/lib/data'
import { mapActions, mapMutations } from 'vuex';
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
        ...mapMutations(['changeLoading']),
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
                this.$message.success("^_^ 欢迎使用")
                this.loading = false;
                this.$emit('update:show', false)
                this.changeLoading(true)
                this.init()
            })
        }
    }
}
</script>

