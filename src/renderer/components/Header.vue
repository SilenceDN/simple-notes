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
</style>

<template>
    <div class="head-wrapper" :class="{'hide':!show}">
        <span @click="edit=true" v-show="!edit">{{currentValue}}</span>
        <a-input v-show="edit" v-model="currentValue">
            <a-icon slot="addonAfter" @click="onUpdate" type="check"/>
        </a-input>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 's-header',
    data () {
        return {
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
            this.updateTitle(this.currentValue);
            this.gist.save(() => {
                this.edit = false;
            }).catch(() => {
                this.$message.error("同步保存失败，请重试")
            })
        },
        getPopupContainer (trigger) {
            return trigger.parentElement
        }
    }
}
</script>

