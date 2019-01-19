<style>
.blur {
    filter: blur(5px);
}
</style>

<template>
    <div id="wrapper" :class="{'blur':blur}">
        <a-layout>
            <a-layout-sider width="140">
                <sider/>
            </a-layout-sider>
            <a-layout-sider :width="siderWidth" style="position:relative" ref="second-list">
                <div class="second-side-wrapper">
                    <side-list :class="{'draging':isDrag}"/>
                    <resizer
                        @drag-start="dragStart"
                        @drag-end="dragEnd "
                        @drag-move="handleWidthChange"
                    />
                </div>
            </a-layout-sider>
            <a-layout :class="{'draging':isDrag}">
                <a-layout-header>
                    <s-header/>
                </a-layout-header>
                <a-layout-content>
                    <s-content/>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import Sider from "@/components/Sider";
import Resizer from "@/components/Resizer";
import SideList from "@/components/SideList";
import Content from "@/components/Content";
import Header from "@/components/Header";
import { mapState } from 'vuex';
export default {
    name: "landing-page",
    components: { Sider, Resizer, SideList, [Content.name]: Content, [Header.name]: Header },
    data () {
        return {
            isDrag: false,
            startWidth: 0,
            siderWidth: 230
        };
    },
    computed: { ...mapState(['blur']) },
    methods: {
        open (link) {
            this.$electron.shell.openExternal(link);
        },
        dragStart () {
            this.startWidth = this.siderWidth;
            this.isDrag = true
        },
        dragEnd () {
            this.startWidth = this.siderWidth;
            this.isDrag = false
        },
        handleWidthChange (delta) {
            let newWidth = this.startWidth - delta;
            if (newWidth < 180 || newWidth > 300) return;
            this.siderWidth = newWidth;
        }
    }
};
</script>

<style lang="less">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
#wrapper {
    background: #fff;
    height: calc(100vh - 30px);
    width: 100vw;
    transition: filter 0.05s;
    .ant-layout {
        height: 100%;
        background: #fff;
    }
    .ant-layout-sider {
        transition-delay: 0s;
        transition: all 0s;
        &:nth-child(1) {
            color: #303e4d;
            background: #f7f8f8;
        }
        &:nth-child(2) {
            background: #fff;
            // border-right: 1px solid #f7f8f8;
            z-index: 1;
        }
    }
    .ant-layout-content {
        background: #fff;
        padding: 0px 12px;
        flex: 1;
        display: flex;
    }
    .ant-layout-header {
        color: #303e4d;
        font-size: 15px;
        height: auto;
        background: #fff;
        position: relative;
        padding: 12px;
        line-height: inherit;
        z-index: 1;
        .head-wrapper {
            background: #f7f8f8;
            padding: 12px;
            height: 100%;
            border-radius: 6px;
        }
    }
}
.second-side-wrapper {
    display: flex;
    height: 100%;
}
.draging {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
