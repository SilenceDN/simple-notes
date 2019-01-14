<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'simple-note',
    methods: {
        ...mapActions(['init'])
    },
    mounted () {
        this.init()
    }
}
</script>

<style>
/* CSS */
</style>
