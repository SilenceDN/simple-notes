<style lang="less">
@bg: #f4f5f5;
@color: #303e4d;
@subColor: #838b94;
.side-list-item {
    position: relative;
    color: @color;
    padding: 8px 10px;
    border-radius: 4px;
    transition: all 0.2s;
    word-break: break-all;
    cursor: pointer;
    &:hover {
        background: @bg;
    }
    &.active {
        background: @bg;
    }
    .anticon {
        color: #e91e63;
        cursor: pointer;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute !important;
        right: 6px;
        top: 0;
        bottom: 0;
        opacity: 0;
        transition: all 0.5s;
        &:hover {
            opacity: 1;
        }
    }
}
</style>

<template>
    <li @click="$emit('click')" class="side-list-item" :class="{'active':active}">
        {{title}}
        <a-icon type="delete" @click.stop="$emit('delete')"/>
    </li>
</template>
<script>
export default {
    props: {
        title: String | Number,
        active: false
    }
}
</script>

