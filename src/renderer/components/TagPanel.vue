<style>
.tag-section-list {
    margin-top: 15px;
    flex: 1 1 1px;
    display: flex;
    flex-direction: column;
}
</style>


<template>
    <div class="tag-section-list">
        <tag-section
            title="Articles"
            @click="tagClick(0)"
            @create="createHandle(0)"
            @itemSelect="handleItemSelect"
            :child="articleModelList"
        />
        <!-- <tag-section title="PINNED" :child="pinned"/> -->
        <tag-section
            title="CheatSheets"
            @click="tagClick(1)"
            @create="createHandle(1)"
            @itemSelect="handleItemSelect"
            :child="cheatSheetModleList"
        />
    </div>
</template>

<script>
import TagSection from "./TagSection";
import { mapState, mapMutations } from 'vuex';
export default {
    components: {
        TagSection
    },
    computed: {
        ...mapState(['articleModelList', 'cheatSheetModleList', 'pinned'])
    },
    methods: {
        ...mapMutations(['typeChange', 'selectItem', 'createGist']),
        handleItemSelect (item) {
            this.selectItem(item)
        },
        tagClick (type) {
            this.typeChange(type)
        },
        createHandle (type) {
            this.createGist(type)
        }
    }
};
</script>

