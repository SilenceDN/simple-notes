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
        <side-item v-for="(item, i) in list" :key="i" :title="item.title" @click="click(item)"/>
    </ul>
</template>

<script>
import SideItem from './SideItem'
import { mapState, mapMutations } from 'vuex';
import C from '@/lib/constant';
export default {
    components: { SideItem },
    computed: {
        ...mapState(['type', 'articleModelList', 'cheatSheetModleList']),
        list () {
            return this.type == C.TYPE.ARTICLE ? this.articleModelList : this.cheatSheetModleList
        }
    },
    methods: {
        ...mapMutations(['selectItem']),
        click (item) {
            this.selectItem(item)
        }
    }
};
</script>

