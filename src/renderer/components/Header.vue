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
</style>

<template>
    <div
        class="head-wrapper tooltipped tooltipped-s"
        @click="edit=true"
        aria-label="点击编辑"
        :class="{'hide':!show}"
    >
        <span v-show="!edit">{{currentValue}}</span>
        <a-input
            ref="input"
            v-show="edit"
            @blur="onUpdate"
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
export default {
    name: 's-header',
    data () {
        return {
            sync: false,
            edit: false,
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
        },
        edit (val) {
            val && this.$nextTick(() => { this.$refs.input.focus() })
        }
    },
    methods: {
        ...mapMutations(['updateTitle']),
        onUpdate () {
            this.sync = true;
            this.updateTitle(this.currentValue);
            this.gist.save().then(() => {
                this.sync = true;
                this.edit = false;
            }).catch(() => {
                this.sync = true;
                this.$message.error("同步保存失败，请重试")
            })
        },
        getPopupContainer (trigger) {
            return trigger.parentElement
        }
    },
    mounted () {
        on('newFile', () => {
            this.edit = true
        })
    }
}
</script>

