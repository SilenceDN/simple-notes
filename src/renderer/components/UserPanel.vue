<style lang="less" scoped>
.head {
    text-align: center;
    padding: 10px 0;
    img {
        width: 90px;
        border-radius: 50%;
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
            <img @mousedown.prevent :src="avatarUrl" alt>
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
        ...mapState(['avatarUrl'])
    },
    mounted () {
        on('sync', (flag) => {
            this.sync = flag
        })
    }
};
</script>

