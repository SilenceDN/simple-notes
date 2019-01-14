<style>
.content-wrapper {
    height: 100%;
}
</style>

<template>
    <div class="content-wrapper">
        <mark-down-editor v-show="type==0"/>
        <cheat-sheet v-show="type==1"/>
        <!-- <img id="placeholder" src="~@/assets/no_data.svg" alt> -->
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
        ...mapState({
            type: state => state.gist.type
        })
    },
    components: {
        MarkDownEditor,
        CheatSheet
    }
}
</script>
