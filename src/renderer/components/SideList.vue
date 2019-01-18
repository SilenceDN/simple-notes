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
        <side-item
            :active="gist.fileName==item.fileName"
            v-for="(item, i) in list"
            :key="i"
            :title="item.title"
            @click="click(item)"
            @delete="deleteHandle(item)"
        />
    </ul>
</template>

<script>
import SideItem from './SideItem'
import { mapState, mapMutations } from 'vuex';
import C from '@/lib/constant';
export default {
    components: { SideItem },
    computed: {
        ...mapState(['gist', 'type', 'articleModelList', 'cheatSheetModleList']),
        list () {
            return this.type == C.TYPE.ARTICLE ? this.articleModelList : this.cheatSheetModleList
        }
    },
    methods: {
        ...mapMutations(['selectItem', 'deleteGist']),
        click (item) {
            this.selectItem(item)
        },
        deleteHandle (gist) {
            let ctx = this, type = this.type;
            this.$confirm({
                title: '删除提示',
                content: `确定删除 <${gist.title}> 吗?`,
                onOk () {
                    return new Promise((resolve, reject) => {
                        gist.delete().then(() => {
                            ctx.deleteGist({ type, gist })
                            resolve()
                        })
                    }).catch(() => ctx.$message.error("删除失败请重试"));
                },
                onCancel () { },
            });
        }
    }
};
</script>

