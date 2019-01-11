<style lang="less" scoped>
@color: #303e4d;
@subColor: #838b94;
ul {
    flex: 0 0 auto;
    width: 100%;
    list-style: none;
    color: @color;
    padding: 12px;
}
</style>


<template>
    <ul>
        <side-item title="markdown测试" @click="click(0)"/>
        <side-item title="cheatsheet测试" @click="click(1)"/>
    </ul>
</template>

<script>
import SideItem from './SideItem'
export default {
    components: { SideItem },
    methods: {
        click (type) {
            this.$store.state.type = type
        }
    }
};
</script>

