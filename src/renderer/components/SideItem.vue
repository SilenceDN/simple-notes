<style lang="less">
@bg: #f4f5f5;
@color: #303e4d;
@subColor: #838b94;
.side-list-item {
    color: @color;
    padding: 8px 10px;
    border-radius: 4px;
    transition: all 0.2s;
    word-break: break-all;
    cursor: pointer;
    &:hover {
        background: @bg;
    }
}
</style>

<template>
    <li @click="$emit('click')" class="side-list-item">{{title}}</li>
</template>
<script>
export default {
    props: {
        title: String | Number,
        path: ''
    }
}
</script>

