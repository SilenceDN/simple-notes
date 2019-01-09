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
        <side-item v-for="i in 10" :key="i" :title="i"/>
    </ul>
</template>

<script>
import SideItem from './SideItem'
export default {
    components: { SideItem }
};
</script>

