<style lang="less">
.content-wrapper {
    height: 100%;
}
#placeholder {
    display: block;
    margin: 0 auto;
    user-select: none;
    opacity: 0.5;
    @media screen and(max-width: 670px) {
        width: 60%;
        margin-top: 30vh;
    }
    @media screen and(min-width: 670px) {
        width: 30%;
        margin-top: 25vh;
    }
}
</style>

<template>
    <div class="content-wrapper">
        <mark-down-editor v-show="showMd"/>
        <cheat-sheet v-show="showCheatSheet"/>
        <img
            id="placeholder"
            @mousedown.prevent
            v-show="!gist.fileName"
            src="~@/assets/no_data.svg"
        >
    </div>
</template>
<script>
import MarkDownEditor from './Editor'
import CheatSheet from './CheatSheet'
import { mapState, mapActions } from "vuex"
export default {
    name: 's-content',
    data () {
        return {}
    },
    computed: {
        ...mapState(['gist', 'type']),
        showMd () {
            return this.type == 0 && this.gist.fileName
        },
        showCheatSheet () {
            return this.type == 1 && this.gist.fileName
        }
    },
    components: {
        MarkDownEditor,
        CheatSheet
    }
}
</script>
