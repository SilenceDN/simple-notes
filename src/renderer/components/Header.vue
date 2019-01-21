<style lang="less">
.head-wrapper {
    .ant-input {
        border-color: rgba(0, 0, 0, 0);
    }
    .ant-input:focus,
    .ant-input:hover {
        border-color: rgba(0, 0, 0, 0);
        box-shadow: none;
    }
    .ant-input-group-addon {
        border: none;
        cursor: pointer;
    }
}
.hide {
    opacity: 0;
}
.sync.anticon {
    animation: circle 1.5s infinite linear;
}
@keyframes circle {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.shake {
    animation-name: shake-horizontal;
    animation-duration: 100ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 5;
}
</style>

<template>
    <div
        ref="wrapper"
        class="head-wrapper"
        :class="{'tooltipped tooltipped-s':!edit, 'hide':!show}"
        @click="editHandle"
        aria-label="点击编辑"
    >
        <span v-show="!edit">{{currentValue}}</span>
        <a-input
            :class="{'shake':error}"
            ref="input"
            v-show="edit"
            @blur="onUpdate"
            @focus="focusHandle"
            @animationend="animationHandle"
            v-model="currentValue"
            @keyup.enter="onUpdate"
        >
            <a-icon :class="{'sync':sync}" slot="addonAfter" @click.stop="onUpdate" :type="icon"/>
        </a-input>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { on } from '@/lib/bus'
const defaultValue = "未命名标题"
export default {
    name: 's-header',
    data () {
        return {
            sync: false,
            edit: false,
            error: false,
            currentValue: ''
        }
    },
    computed: {
        ...mapState({
            title: state => state.gist.title,
            gist: 'gist'
        }),
        show () {
            return !!this.gist.fileName
        },
        icon () {
            return this.sync ? 'sync' : 'check'
        }
    },
    watch: {
        title (val) {
            this.currentValue = val
        }
    },
    methods: {
        ...mapMutations(['updateTitle']),
        onUpdate () {
            if (!this.currentValue) {
                this.error = true;
                return
            };
            if (this.currentValue == this.gist.title && this.currentValue != "未命名标题") {
                this.edit = false;
                return
            };
            this.sync = true;
            this.updateTitle(this.currentValue);
            this.gist.save().then(() => {
                this.sync = false;
                this.edit = false;
            }).catch(() => {
                this.sync = false;
                this.$message.error("同步保存失败，请重试")
            })
        },
        focusHandle () {
            let input = this.$refs.input;
            console.log(input, input.setSelectionRange)
            if (input.setSelectionRange) {
                input.setSelectionRange(0, input.value.length);
            }
        },
        editHandle () {
            this.edit = true;
            this.$nextTick(() => { this.$refs.input.focus() })
        },
        animationHandle () {
            this.error = false;
        }
    },
    mounted () {
        on('newFile', () => {
            this.editHandle()
        })
    }
}
</script>

