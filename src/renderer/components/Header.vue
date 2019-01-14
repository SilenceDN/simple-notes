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
</style>

<template>
    <div class="head-wrapper">
        <span @click="edit=true" v-show="!edit">{{currentValue}}</span>
        <a-input v-show="edit" v-model="currentValue">
            <a-icon slot="addonAfter" @click="onUpdate" type="check"/>
        </a-input>
    </div>
</template>

<script>
import { mapState } from 'vuex'
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
            title: state => state.gist.title
        })
    },
    watch: {
        title (val) {
            this.currentValue = val
        }
    },
    methods: {
        onUpdate () {
            this.edit = false
        },
        getPopupContainer (trigger) {
            return trigger.parentElement
        }
    }
}
</script>

