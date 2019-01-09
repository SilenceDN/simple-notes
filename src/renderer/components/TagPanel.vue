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
        <tag-section :title="tag.title" :child="tag.child" v-for="tag in tags" :key="tag.title"/>
    </div>
</template>

<script>
import TagSection from "./TagSection";
export default {
    components: {
        TagSection
    },
    data () {
        return {
            tags: [
                {
                    title: "文章列表",
                    child: [
                        { text: "深入浅出系列" },
                        { text: "代码大全" },
                        { text: "常见错误" },
                        { text: "Hack技巧" }
                    ]
                },
                {
                    title: "PINNED",
                    child: [
                        { text: "深入浅出系列" },
                        { text: "代码大全" },
                        { text: "常见错误" },
                        { text: "Hack技巧" }
                    ]
                },
                {
                    title: "CheatSheets",
                    child: [
                        { text: "JavaScript" },
                        { text: "Shell" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Erlang" },
                        { text: "Docker" }
                    ]
                }
            ]
        };
    }
};
</script>

