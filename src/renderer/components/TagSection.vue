<style lang="less">
.tag-section {
    border-top: solid 1px #eaebeb;
    padding: 15px 0px;
    flex: 1 0 33.333%;
    max-height: 33.333%;
    display: flex;
    flex-direction: column;
}
.tag-section-title {
    border-left: solid 3px #303e4d;
    font-size: 13px;
    letter-spacing: 0.25px;
    text-transform: uppercase;
    font-weight: 500;
    color: inherit;
    margin-bottom: 6px;
    position: relative;
    padding: 4px 8px;
}
.tag-section-content {
    padding-left: 16px;
    overflow: auto;
    flex: 1;
    a {
        cursor: pointer;
        color: #303e4d;
        position: relative;
        opacity: 0.8;
        transition: all 0.2s;
        &::before {
            position: absolute;
            content: "";
            width: 4px;
            height: 4px;
            background: #b9b9b9;
            border-radius: 8px;
            top: 8px;
            left: -10px;
            cursor: pointer;
            z-index: 1;
        }
        &:hover {
            opacity: 1;
            color: #303e4d;
        }
    }
}
</style>


<template>
    <section class="tag-section">
        <div class="tag-section-title">{{title}}</div>
        <div class="tag-section-content">
            <div v-for="(item, index) in child" :key="item.text+index">
                <a>{{item.text}}</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        title: String,
        child: Array
    }
};
</script>

