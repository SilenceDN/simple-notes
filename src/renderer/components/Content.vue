<style>
.content-wrapper {
    height: 100%;
}
</style>

<template>
    <div class="content-wrapper">
        <mark-down-editor v-if="type==0"/>
        <cheat-sheet v-else/>
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
        ...mapState(['type'])
    },
    components: {
        MarkDownEditor,
        CheatSheet
    }
}
</script>
