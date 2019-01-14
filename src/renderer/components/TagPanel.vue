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
            @itemSelect="handleItemSelect"
            :child="articleModelList"
        />
        <tag-section title="PINNED" :child="pinned"/>
        <tag-section
            @click="tagClick(1)"
            title="CheatSheets"
            @itemSelect="handleItemSelect"
            :child="cheatSheetModleList"
        />
    </div>
</template>

<script>
import TagSection from "./TagSection";
import { mapState, mapActions } from 'vuex';
export default {
    components: {
        TagSection
    },
    computed: {
        ...mapState(['articleModelList', 'cheatSheetModleList', 'pinned'])
    },
    methods: {
        ...mapActions(['typeChange', 'selectItem']),
        handleItemSelect (item) {
            this.selectItem(item)
        },
        tagClick (type) {
            this.typeChange(type)
        }
    }
};
</script>

