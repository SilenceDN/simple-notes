<style lang="less">
@bg: #f4f5f5;
@color: #303e4d;
@subColor: #838b94;
.side-list-item {
    color: @color;
    padding: 8px 10px;
    border-radius: 4px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        background: @bg;
    }
}
</style>

<template>
    <li @click="clickHandl" class="side-list-item">{{title}}</li>
</template>
<script>
export default {
    props: {
        title: String | Number,
        path: ''
    },
    methods: {
        clickHandl (e) {
            this.$emit('click', e)
        }
    }
}
</script>

