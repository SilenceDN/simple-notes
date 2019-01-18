<style>
.box {
    -webkit-transition: 0.5s all ease;
    transition: 0.5s all ease;
    border: 0 solid transparent;
    -webkit-box-sizing: border-box;
    background: rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    border-radius: 50%;
    opacity: 0.7;
    --dx: calc(var(--size) - var(--x));
    --dy: calc(var(--size) - var(--y));
}
.box:hover {
    opacity: 1;
    cursor: pointer;
    border: calc(2px + 0.85vw) solid rgba(255, 255, 255, 0.5);
    -webkit-transition: 0.5s background-color ease, 0.2s border ease;
    transition: 0.5s background-color ease, 0.2s border ease;

    border-radius: calc(var(--x) / var(--size) * 100%)
        calc(var(--dx) / var(--size) * 100%)
        calc(var(--dx) / var(--size) * 100%) calc(var(--x) / var(--size) * 100%) /
        calc(var(--y) / var(--size) * 100%) calc(var(--y) / var(--size) * 100%)
        calc(var(--dy) / var(--size) * 100%)
        calc(var(--dy) / var(--size) * 100%);
}
</style>

<style lang="less" scoped>
.head {
    text-align: center;
    padding: 10px 0;
    img {
        width: 90px;
    }
}
section {
    font-size: 15px;
}
.anticon {
    color: inherit;
    margin-right: 6px;
}
ul {
    margin-top: 6px;
}
li {
    padding: 4px 8px;
    vertical-align: bottom;
    cursor: pointer;
    transition: all 0.1s;
    a {
        color: #303e4d;
    }
    &:hover {
        background: #eaebeb;
    }
}
.sync.anticon {
    animation: circle 1.5s infinite linear;
}
@keyframes circle {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

<template>
    <section>
        <div class="head">
            <img
                class="box"
                ref="img"
                @mousedown.prevent
                @mousemove="moveHandle"
                :src="avatarUrl"
                alt
            >
            <div>{{userName.toLocaleUpperCase()}}</div>
        </div>
        <ul>
            <!-- <li>
                <a-icon type="file"/>
                <a>新建</a>
            </li>-->
            <li>
                <a-icon type="sync" :class="{'sync':sync}"/>
                <a>同步</a>
            </li>
            <li>
                <a-icon type="setting"/>
                <a>设置</a>
            </li>
        </ul>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import { on } from '@/lib/bus';
export default {
    components: {},
    data () {
        return {
            menus: [
                { title: "Login", Icon: "" },
                { title: "Login" },
                { title: "Login" }
            ],
            sync: false
        };
    },
    computed: {
        ...mapState(['avatarUrl', 'userName'])
    },
    watch: {
        userName (val) {
            this.$electron.remote.getCurrentWindow().setTitle(`${val.toLocaleUpperCase()} | Made with ❤️`)
        }
    },
    methods: {
        moveHandle (e) {
            let box = this.$refs.img
            var size = parseInt(getComputedStyle(box).width)
            var x = size * 0.3 * 0.7 + 0.7 * e.offsetX
            var y = size * 0.3 * 0.7 + 0.7 * e.offsetY

            box.style.setProperty('--x', x)
            box.style.setProperty('--y', y)
            box.style.setProperty('--size', size)
        }
    },
    mounted () {
        on('sync', (flag) => {
            this.sync = flag
        })
    }
};
</script>

