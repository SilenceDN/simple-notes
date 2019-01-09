<style>
nav {
    display: flex !important;
    height: 100%;
    flex-direction: column;
}
</style>

<template>
    <nav>
        <user-panel/>
        <tag-panel/>
    </nav>
</template>

<script>
import TagPanel from "./TagPanel";
import UserPanel from "./UserPanel";
export default {
    components: {
        TagPanel,
        UserPanel
    }
};
</script>

